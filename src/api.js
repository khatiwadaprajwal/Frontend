
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/v1', // your backend API
  withCredentials: true, // ⬅️ Important for cookie-based auth
});

export default api;
