import React from "react";

const AdBanner = () => {
  return (
    <div className="w-[80%] h-[15vh] mx-auto my-8 flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 text-white rounded-lg shadow-lg overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-40 bg-cover bg-center" style={{ backgroundImage: 'url("/images/mens-fashion-banner.jpg")' }}></div>
      
      <div className="relative z-10 text-center px-6 py-4">
        <h2 className="text-3xl font-bold uppercase tracking-wide">Men's Fashion Sale!</h2>
        <p className="text-lg font-semibold mt-2">
          Up to <span className="text-yellow-300">70% OFF</span> on the latest trends. Don't miss out!
        </p>
      </div>
    </div>
  );
};

export default AdBanner;