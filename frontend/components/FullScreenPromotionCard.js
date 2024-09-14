// FullScreenPromotionCard.js
import React from "react";
import Link from "next/link";
const FullScreenPromotionCard = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8"
    style={{
      backgroundImage: 'url("/images/background-main.jpeg")', // Update the path with your background image
    }}
    >
      <div className="max-w-4xl text-center p-12 bg-white bg-opacity-10 rounded-xl shadow-2xl border border-opacity-30 border-white">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-white drop-shadow-lg">
          Unleash the Season's Best Deals!
        </h1>
        <p className="text-lg font-medium mb-8 text-white drop-shadow-md">
          Discover exclusive offers and unbeatable discounts on your favorite products. 
          Hurry, these deals won’t last long! Elevate your shopping experience with 
          our limited-time sale that’s too good to miss. Shop now and enjoy premium quality at the best prices.
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-4 text-lg font-semibold text-black bg-white rounded-full hover:bg-black hover:text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
        >
          Grab the Deals Now!
        </Link>
      </div>
    </div>
  );
};

export default FullScreenPromotionCard;