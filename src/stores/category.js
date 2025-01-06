import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { authApiClient } from '@/apiClient';

export const useCategoryStore = defineStore('category', () => {
  const categories = reactive({});
  const loading = ref(false);

  const load = async () => {
    loading.value = true;

    try {
      const response = await authApiClient.get('/categories');
      categories.value = response.data.data;
      return true;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    loading,
    load
  };
});
