import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/image-asset.jpeg";
import Navbar from "../components/navbar"; // ✅ Import your navbar

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
     
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#e9dbc7] flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-10 md:py-20">
        <div className="flex-1 mb-10 md:mb-0 flex flex-col justify-center items-start px-2 md:px-8">
          <h1 className="font-serif text-7xl md:text-9xl font-extrabold mb-2 text-black tracking-tight leading-none drop-shadow-sm">DKP</h1>
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-6 text-gray-800 tracking-wide">DKP Collection</h2>
          <p className="mb-10 text-lg md:text-2xl text-gray-700 font-light leading-relaxed md:max-w-xl" style={{letterSpacing: '0.01em'}}>
            Experience timeless elegance with our handcrafted traditional Nepali outfits—<span className="text-gray-800">rooted in heritage, styled for today.</span>
          </p>
          <Link to="/products">
            <button className="px-10 py-4 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-900 transition text-lg tracking-wide">SHOP DKP</button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center items-center">
          <img 
            src={heroImage} 
            alt="Traditional Nepali Outfits" 
            className="w-full max-w-xl rounded-lg shadow-2xl object-cover border border-gray-200"
            style={{boxShadow: '0 8px 32px 0 rgba(60, 60, 60, 0.18)'}}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
