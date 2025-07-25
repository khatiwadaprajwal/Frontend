import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
const Contact = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-blue-50"> {/* Changed background color for Contact page */}
     <Navbar />
      <div className="flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl bg-white rounded-xl shadow-lg p-10 mt-12">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h1>
          <p className="mb-4 text-gray-600">We'd love to hear from you! Reach out to us with any questions, feedback, or partnership inquiries.</p>
          <div className="text-gray-500">
            <div className="mb-2"><span className="font-semibold">Email:</span> support@dkp.com</div>
            <div><span className="font-semibold">Phone:</span> +0123 456 789</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 