import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const errors = reactive({});
  const loading = ref(false);
  const user = reactive({});

  const login = async (email, password) => {
    loading.value = true;
    errors.email = '';
    errors.password = '';

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('access_token', response.data.access_token); // Save token
      return true;
    } catch (error) {
      if (error.response?.data?.error) {
        errors.email = error.response.data.error || '';
      }
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
  };

  return {
    user,
    errors,
    loading,
    login,
    logout
  };
})
