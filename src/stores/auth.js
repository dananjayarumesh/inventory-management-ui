import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const errors = reactive({});
  const loading = ref(false);
  const user = reactive({});

  const login = async (email, password) => {

    loading.value = true;
    errors.email = "";
    errors.password = "";

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      console.log('sds');
      user.value = response.data.user; // Save user info
      localStorage.setItem("access_token", response.data.access_token); // Save token
    } catch (error) {
      if (error.response?.data?.error) {
        errors.email = error.response.data.error || '';
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    errors,
    loading,
    login,
  };
})
