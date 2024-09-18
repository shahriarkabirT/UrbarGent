import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Admin/Admin-Sidebar";
import {
  useDeleteProductMutation,
  useFetchAllProductsQuery,
} from "@/store/slices/api/productApiSlice";
import { toastManager } from "@/utils/toastManager";
import "react-quill/dist/quill.snow.css";
import AddProduct from "./Add-Product";
import { withAuth } from "@/utils/withAuth";
import { debounce } from "lodash";
import Image from "next/image";

const AllProducts = () => {
  const { data: productsData } = useFetchAllProductsQuery({
    limit: 100000,
    page: 1,
    search: "",
    sort: "",
  });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState();
  const [deleteProduct] = useDeleteProductMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (productsData) {
      setProducts(productsData.data);
      setFilteredProducts(productsData.data);
    }
  }, [productsData]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const handleEdit = (product) => {
    setEditProduct(product);
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
    setEditProduct(null);
  };

  const handleDelete = async (id) => {
    const toastID = toastManager.loading("Please wait...");
    try {
      await deleteProduct(id).unwrap();
      toastManager.updateStatus(toastID, {
        render: "Product deleted successfully",
        type: "success",
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      toastManager.updateStatus(toastID, {
        render: error?.data?.message || "Error deleting product",
        type: "error",
      });
    }
  };

  const handleSearch = debounce((query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(lowerCaseQuery);
      const categoryMatch =
        product.category?.name?.toLowerCase().includes(lowerCaseQuery) ||
        !product.category;
      const subCategoryMatch =
        product.subCategory?.name?.toLowerCase().includes(lowerCaseQuery) ||
        !product.subCategory;
      return nameMatch || categoryMatch || subCategoryMatch;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, 150);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        {!isEditing && (
          <div className="container h-[100%] overflow-auto">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Products</h2>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 w-80 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="overflow-x-auto text-center">
                <table className="min-w-full bg-white text-gray-700 shadow-lg rounded-lg">
                  <thead className="bg-gray-50">
                    <tr className="text-center">
                      <th className="py-3 px-6 border-b font-semibold">Image</th>
                      <th className="py-3 px-6 border-b font-semibold">Name</th>
                      <th className="py-3 px-6 border-b font-semibold">Price</th>
                      <th className="py-3 px-6 border-b font-semibold">Stock</th>
                      <th className="py-3 px-6 border-b font-semibold">Category</th>
                      <th className="py-3 px-6 border-b font-semibold">SubCategory</th>
                      <th className="py-3 px-6 border-b font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.length > 0 ? (
                      currentProducts.map((product) => (
                        <tr
                          key={product._id}
                          className="border-b hover:bg-gray-50 transition-all duration-150"
                        >
                          <td className="py-4 px-6">
                            <Image
                              src={`/${product.image}` || "/placeholder-image.jpg"}
                              alt={`${product.name} image`}
                              width={50}
                              height={50}
                              className="rounded-lg"
                            />
                          </td>
                          <td className="py-4 px-6">{product.name}</td>
                          <td className="py-4 px-6">৳{product.price.toFixed(2)}</td>
                          <td className="py-4 px-6">{product.quantity}</td>
                          <td className="py-4 px-6">
                            {product.category?.name || "N/A"}
                          </td>
                          <td className="py-4 px-6">
                            {product.subCategory?.name || "N/A"}
                          </td>
                          <td className="py-4 px-6 flex justify-center space-x-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="bg-[#4F4F4F] hover:bg-black text-white font-bold py-2 px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="bg-red-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-5 text-center text-gray-500"
                        >
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center mt-6">
                <span className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
                  >
                    {"<<"}
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
                  >
                    {"<"}
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
                  >
                    {">"}
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
                  >
                    {">>"}
                  </button>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[10, 20, 30, 40, 50].map((size) => (
                      <option key={size} value={size}>
                        Show {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
        {isEditing && (
          <AddProduct
            editing={isEditing}
            product={editProduct}
            onEditComplete={handleEditComplete}
          />
        )}
      </div>
    </div>
  );
};

export default withAuth(AllProducts, {
  requireLogin: true,
  requireAdmin: true,
});
