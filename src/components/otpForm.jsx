import { useState } from 'react';
import axios from 'axios';

function OtpForm({ email, onVerify }) {
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/v1/auth/verify-otp', { email, otp });
      onVerify(); // move to login
    } catch (err) {
      alert('OTP verification failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Verify OTP</h2>
      <p>Sent to: {email}</p>
      <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
      <button type="submit">Verify</button>
    </form>
  );
}

export default OtpForm;
