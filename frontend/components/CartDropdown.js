import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  deleteCart,
} from "@/store/slices/cartSlice";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useCreateOrderMutation } from "@/store/slices/api/orderApiSlice";
import { toastManager } from "@/utils/toastManager";
import { useCreatePaymentIntentMutation } from "@/store/slices/api/paymentSlice";
import Image from "next/image";
import { motion } from "framer-motion";

const CartDropdown = ({ isOpen, toggleCart }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const [createOrder] = useCreateOrderMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const calculateTotalAmount = useMemo(() => {
    return cart.cart.reduce(
      (total, item) => total + item.itemPrice * item.quantity,
      0
    );
  }, [cart.cart]);

  useEffect(() => {
    setTotalAmount(calculateTotalAmount);
  }, [calculateTotalAmount]);

  const handleIncrease = (item) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item));
    } else {
      handleRemove(item);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.cart.length === 0) {
      toastManager.error("Cart is empty. Cannot place order.");
      return;
    }
    const toastId = toastManager.loading("Processing your order...");
    const products = cart.cart.map((item) => ({
      product: item._id,
      quantity: item.quantity,
      price: item.itemPrice,
    }));
    const order = {
      products,
      totalAmount: cart.totalPayableAmount,
    };
    try {
      const response = await createOrder(order).unwrap();
      toastManager.updateStatus(toastId, {
        type: "success",
        render: "Order placed successfully",
      });
      const orderId = response.order._id;
      const paymentIntent = {
        amount: cart.totalPayableAmount,
        orderID: orderId,
        currency: "BDT",
      };
      const paymentResponse = await createPaymentIntent(paymentIntent).unwrap();
      toastManager.updateStatus(toastId, {
        type: "success",
        render: "Redirecting to payment gateway...",
      });
      setTimeout(() => {
        window.location.href = paymentResponse.payment_url;
      }, 2000);
      dispatch(deleteCart());
      toggleCart();
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        error?.error?.message ||
        "Something went wrong. Please try again later.";
      toastManager.updateStatus(toastId, {
        type: "error",
        render: errorMessage,
      });
    }
  };

  // Slide-Down Effect Variants for framer-motion
  const slideDownEffect = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: "0%", transition: { duration: 0.6 } },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.5 } },
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20">
      <div
        className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
        onClick={toggleCart}
      ></div>

      {/* Slide-down motion effect */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center px-4"
        variants={slideDownEffect}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="w-full max-w-lg">
          <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden">
            <div className="py-6 px-6 sm:px-8">
              <div className="flex items-start justify-between">
                <h2 className="text-3xl font-bold">Your Cart</h2>
                <button
                  onClick={toggleCart}
                  className="ml-3 flex h-7 items-center text-black hover:text-gray-700 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Added a max-height and overflow-y-scroll to make it scrollable */}
              <ul className="mt-8 pr-4 space-y-6 divide-y divide-gray-200 max-h-96 overflow-auto">
                {cart.cart.length === 0 ? (
                  <p className="text-center text-gray-700">
                    Your cart is empty
                  </p>
                ) : (
                  cart.cart.map((item) => (
                    <li key={item._id} className="flex py-6">
                      <div className="flex-shrink-0 w-24 h-[4rem] overflow-hidden rounded-md border border-gray-300">
                        <Image
                          src={`/${item.image}`}
                          alt={item.name}
                          width={96}
                          height={72}
                          objectFit="cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-lg font-semibold text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">{item.itemPrice} Tk</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.color || "Color"}
                          </p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm mt-4">
                          <p className="text-gray-600">Qty {item.quantity}</p>
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleDecrease(item)}
                              className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <FaMinus />
                            </button>
                            <button
                              onClick={() => handleIncrease(item)}
                              className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <FaPlus />
                            </button>
                            <button
                              onClick={() => handleRemove(item)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="border-t border-gray-200 py-6 px-6 sm:px-8">
              <div className="flex justify-between text-lg font-semibold">
                <p>Total amount:</p>
                <p>{totalAmount} Tk</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center rounded-md bg-indigo-600 text-white px-6 py-3 font-bold hover:bg-indigo-700 transition-colors"
                >
                  Checkout
                </button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <button
                  type="button"
                  onClick={toggleCart}
                  className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Continue Shopping &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartDropdown;
