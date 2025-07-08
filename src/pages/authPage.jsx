import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '', otp: '' });
  const [step, setStep] = useState('form'); // 'form', 'otp', 'done'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[data-otp-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
      setForm({ ...form, otp: newOtpDigits.join('') });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'signup') {
        await axios.post('http://localhost:3001/v1/auth/signup', form);
        setStep('otp');
      } else {
        await axios.post('http://localhost:3001/v1/auth/login', form);
        setStep('done');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:3001/v1/auth/verify-otp', {
        email: form.email,
        otp: form.otp,
      });
      setStep('done');
    } catch (err) {
      setError('Invalid OTP. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:3001/v1/auth/resend-otp', {
        email: form.email,
      });
      setError('');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === 'otp') {
      const firstInput = document.querySelector('input[data-otp-index="0"]');
      if (firstInput) firstInput.focus();
    }
  }, [step]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-500 to-pink-400">
      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-12 border border-white/20 flex flex-col md:flex-row items-center justify-center gap-0 md:gap-12">
          {/* Left Side: Brand Header (hidden on mobile) */}
          <div className="hidden md:flex flex-col items-center justify-center w-1/2">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-white mb-2">
              STYLE<span className="text-yellow-400">HUB</span>
            </h1>
            <p className="text-white/80 text-xl text-center max-w-xs">
              {step === 'form' 
                ? (mode === 'login' ? 'Welcome back to your style journey' : 'Join the fashion revolution')
                : step === 'otp' 
                  ? 'Verify your email to continue'
                  : 'Welcome to StyleHub!'}
            </p>
          </div>

          {/* Right Side: Auth Card */}
          <div className="w-full md:w-1/2 max-w-md mx-auto">
            {/* Brand Header (mobile only) */}
            <div className="md:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                STYLE<span className="text-yellow-400">HUB</span>
              </h1>
              <p className="text-white/80 text-lg">
                {step === 'form' 
                  ? (mode === 'login' ? 'Welcome back to your style journey' : 'Join the fashion revolution')
                  : step === 'otp' 
                    ? 'Verify your email to continue'
                    : 'Welcome to StyleHub!'}
              </p>
            </div>

            {/* Auth Card Content */}
            <div className="bg-white/95 rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20">
              {/* Mode Toggle */}
              {step === 'form' && (
                <div className="flex bg-gray-100/80 rounded-2xl p-1 mb-6">
                  <button
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      mode === 'login' 
                        ? 'bg-white text-gray-900 shadow-lg' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => {
                      setMode('login');
                      setForm({ name: '', email: '', password: '', otp: '' });
                      setError('');
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      mode === 'signup' 
                        ? 'bg-white text-gray-900 shadow-lg' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => {
                      setMode('signup');
                      setForm({ name: '', email: '', password: '', otp: '' });
                      setError('');
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Login/Signup Form */}
              {step === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {mode === 'signup' && (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Full Name</label>
                      <div className="relative">
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                          required
                        />
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Password</label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                      </div>
                    ) : (
                      mode === 'login' ? 'Sign In' : 'Create Account'
                    )}
                  </button>
                </form>
              )}
              {/* OTP Verification */}
              {step === 'otp' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Check your email</h3>
                    <p className="text-gray-600">
                      We've sent a 6-digit code to{' '}
                      <span className="font-semibold text-gray-900">{form.email}</span>
                    </p>
                  </div>
                  <form onSubmit={handleOtpVerify} className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700">Enter the 6-digit code</label>
                      <div className="flex gap-3 justify-center">
                        {otpDigits.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            data-otp-index={index}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            className="w-12 h-12 md:w-14 md:h-14 text-center text-lg font-bold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            maxLength={1}
                            required
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading || form.otp.length !== 6}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Verifying...
                        </div>
                      ) : (
                        'Verify Code'
                      )}
                    </button>
                  </form>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">
                      Didn't receive the code?{' '}
                      <button
                        onClick={resendOtp}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-700 font-semibold disabled:opacity-50"
                      >
                        Resend
                      </button>
                    </p>
                  </div>
                </div>
              )}
              {/* Success State */}
              {step === 'done' && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to StyleHub!</h3>
                    <p className="text-gray-600">You have successfully signed in to your account.</p>
                  </div>
                  <button
                    onClick={() => {
                      setStep('form');
                      setForm({ name: '', email: '', password: '', otp: '' });
                      setOtpDigits(['', '', '', '', '', '']);
                      setError('');
                    }}
                    className="px-8 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-white/70 text-sm">
                © 2024 StyleHub. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
