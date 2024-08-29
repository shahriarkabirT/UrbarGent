import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useFetchAllProductsQuery } from "@/store/slices/api/productApiSlice";

const HomePageProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const { data: productsData, error, isLoading } = useFetchAllProductsQuery({
    limit: "",
    page: "",
    search: "",
    sort: "",
  });

  useEffect(() => {
    if (productsData) {
      setProducts(productsData.data);
    }
  }, [productsData]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div>
      <div className="w-[100%] mx-auto text-center pt-16">
        <div className="text-black">
          <h1 className="text-3xl font-semibold">Discover Your Dream Products</h1>
          <p className="text-lg p-3">Turning Aspirations into Reality with Excellence</p>
        </div>
      </div>
      <div className="w-[80%] mx-auto text-center">
        <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-3 lg:grid-cols-4 xl:gap-[50px] w-full my-8">
          {products.slice(0, visibleCount).map((product) => (
            <ProductCard productData={product} key={product._id} />
          ))}
        </div>
        {visibleCount < products.length && (
          <button
            onClick={handleShowMore}
            className="mt-4 mb-5 inline-block bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePageProducts;
