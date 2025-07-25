import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Package as PackageIcon // ✅ Renamed to avoid JavaScript keyword conflict
} from 'lucide-react';

// ==================== CART CONTEXT ====================
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userCarts, setUserCarts] = useState([]);
  const [currentUser, setCurrentUser] = useState(1); // Mock user ID
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get all carts (admin use)
  const getAllCarts = () => {
    setLoading(true);
    setError(null);

    fetch('https://dummyjson.com/carts')
      .then(res => res.json())
      .then(data => {
        setUserCarts(data.carts);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch carts');
        setLoading(false);
      });
  };

  // Get cart by user ID
  const getCartByUser = (userId = currentUser) => {
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/carts/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.carts && data.carts.length > 0) {
          const userCart = data.carts[0];
          setCartItems(userCart.products || []);
        } else {
          setCartItems([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(`Failed to fetch cart for user ${userId}`);
        setLoading(false);
      });
  };

  // Fetch on mount or when user changes
  useEffect(() => {
    if (currentUser) {
      getCartByUser(currentUser);
    }
  }, [currentUser]);

  // Load product details for each item
  useEffect(() => {
    cartItems.forEach(item => {
      if (item.id && !item.productDetails) {
        fetch(`https://dummyjson.com/products/${item.id}`)
          .then(res => res.json())
          .then(productData => {
            setCartItems(prev =>
              prev.map(cartItem =>
                cartItem.id === item.id
                  ? { ...cartItem, productDetails: productData }
                  : cartItem
              )
            );
          })
          .catch(err => console.error('Error fetching product:', err));
      }
    });
  }, [cartItems]);

  // Add to cart
  const addToCart = (product) => {
    setError(null);
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      setCartItems(prev =>
        prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems(prev => [
        ...prev,
        {
          id: product.id,
          quantity: 1,
          productDetails: product
        }
      ]);
    }
  };

  // Update quantity
  const updateCartItem = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total price
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.productDetails?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  // Item count
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Switch user (demo)
  const switchUser = (userId) => {
    setCurrentUser(userId);
  };

  const value = {
    cartItems,
    userCarts,
    currentUser,
    error,
    loading,
    getAllCarts,
    getCartByUser,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    switchUser
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
