// Product Card Component
const ProductCard = ({ product, onNavigateToCart }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // Navigate to cart page
    if (onNavigateToCart) {
      onNavigateToCart();
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <img 
        src={product.thumbnail} 
        alt={product.title}
        className="w-full h-48 object-cover rounded mb-3"
      />
      <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center mb-3">
        <span className="text-2xl font-bold text-green-600">${product.price}</span>
        <span className="text-sm text-gray-500">Stock: {product.stock}</span>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Add to Cart
      </button>
    </div>
  );
};

// Cart Item Component
const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-4">
        {item.productDetails && (
          <>
            <img
              src={item.productDetails.thumbnail}
              alt={item.productDetails.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.productDetails.title}</h3>
              <p className="text-gray-600">${item.productDetails.price}</p>
            </div>
          </>
        )}
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateCartItem(item.id, item.quantity - 1)}
            className="bg-gray-200 p-1 rounded hover:bg-gray-300"
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-1 bg-gray-100 rounded">{item.quantity}</span>
          <button
            onClick={() => updateCartItem(item.id, item.quantity + 1)}
            className="bg-gray-200 p-1 rounded hover:bg-gray-300"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="text-right">
          <p className="font-semibold">
            ${((item.productDetails?.price || 0) * item.quantity).toFixed(2)}
          </p>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 hover:text-red-800 mt-1"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// User Selector Component
const UserSelector = () => {
  const { currentUser, switchUser, loading } = useCart();

  const users = [1, 2, 3, 4, 5]; // Mock user IDs

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Current User:</span>
      <select
        value={currentUser}
        onChange={(e) => switchUser(Number(e.target.value))}
        disabled={loading}
        className="px-2 py-1 border rounded text-sm"
      >
        {users.map(userId => (
          <option key={userId} value={userId}>
            User {userId}
          </option>
        ))}
      </select>
    </div>
  );
};