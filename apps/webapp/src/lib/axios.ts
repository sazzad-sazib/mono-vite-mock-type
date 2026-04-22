import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://jsonplaceholder.typicode.com',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach auth token if present
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — unwrap data, handle global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // e.g. redirect to login, clear token, etc.
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
