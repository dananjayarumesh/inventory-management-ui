import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCategoryStore } from '../category'; // Adjust path as necessary
import { getCategories } from '@/services/categoryService';

vi.mock('@/services/categoryService', () => ({
  getCategories: vi.fn(),
}));

describe('useCategoryStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('initializes with correct default values', () => {
    const categoryStore = useCategoryStore();

    expect(categoryStore.categories).toEqual({});
    expect(categoryStore.loading).toBe(false);
  });

  it('loads categories successfully', async () => {
    const categoryStore = useCategoryStore();

    vi.mocked(getCategories).mockResolvedValue({
      data: {
        data: [
          { id: 1, name: 'Category 1' },
          { id: 2, name: 'Category 2' },
        ],
      },
    });

    const result = await categoryStore.load();

    expect(getCategories).toHaveBeenCalled();

    expect(result).toBe(true);
    expect(categoryStore.categories.value).toEqual([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ]);
    expect(categoryStore.loading).toBe(false);
  });

  it('handles API errors during category load', async () => {
    const categoryStore = useCategoryStore();

    vi.mocked(getCategories).mockRejectedValue(new Error('API error'));

    const result = await categoryStore.load();

    expect(getCategories).toHaveBeenCalled();

    expect(result).toBe(false);
    expect(categoryStore.categories).toEqual({});
    expect(categoryStore.loading).toBe(false);
  });

  it('sets loading state correctly during load', async () => {
    const categoryStore = useCategoryStore();

    vi.mocked(getCategories).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              data: {
                data: [{ id: 1, name: 'Category 1' }],
              },
            });
          }, 100)
        )
    );

    const loadPromise = categoryStore.load();

    expect(categoryStore.loading).toBe(true);

    await loadPromise;

    expect(categoryStore.loading).toBe(false);
  });
});
