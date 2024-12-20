import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-lightBlue-500 text-black p-4 mt-auto border-t border-gray-400 shadow-inner">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between">
        <p className="text-sm">&copy; 2024 UrbanGents</p>

        <div className="px-4 flex items-center gap-4">
          <a href="https://www.facebook.com/shahriar.tashin">
            <img
              src="/images/facebook.png"
              width="20px"
              className="inline-block"
            />
          </a>
          <a href="https://www.facebook.com/shahriar.tashin">
            <img
              src="/images/twitter.png"
              width="20px"
              className="inline-block"
            />
          </a>
          <a href="https://www.youtube.com/@shahriarkabir4717">
            <img
              src="/images/youtube.png"
              width="20px"
              className="inline-block"
            />
          </a>
        </div>

        <ul className="flex space-x-4">
        <li>
            <Link
              href="/terms&conditions"
              className="text-black hover:text-blue-800"
            >
              Terms and Conditions
            </Link>
          </li>
          <li>
            <Link
              href="/privacy&policy"
              className="text-black hover:text-blue-800"
            >
              Privacy Policy
            </Link>
          </li>
          
          <li>
            <Link href="/contactUs" className="text-black hover:text-blue-800">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
