// frontend/components/Carousel.js

import { useFetchTopTrendingProductsQuery } from "@/store/slices/api/productApiSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const MyCarousel = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { data: trendingProducts } = useFetchTopTrendingProductsQuery(4);

  useEffect(() => {
    if (trendingProducts) {
      setProducts(trendingProducts);
    }
  }, [trendingProducts]);

  const handleOnClick = (slug) => {
    router.push(`/products/${slug}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 464,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 py-12">
      <h1 className="text-gray-900 font-extrabold text-4xl text-center mb-12">
        UrbenGents - Your Destination for Modern Style
      </h1>
      <div className="container mx-auto ">
        <Slider {...settings} rtl={false}>
          {products.map((product, index) => (
            <div
              key={index}
              className="flex justify-center items-center group cursor-pointer px-2"
              onClick={() => handleOnClick(product.slug)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 group-hover:scale-105 bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-opacity duration-200 group-hover:opacity-80"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-white text-lg font-bold">
                    {product.name}
                  </h2>
                  <p className="text-gray-200 mt-1">
                    {product.price}৳
                  </p>
                </div>
                <div className="absolute top-2 right-2 bg-white text-gray-800 text-xs px-2 py-1 rounded-full shadow-md">
                  Trending
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MyCarousel;
