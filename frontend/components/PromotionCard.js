// PromotionSection.js
import React from "react";

const PromotionCard = ({ title, description, imageUrl, linkText }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 flex-shrink-0 transition-transform transform hover:-translate-y-2 hover:shadow-2xl m-4">
    <img src={imageUrl} alt="Product" className="w-full h-48 object-cover" />
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href="#"
        className="inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        {linkText}
      </a>
    </div>
  </div>
);

const PromotionSection = () => {
  const promotions = [
    {
      title: "Exclusive Summer Sale!",
      description: "Up to 50% off on selected items. Don't miss out on this limited-time offer!",
      imageUrl: "https://via.placeholder.com/300x200",
      linkText: "Shop Now",
    },
    {
      title: "New Arrivals!",
      description: "Discover our latest collection and get exclusive deals on new products.",
      imageUrl: "https://via.placeholder.com/300x200",
      linkText: "Explore",
    },
    {
      title: "Flash Deals!",
      description: "Grab these amazing products before they're gone. Limited stock available.",
      imageUrl: "https://via.placeholder.com/300x200",
      linkText: "Buy Now",
    },
    {
      title: "Clearance Sale!",
      description: "Final call for massive discounts on last season’s products.",
      imageUrl: "https://via.placeholder.com/300x200",
      linkText: "Save Big",
    },
  ];

  return (
    <div className="h-screen w-full flex items-center overflow-x-scroll p-8 bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="flex space-x-4">
        {promotions.map((promo, index) => (
          <PromotionCard
            key={index}
            title={promo.title}
            description={promo.description}
            imageUrl={promo.imageUrl}
            linkText={promo.linkText}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionSection;