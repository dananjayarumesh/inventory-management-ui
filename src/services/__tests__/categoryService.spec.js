import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCategories, submitCategory, deleteCategory } from '../categoryService';
import { authApiClient } from '../apiClient';

vi.mock('../apiClient', () => ({
  authApiClient: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('categoryService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches categories successfully', async () => {
    const mockedCategories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ];

    authApiClient.get.mockResolvedValue({ data: { data: mockedCategories } });

    const response = await getCategories();
    expect(authApiClient.get).toHaveBeenCalledWith('/categories');
    expect(response.data.data).toEqual(mockedCategories);
  });

  it('submits a category successfully', async () => {
    const categoryName = 'New Category';
    const mockedResponse = { id: 1, name: categoryName };

    authApiClient.post.mockResolvedValue({ data: mockedResponse });

    const response = await submitCategory(categoryName);
    expect(authApiClient.post).toHaveBeenCalledWith('/categories', { name: categoryName });
    expect(response.data).toEqual(mockedResponse);
  });

  it('deletes a category successfully', async () => {
    const categoryId = 1;

    authApiClient.delete.mockResolvedValue({ status: 204 });

    const response = await deleteCategory(categoryId);
    expect(authApiClient.delete).toHaveBeenCalledWith(`/categories/${categoryId}`);
    expect(response.status).toBe(204);
  });

  it('handles errors when fetching categories', async () => {
    authApiClient.get.mockRejectedValue(new Error('Request failed with status code 500'));

    await expect(getCategories()).rejects.toThrowError('Request failed with status code 500');
    expect(authApiClient.get).toHaveBeenCalledWith('/categories');
  });

  it('handles errors when submitting a category', async () => {
    const categoryName = 'Invalid Category';

    authApiClient.post.mockRejectedValue(new Error('Request failed with status code 400'));

    await expect(submitCategory(categoryName)).rejects.toThrowError('Request failed with status code 400');
    expect(authApiClient.post).toHaveBeenCalledWith('/categories', { name: categoryName });
  });

  it('handles errors when deleting a category', async () => {
    const categoryId = 999;

    authApiClient.delete.mockRejectedValue(new Error('Request failed with status code 404'));

    await expect(deleteCategory(categoryId)).rejects.toThrowError('Request failed with status code 404');
    expect(authApiClient.delete).toHaveBeenCalledWith(`/categories/${categoryId}`);
  });
});
