import getImageURL from "@/utils/image";
import { useRouter } from "next/router";

const ProductCard = ({ productData }) => {
  const { name, image, price, quantity, slug } = productData || {};
  const router = useRouter();

  const handleViewProduct = () => {
    router.push(`/products/${slug}`);
  };

  return (
    <div className="w-[100%] mx-auto bg-white  overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between h-full">
      {/* Image Section */}
      <img
        src={`/${image}`}
        alt={name}
        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
        onClick={handleViewProduct}
      />

      {/* Product Details */}
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
          <p className="text-lg font-bold text-gray-900 mb-1">
            {price} <span className="text-sm">৳</span>
          </p>

          {quantity > 0 ? (
            <p className="text-sm text-green-600 font-medium">
              In stock: {quantity}
            </p>
          ) : (
            <p className="text-sm text-red-600 font-medium">Out of Stock</p>
          )}
        </div>

        {/* View Product Button */}
        <div
          className="mx-12 mt-4 inline-block bg-[#6B7B8B] text-white font-semibold py-2 px-4 rounded-md transition duration-300 hover:bg-black cursor-pointer"
          onClick={handleViewProduct}
        >
          View Product
        </div>
      </div>
    </div>
  );
};

export default ProductCard;