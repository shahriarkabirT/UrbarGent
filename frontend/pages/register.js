import { toastManager } from "@/utils/toastManager.js";
import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { validate } from "../utils/auth.js";
import Image from "next/image.js";

const register = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState({});

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onShowConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  async function handleSubmit(e) {
    setIsVerifying(true);
    e.preventDefault();
    const form = e.target;
    const formObject = validate(e, setError);
    if (!formObject) {
      return;
    }
    const toastId = toastManager.loading("Registering...");
    const reqURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`;
    try {
      const res = await Axios.post(reqURL, formObject);
      form.reset();
      const { url } = res.data.data;
      toastManager.updateStatus(toastId, {
        render: "Registered successfully",
        type: "success",
      });

      setTimeout(() => {
        router.push(url);
      }, 2000);
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toastManager.updateStatus(toastId, {
        render: message,
        type: "error",
      });
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <div style={{ cursor: isVerifying ? "wait" : "default" }}>
      <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto  w-auto"
            src="/images/mylogo.png"
            alt="UrbanGents logo"
            width={1200}
            height={1000}
          />
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                />
              </div>
              {error?.name && (
                <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                  Full name is required!
                </div>
              )}
            </div>

            {/* Email */}
            <div className="col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                />
              </div>
              {error?.email && (
                <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                  {error.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="col-span-1">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2 flex justify-between items-center px-3 bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a password"
                  className="block focus:ring-transparent focus:outline-none w-full"
                />
                <div onClick={onShowPassword}>
                  {showPassword ? <FaEye /> : <IoEyeOffSharp />}
                </div>
              </div>
              {error?.password && (
                <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                  <ul className="list-disc list-inside">
                    {Object.values(error.password).map((err, index) => (
                      <li key={index}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="col-span-1">
              <label htmlFor="passwordConfirm" className="block text-sm font-medium leading-6 text-gray-900">
                Password Confirm
              </label>
              <div className="mt-2 flex justify-between items-center px-3 bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="block focus:ring-transparent focus:outline-none w-full"
                />
                <div onClick={onShowConfirmPass}>
                  {showConfirmPass ? <FaEye /> : <IoEyeOffSharp />}
                </div>
              </div>
              {error?.passwordConfirm && (
                <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                  Password and confirm password do not match.
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="col-span-1">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                />
              </div>
              {error?.phone && (
                <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                  Phone number is required!
                </div>
              )}
            </div>

            {/* Address */}
            <div className="col-span-3">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-3 mb-10">
              <button
                type="submit"
                className="flex w-full bg-[#4f5257] justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isVerifying ? "Verifying..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
