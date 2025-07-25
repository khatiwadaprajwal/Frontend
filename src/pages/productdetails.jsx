import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useCart } from "../context/cartcontext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setError("");
      })
      .catch((err) => {
        setError(err.message || "Failed to load product");
        console.error("Error fetching product:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const cartItem = {
      productDetails: product,
      quantity: quantity,
    };
    addToCart(cartItem);
    navigate("/cart");
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${quantity} x ${product.title}`);
  };

  if (loading) return <div className="text-center mt-10">Loading product...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
  if (!product) return <div className="text-center mt-10">Product not found</div>;

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm">
            <button
              onClick={() => navigate("/products")}
              className="text-blue-500 hover:text-blue-700"
            >
              Products
            </button>
            <span className="mx-2">›</span>
            <span className="text-gray-600">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product Images */}
          <div>
            <div className="w-full h-96 bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img
                src={product.images?.[selectedImage] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images?.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 flex-shrink-0 ${
                      selectedImage === index ? "border-blue-500" : "border-gray-200"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

            <div className="flex items-center space-x-4 mb-4">
              {product.brand && (
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                  {product.brand}
                </span>
              )}
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
            </div>

            {product.rating && (
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({product.rating}/5)</span>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-green-600">
                  Rs. {product.price}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-6 space-y-2 text-sm">
              <div>
                <strong>Stock:</strong>
                <span
                  className={`ml-2 ${
                    product.stock > 10 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock} available
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 border rounded text-center min-w-[50px]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;