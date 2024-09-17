import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleProductDropdown = () => {
    setProductDropdownOpen(!productDropdownOpen);
  };

  const toggleCategoriesDropdown = () => {
    setCategoriesDropdownOpen(!categoriesDropdownOpen);
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Home" },
    {
      label: "Product",
      children: [
        { to: "/admin/All-Products", label: "All Products" },
        { to: "/admin/Add-Product", label: "Add Product" },
      ],
    },
    {
      label: "Categories",
      children: [
        { to: "/admin/Add-Catagories", label: "Add Categories" },
        { to: "/admin/Sub-Catagories", label: "Sub Categories" },
      ],
    },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/AllUsers", label: "Users" },
    { to: "/admin/Contacts", label: "Contact" },
  ];

  return (
    <aside
      className={`bg-white text-gray-900 h-screen sticky top-0 p-5 shadow-lg transition-all ${
        isOpen ? "w-64" : "w-16"
      } duration-300`}
    >
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden flex justify-end mb-4">
        <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none">
          {isOpen ? "❌" : "≡"}
        </button>
      </div>

      <div className={`overflow-hidden ${isOpen ? "block" : "hidden lg:block"}`}>
        <nav className="flex flex-col gap-4">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.children ? (
                <div>
                  <div
                    className="flex items-center justify-between p-3 rounded-sm bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
                    onClick={
                      item.label === "Product" ? toggleProductDropdown : toggleCategoriesDropdown
                    }
                  >
                    <div className="flex items-center gap-2">
                      {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                    </div>
                    <div
                      className={`transition-transform transform ${
                        item.label === "Product"
                          ? productDropdownOpen
                            ? "rotate-180"
                            : ""
                          : categoriesDropdownOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    >
                      ↓
                    </div>
                  </div>

                  {/* Product Dropdown */}
                  {item.label === "Product" && productDropdownOpen && (
                    <div className="ml-4 mt-2">
                      {item.children.map((child, childIndex) => (
                        <Link key={childIndex} href={child.to}>
                          <div
                            className={`p-3 rounded-sm transition-colors cursor-pointer ${
                              child.label === "Add Product"
                                ? "bg-blue-100 bg-opacity-50 hover:bg-opacity-75"
                                : child.label === "All Products"
                                ? "bg-green-100 bg-opacity-50 hover:bg-opacity-75"
                                : "bg-gray-50 hover:bg-gray-100"
                            }`}
                          >
                            {isOpen && <span className="text-sm font-medium">{child.label}</span>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Categories Dropdown */}
                  {item.label === "Categories" && categoriesDropdownOpen && (
                    <div className="ml-4 mt-2">
                      {item.children.map((child, childIndex) => (
                        <Link key={childIndex} href={child.to}>
                          <div className="p-3 bg-gray-50 rounded-sm hover:bg-gray-100 transition-colors cursor-pointer">
                            {isOpen && <span className="text-sm font-medium">{child.label}</span>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.to}>
                  <div className="p-3 rounded-sm bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors">
                    {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                  </div>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
