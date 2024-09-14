import React, { useRef } from "react";
import Head from "next/head";

const TermsAndConditions = () => {
  const agreementRef = useRef(null);
  const useRefRef = useRef(null);
  const accountRef = useRef(null);
  const productDetailsRef = useRef(null);
  const pricingRef = useRef(null);
  const intellectualPropertyRef = useRef(null);
  const liabilityRef = useRef(null);
  const modificationsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const date = new Date().toLocaleDateString("en-US");

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Head>
        <title>Terms and Conditions - UrbanGents</title>
        <meta name="description" content="Terms and Conditions for UrbanGents" />
      </Head>

      {/* Sidebar */}
      <aside className="ml-auto mt-24 mb-8 hidden md:block w-1/4 h-screen p-6 bg-white shadow-lg sticky top-0">
        <h2 className="text-lg font-bold mb-4">Quick Navigation</h2>
        <ul className="space-y-4 text-gray-700">
          <li>
            <button
              onClick={() => scrollToSection(agreementRef)}
              className="hover:text-indigo-600"
            >
              User Agreement
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(useRefRef)}
              className="hover:text-indigo-600"
            >
              Use of Website
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(accountRef)}
              className="hover:text-indigo-600"
            >
              Account Responsibilities
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(productDetailsRef)}
              className="hover:text-indigo-600"
            >
              Product Information
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(pricingRef)}
              className="hover:text-indigo-600"
            >
              Pricing and Payments
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(intellectualPropertyRef)}
              className="hover:text-indigo-600"
            >
              Intellectual Property
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(liabilityRef)}
              className="hover:text-indigo-600"
            >
              Limitation of Liability
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(modificationsRef)}
              className="hover:text-indigo-600"
            >
              Terms Modifications
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="hover:text-indigo-600"
            >
              Contact Information
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 container mr-16 px-0 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Terms and Conditions
        </h1>

        <div className="bg-white shadow-lg p-8">
          {/* User Agreement */}
          <section ref={agreementRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              User Agreement
            </h2>
            <p className="mb-6 text-gray-600">
              By accessing and using the UrbanGents website, you agree to comply with and be bound by these Terms and Conditions. This agreement applies to all users, including visitors, registered members, and individuals purchasing products from the site.
            </p>
          </section>

          {/* Use of Website */}
          <section ref={useRefRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Use of Website
            </h2>
            <p className="mb-6 text-gray-600">
              You agree to use UrbanGents.com solely for lawful purposes. You may not use the site in any manner that could disrupt the operation of the site, harm its infrastructure, or violate any laws.
            </p>
          </section>

          {/* Account Responsibilities */}
          <section ref={accountRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Account Responsibilities
            </h2>
            <p className="mb-6 text-gray-600">
              If you create an account with us, you are responsible for maintaining the confidentiality of your login credentials and for any activities conducted under your account.
            </p>
          </section>

          {/* Product Information */}
          <section ref={productDetailsRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Product Information
            </h2>
            <p className="mb-6 text-gray-600">
              We strive to provide accurate and up-to-date product descriptions. However, we do not guarantee that the information, including pricing and product images, is always free of errors.
            </p>
          </section>

          {/* Pricing and Payments */}
          <section ref={pricingRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Pricing and Payments
            </h2>
            <p className="mb-6 text-gray-600">
              All prices listed are subject to change without notice. We accept major credit cards and other payment methods as displayed on the checkout page. Payments must be completed in full before your order is processed.
            </p>
          </section>

          {/* Intellectual Property */}
          <section ref={intellectualPropertyRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Intellectual Property
            </h2>
            <p className="mb-6 text-gray-600">
              All content on UrbanGents, including logos, images, and text, is owned by UrbanGents or its licensors. Unauthorized use, reproduction, or distribution of this material is strictly prohibited.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section ref={liabilityRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Limitation of Liability
            </h2>
            <p className="mb-6 text-gray-600">
              UrbanGents will not be held liable for any damages arising from the use or inability to use our website, including, but not limited to, loss of profits or data.
            </p>
          </section>

          {/* Terms Modifications */}
          <section ref={modificationsRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Terms Modifications
            </h2>
            <p className="mb-6 text-gray-600">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page and are effective immediately upon publication.
            </p>
          </section>

          {/* Contact Information */}
          <section ref={contactRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Contact Information
            </h2>
            <p className="mb-6 text-gray-600">
              For any questions regarding these terms, please contact us at:{" "}
              <a href="mailto:support@urbangents.com" className="text-blue-600 hover:underline">
                support@urbangents.com
              </a>
            </p>
          </section>

          <p className="mt-8 text-sm text-gray-600">{`Last updated: ${date}`}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;