// src/pages/OtpPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail);
    console.log("Loaded email from localStorage:", storedEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/v1/auth/verify-otp",
        { email, otp },
        { withCredentials: true }
      );
      alert("OTP Verified Successfully!");
      localStorage.removeItem("userEmail");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
      <p className="mb-4 text-sm text-gray-600">Sent to: {email}</p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="w-full mb-4 p-2 border"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Verify OTP
      </button>
    </form>
  );
};

export default OtpPage;
