import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../auth';
import { guestApiClient } from '@/services/apiClient';

vi.mock('@/services/apiClient', () => ({
  guestApiClient: {
    post: vi.fn(),
  },
}));

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('initializes with correct default values', () => {
    const authStore = useAuthStore();

    expect(authStore.errors).toEqual({});
    expect(authStore.loading).toBe(false);
    expect(authStore.user).toEqual({});
  });

  it('logs in successfully and saves token', async () => {
    const authStore = useAuthStore();

    vi.mocked(guestApiClient.post).mockResolvedValue({
      data: {
        access_token: 'mocked_access_token',
      },
    });

    const result = await authStore.login('test@example.com', 'password123');
    expect(guestApiClient.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        email: 'test@example.com',
        password: 'password123',
      }
    );
    expect(result).toBe(true);
    expect(localStorage.getItem('access_token')).toBe('mocked_access_token');
    expect(authStore.errors.email).toBe('');
    expect(authStore.loading).toBe(false);
  });

  it('handles login errors correctly', async () => {
    const authStore = useAuthStore();

    vi.mocked(guestApiClient.post).mockRejectedValue({
      response: {
        data: {
          error: 'Invalid credentials',
        },
      },
    });

    const result = await authStore.login('invalid@example.com', 'wrongpassword');
    expect(guestApiClient.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        email: 'invalid@example.com',
        password: 'wrongpassword',
      }
    );
    expect(result).toBe(false);
    expect(authStore.errors.email).toBe('Invalid credentials');
    expect(authStore.loading).toBe(false);
  });

  it('clears errors before login attempt', async () => {
    const authStore = useAuthStore();
    authStore.errors.email = 'Some error';
    authStore.errors.password = 'Another error';
    vi.mocked(guestApiClient.post).mockResolvedValue({
      data: {
        access_token: 'mocked_access_token',
      },
    });

    await authStore.login('test@example.com', 'password123');
    expect(authStore.errors.email).toBe('');
    expect(authStore.errors.password).toBe('');
  });

  it('logs out and removes token', () => {
    const authStore = useAuthStore();
    localStorage.setItem('access_token', 'mocked_access_token');

    authStore.logout();
    expect(localStorage.getItem('access_token')).toBeNull();
  });
});
