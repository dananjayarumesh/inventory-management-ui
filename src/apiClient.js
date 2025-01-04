// src/axios.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
  timeout: 5000,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem('accessToken');

    // If the token exists, attach it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);

export default apiClient;
