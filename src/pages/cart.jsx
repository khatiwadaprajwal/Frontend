// src/pages/cart.jsx
import React from 'react';
import { useCart } from '../context/cartcontext'; // Ensure this path is correct
import { ShoppingCart, Package, Minus, Plus, Trash2 } from 'lucide-react'; // Added icons for quantity and remove actions

const CartPage = () => {
  const {
    cartItems,
    currentUser,
    clearCart,
    getCartTotal,
    getCartItemCount,
    loading,
    error,
    updateCartItem,
    removeFromCart
  } = useCart();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
        {error}
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <Package size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart size={24} />
          Cart for User {currentUser} ({getCartItemCount()} items)
        </h1>
        <button
          onClick={clearCart}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => {
          const product = item.productDetails;
          return (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded shadow-sm">
              <div className="flex items-center space-x-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-gray-600">Price: Rs. {product.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateCartItem(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                  className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateCartItem(item.id, item.quantity + 1)}
                  className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total: Rs. {getCartTotal().toFixed(2)}</span>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
