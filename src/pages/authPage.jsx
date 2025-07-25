import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleSignupChange = (e) => setSignupData({ ...signupData, [e.target.name]: e.target.value });

  // Login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/login", {
        email: loginData.email.trim(),
        password: loginData.password,
      });
      navigate("/products");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  // Signup submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/signup", {
        fullName: signupData.fullName,
        email: signupData.email.trim(),
        password: signupData.password,
        confirmPassword: signupData.confirmPassword,
      });
      alert("Signup successful! Please check your email for OTP.");
      setActiveTab("login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-500 to-purple-400">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4 bg-white/80 shadow-md border-b border-gray-200">
        <div className="font-bold text-xl text-pink-600">DKP CLOTHING</div>
        <div>
          <Link to="/products" className="focus-within:shadow-lg font-size: var(--text-3xl); ...">Home</Link>
        </div>
      </nav>
      {/* Auth Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-10 w-full max-w-md mt-8 mb-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Login Form</h2>
          <div className="flex mb-8 rounded-lg overflow-hidden border border-gray-200">
            <button
              className={`flex-1 py-2 font-semibold transition-colors ${activeTab === "login" ? "bg-gradient-to-r from-pink-500 to-purple-400 text-white" : "bg-white text-gray-700"}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 font-semibold transition-colors ${activeTab === "signup" ? "bg-gradient-to-r from-pink-500 to-purple-400 text-white" : "bg-white text-gray-700"}`}
              onClick={() => setActiveTab("signup")}
            >
              Signup
            </button>
          </div>
          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-50"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-50"
                required
              />
              <div className="text-right">
                <a href="#" className="text-pink-400 text-sm hover:underline">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-400 text-white font-bold text-lg shadow-md hover:scale-105 transition-transform"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <div className="text-center text-sm mt-2">
                Not a member?{' '}
                <span
                  className="text-pink-500 font-semibold cursor-pointer hover:underline"
                  onClick={() => setActiveTab("signup")}
                >
                  Signup now
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={signupData.fullName}
                onChange={handleSignupChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-50"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={signupData.email}
                onChange={handleSignupChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-50"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-50"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-50"
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-400 text-white font-bold text-lg shadow-md hover:scale-105 transition-transform"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
              <div className="text-center text-sm mt-2">
                Already have an account?{' '}
                <span
                  className="text-pink-500 font-semibold cursor-pointer hover:underline"
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
