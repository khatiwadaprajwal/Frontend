import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import heroImage from "../assets/image-asset.jpeg";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data.products) ? data.products : []);
      })
      .catch((err) => {
        setError(err.message || "Failed to load products");
        console.error("Error fetching products:", err);
      });
  }, [navigate]);

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Function to handle product click
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-64 md:h-96">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Explore Our Products</h1>
          <p className="mt-2 text-lg md:text-xl">Best deals on the market</p>
        </div>
      </section>

      {/* Product Section */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Available Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300 cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-1 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-green-600 font-bold">Rs. {product.price}</p>
                {product.discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(product.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
                </div>
              )}

              {/* Stock Status */}
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-800' 
                    : product.stock > 0 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;