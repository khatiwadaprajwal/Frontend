import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Pages
import AuthPage from './pages/authPage';
import OtpPage from './pages/otpPage';
import ProductList from './pages/dashboard';         // Product listing page
import ProductDetail from './pages/productdetails';  // Product detail page
import About from './pages/about';
import Contact from './pages/contact';
import Home from './pages/home';
import CartPage from './pages/cart';                 // ✅ Cart page (add this)

// Context
import { CartProvider } from './context/cartcontext'; // ✅ Wrap the app with CartProvider

function AppRoutes() {
  const navigate = useNavigate();
  const [emailForOtp, setEmailForOtp] = useState('');

  const handleSignupSuccess = (email) => {
    localStorage.setItem('userEmail', email);
    setEmailForOtp(email);
    navigate('/otp');
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} /> {/* ✅ Consistent route */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<CartPage />} /> {/* ✅ Cart route */}
      <Route path="/auth" element={<AuthPage onSignupSuccess={handleSignupSuccess} />} />
      <Route path="/otp" element={<OtpPage email={emailForOtp} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;
