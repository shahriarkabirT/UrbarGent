import { useFetchProductBySlugQuery } from "@/store/slices/api/productApiSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { addToCart } from "@/store/slices/cartSlice";
import CartDropdown from "@/components/CartDropdown";
import {
  useCanReviewProductQuery,
  useGetReviewsQuery,
} from "@/store/slices/api/reviewApiSlice";

import { useFetchMyProfileQuery } from "@/store/slices/api/userApiSlice";
import ReviewsList from "@/components/ReviewsList";
import ReviewForm from "@/components/ReviewForm";
import { toast } from "react-toastify";
import Login from "@/components/Login";

const ProductDetails = () => {
  const slug = useRouter().query.slug;
  
  const {
    data: product,
    error,
    isLoading,
  } = useFetchProductBySlugQuery(slug, { skip: !slug });
  
  const dispatch = useDispatch();
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const path = router.asPath;
  const { data: reviews = [] } = useGetReviewsQuery(product?._id, { skip: !product });
  const { data: canReview } = useCanReviewProductQuery(product?._id, { skip: !product || !userInfo });

  const cart = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [averageRating, setAverageRating] = useState(0);
  const [addToCartStatus, setAddToCartStatus] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const needFetch = !!user;
  const { data: userInformation } = useFetchMyProfileQuery(undefined, {
    skip: needFetch,
  });

  useEffect(() => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const average = totalRating / reviews.length;
      setAverageRating(average);
    }
  }, [reviews]);

  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
    } else if (userInfo && userInformation) {
      dispatch(setUser(userInformation));
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [userInfo, userInformation]);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  const addToCartFunction = () => {
    dispatch(addToCart(product));
    setAddToCartStatus(false);
    toast.success("One product has been added to the cart");
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const loginHandler = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex">
          {/* Product Image */}
          <div className="flex flex-col w-2/5  py-10 px-4  ">
            <div className="flex-1 bg-blue-500 mb-4">
            <Image
              src={`/${product.image}` || "/placeholder-image.jpg"}
              alt={`${product.name} image`}
              height={2000}
              width={2000}
              objectFit="cover"
              
            />
            </div>
            <div className="flex-1 mb-2 items-center ">
              <div className="flex text-yellow-400 ">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${index < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              <span className="ml-3 text-gray-600">({reviews.length} Reviews)</span>
            </div>
            </div>

    

            

          </div>
          {/* <div class="w-1/3 bg-gray-300 p-4 flex items-center"> */}
          {/* Product Info */}
          <div className="flex flex-col w-1/4 p-8 w-1/2 item-left">

            <div className="flex text-3xl font-extrabold text-gray-800 mb-4 item-left">{product.name}</div>

            
            <div className="flex-1 items-center justify-between mb-6">
              <span className="text-3xl font-bold text-gray-700">৳{product.price.toFixed(2)}</span>
            </div>

            <div className="flex-1">
              {/* <span className="font-semibold text-gray-700">Availability:</span> */}
              <span className="ml-2 text-green-600">
                {product.quantity > 0 ? `In stock (${product.quantity})` : 'Out of stock'}
              </span>
            </div>
            <div className="flex space-x-4 mt-4">
              {addToCartStatus && (
                <button
                  onClick={addToCartFunction}
                  className={`bg-orange-500 text-white py-2 px-6 rounded-sm hover:bg-orange-600 transition ${
                    product.quantity > 0 ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-400 text-gray-800 cursor-not-allowed'
                  }`}
                  disabled={product.quantity <= 0}
                >
                  {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                </button> 
              )}

              {!addToCartStatus && !isUserLoggedIn && (
                <Login path={path} />
              )}

              {!addToCartStatus && isUserLoggedIn && (
                <button
                  onClick={toggleCart}
                  className="border border-orange-500 text-orange-500 py-2 px-6 rounded hover:bg-orange-100 transition"
                >
                  Open Your Cart
                </button>
              )}
            </div>
            
            <p className="text-sm mt-4 flex text-left text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            

            
          </div>

        </div>

        {/* Reviews Section */}


        <div className="p-4 text-left whitespace-wrap ">
            <ReviewsList productId={product._id} /></div>

        <div className="p-8">
          
          {userInfo && (
            <>
              <h3 className="text-xl font-bold mt-8 mb-4">Add Your Review</h3>
              <ReviewForm productId={product._id} />
            </>
          )}
        </div>
        
        {isUserLoggedIn && (
          <div className="ml-6">
            <CartDropdown isOpen={isCartOpen} toggleCart={toggleCart} />
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductDetails;
