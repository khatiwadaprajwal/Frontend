import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-8 py-4 flex justify-between items-center border-b border-gray-200">
      {/* Left: Brand + Nav Links */}
      <div className="flex items-center space-x-10">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-pink-700 hover:text-pink-800"
        >
          DKP
        </Link>
        <div className="space-x-6 text-lg font-medium">
          <Link
            to="/"
            className={`${
              isActive("/") ? "text-pink-600 font-semibold" : "text-gray-800 hover:text-pink-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`${
              isActive("/products")
                ? "text-pink-600 font-semibold"
                : "text-gray-800 hover:text-pink-600"
            }`}
          >
            Products
          </Link>
          <Link
            to="/about"
            className={`${
              isActive("/about") ? "text-pink-600 font-semibold" : "text-gray-800 hover:text-pink-600"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`${
              isActive("/contact")
                ? "text-pink-600 font-semibold"
                : "text-gray-800 hover:text-pink-600"
            }`}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Right: Login / Signup */}
      <div className="flex space-x-4">
        <Link to="/auth">
          <button className="px-5 py-2 rounded-full border border-pink-600 text-pink-600 hover:bg-pink-50 transition font-medium">
            Login
          </button>
        </Link>
        <Link to="/auth">
          <button className="px-5 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition font-medium">
            Signup
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
