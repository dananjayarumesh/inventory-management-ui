import axios from 'axios';
import defines from '@/defines';
import { useRouter } from 'vue-router';

const router = useRouter();

// used for auth requests
const authApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

// used for guest requests that does not require token
const guestApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(defines.accessTokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authApiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 500) {
        // TODO: log sentry
        alert('There was an issue with the server. Please try again later.');
        return Promise.reject('Server Error: Please try again later.');
      } else if (statusCode === 401) {
        localStorage.removeItem(defines.accessTokenKey);
        router.push({ path: '/login' });
      }
    }
    return Promise.reject(error);
  }
);

guestApiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 500) {
      // TODO: log sentry
      alert('There was an issue with the server. Please try again later.');
      return Promise.reject('Server Error: Please try again later.');
    }
    return Promise.reject(error);
  }
);

export { authApiClient, guestApiClient };
