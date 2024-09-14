import React, { useRef } from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  const personalInfoRef = useRef(null);
  const usageRef = useRef(null);
  const thirdPartyRef = useRef(null);
  const cookiesRef = useRef(null);
  const dataSecurityRef = useRef(null);
  const childrenRef = useRef(null);
  const policyChangesRef = useRef(null);
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
        <title>Privacy Policy - UrbanGents</title>
        <meta name="description" content="Privacy Policy for UrbanGents" />
      </Head>

      {/* Sidebar */}
      <aside className="ml-auto mt-24 mb-8 hidden md:block w-1/4 h-screen p-8 bg-white shadow-lg sticky top-0">
        <h2 className="text-lg font-bold mb-4">Quick Navigation</h2>
        <ul className="space-y-4 text-gray-700">
          <li>
            <button
              onClick={() => scrollToSection(personalInfoRef)}
              className="hover:text-indigo-600"
            >
              Personal Information Collection
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(usageRef)}
              className="hover:text-indigo-600"
            >
              Use of Information
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(thirdPartyRef)}
              className="hover:text-indigo-600"
            >
              Third-Party Sharing
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(cookiesRef)}
              className="hover:text-indigo-600"
            >
              Cookies and Tracking Technologies
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(dataSecurityRef)}
              className="hover:text-indigo-600"
            >
              Data Security
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(childrenRef)}
              className="hover:text-indigo-600"
            >
              Children's Privacy
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(policyChangesRef)}
              className="hover:text-indigo-600"
            >
              Policy Changes
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
        <h1 className=" text-4xl font-bold text-gray-800 mb-6 text-center">
          Privacy Policy
        </h1>

        <div className="bg-white shadow-lg p-8">
          {/* Personal Information Collection */}
          <section ref={personalInfoRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Personal Information Collection
            </h2>
            <p className="mb-6 text-gray-600">
              UrbanGents collects personal information such as name, email address, shipping address, and payment details during account registration and purchases. This data is used to fulfill orders, provide customer support, and improve your shopping experience.
            </p>
          </section>

          {/* Use of Information */}
          <section ref={usageRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Use of Information
            </h2>
            <p className="mb-6 text-gray-600">
              We use your information to process transactions, send order updates, provide customer service, and tailor promotions. With your consent, we may also send you newsletters or marketing materials.
            </p>
          </section>

          {/* Third-Party Sharing */}
          <section ref={thirdPartyRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Third-Party Sharing
            </h2>
            <p className="mb-6 text-gray-600">
              UrbanGents may share your information with trusted third-party service providers to facilitate payment processing, shipping, and email communication. We ensure that these partners comply with strict data privacy standards.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section ref={cookiesRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Cookies and Tracking Technologies
            </h2>
            <p className="mb-6 text-gray-600">
              Our website uses cookies and similar technologies to enhance user experience and track site activity. You can control cookies through your browser settings, but disabling them may affect your browsing experience.
            </p>
          </section>

          {/* Data Security */}
          <section ref={dataSecurityRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Data Security
            </h2>
            <p className="mb-6 text-gray-600">
              We implement industry-standard security measures to protect your data. However, no online system is completely secure, and we cannot guarantee the absolute security of your information.
            </p>
          </section>

          {/* Children's Privacy */}
          <section ref={childrenRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Children's Privacy
            </h2>
            <p className="mb-6 text-gray-600">
              UrbanGents is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If we discover that we have inadvertently obtained data from a minor, we will delete it immediately.
            </p>
          </section>

          {/* Policy Changes */}
          <section ref={policyChangesRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Changes to This Policy
            </h2>
            <p className="mb-6 text-gray-600">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this policy periodically to stay informed about how we protect your data.
            </p>
          </section>

          {/* Contact Information */}
          <section ref={contactRef}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Contact Information
            </h2>
            <p className="mb-6 text-gray-600">
              For any questions regarding our Privacy Policy, please contact us at:{" "}
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

export default PrivacyPolicy;