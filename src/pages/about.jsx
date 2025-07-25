import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
const About = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
     
      <div className="flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl bg-white rounded-xl shadow-lg p-10 mt-12">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">About Us</h1>
          <p className="mb-4 text-gray-600">Welcome to dkp! We are passionate about bringing you the latest in handcrafted traditional Nepali outfits. Our mission is to inspire and empower you to express your unique style, rooted in heritage and styled for today.</p>
          <p className="text-gray-500">This is a demo shop built with React and Tailwind CSS. Here you can browse our curated collections, discover new trends, and enjoy a seamless shopping experience. Thank you for visiting!</p>
        </div>
      </div>
    </div>
  );
};

export default About; 