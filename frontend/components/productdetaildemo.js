import { useFetchProductBySlugQuery } from "@/store/slices/api/productApiSlice";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import ReviewsList from "@/components/ReviewsList";
import ReviewForm from "@/components/ReviewForm";

const ProductDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();

  const { data: product, error, isLoading } = useFetchProductBySlugQuery(slug, { skip: !slug });
  
  // Safeguard to handle undefined images
  const [selectedImage, setSelectedImage] = useState(product?.image || "/placeholder-image.jpg");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>Product not found.</div>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Product Gallery and Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Product Image Section */}
        <div className="md:col-span-1">
          <div className="relative w-full h-96 overflow-hidden border border-gray-200 rounded-md">
            <Image
              src={selectedImage}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              className="transition-transform duration-500 ease-in-out hover:scale-125 cursor-zoom-in"
            />
          </div>

          {/* Render thumbnails only if images exist */}
          <div className="flex mt-4 space-x-2 overflow-auto">
            {product.images && product.images.length > 0 ? (
              product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="border p-1 cursor-pointer hover:border-orange-500 transition"
                  onClick={() => setSelectedImage(img)}
                >
                  <Image src={img} alt={`thumbnail-${idx}`} width={50} height={50} />
                </div>
              ))
            ) : (
              <p>No additional images available</p>
            )}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

          {/* Product Pricing & Offer Section */}
          <div className="flex items-center space-x-4">
            <p className="text-xl text-red-600 font-bold">৳{product.price}</p>
            <p className="text-sm line-through text-gray-500">৳{product.originalPrice}</p>
            <p className="text-green-600 text-sm">Save ৳{product.originalPrice - product.price}</p>
          </div>

          {/* Stock Information */}
          <p className="text-sm text-gray-700">In Stock: {product.quantity}</p>

          {/* Add to Cart & Buy Now */}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600 transition"
            >
              Add to Cart
            </button>
            <button className="border border-orange-500 text-orange-500 py-2 px-6 rounded hover:bg-orange-100 transition">
              Buy Now
            </button>
          </div>

          {/* Shipping & Offers Section */}
          <div className="mt-6 bg-gray-50 p-4 border rounded-md">
            <h3 className="text-lg font-bold">Offers & Promotions</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-700">
              <li>Free shipping on orders over ৳500</li>
              <li>5% discount if you buy 2 or more items</li>
              <li>Cash on delivery available</li>
            </ul>
          </div>

          {/* Product Description */}
          <div className="mt-4">
            <h2 className="text-lg font-bold">Product Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
        <ReviewsList productId={product._id} />
        <ReviewForm productId={product._id} />
      </div>
    </div>
  );
};

export default ProductDetails;
