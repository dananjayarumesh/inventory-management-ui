import { authApiClient } from './apiClient';

export const getCategories = () => authApiClient.get('/categories');
export const submitCategory = name => authApiClient.post('/categories', { 'name': name });
export const deleteCategory = id => authApiClient.delete(`/categories/${id}`);
