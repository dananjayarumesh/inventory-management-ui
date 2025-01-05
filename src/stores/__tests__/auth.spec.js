import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../auth';
import axios from 'axios';

vi.mock('axios');

describe('useAuthStore', () => {
  beforeEach(() => {
    // Activate a fresh Pinia instance before each test
    setActivePinia(createPinia());
    // Reset mocks before each test
    vi.clearAllMocks();
    // Clear localStorage before each test
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

    // Mock API response
    axios.post.mockResolvedValue({
      data: {
        access_token: 'mocked_access_token',
      },
    });

    // Call login
    const result = await authStore.login('test@example.com', 'password123');

    // Assert API call
    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        email: 'test@example.com',
        password: 'password123',
      }
    );

    // Assert login success and token storage
    expect(result).toBe(true);
    expect(localStorage.getItem('access_token')).toBe('mocked_access_token');
    expect(authStore.errors.email).toBe('');
    expect(authStore.loading).toBe(false);
  });

  it('handles login errors correctly', async () => {
    const authStore = useAuthStore();

    // Mock API error response
    axios.post.mockRejectedValue({
      response: {
        data: {
          error: 'Invalid credentials',
        },
      },
    });

    // Call login
    const result = await authStore.login('invalid@example.com', 'wrongpassword');

    // Assert API call
    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        email: 'invalid@example.com',
        password: 'wrongpassword',
      }
    );

    // Assert login failure and error handling
    expect(result).toBe(false);
    expect(authStore.errors.email).toBe('Invalid credentials');
    expect(authStore.loading).toBe(false);
  });

  it('clears errors before login attempt', async () => {
    const authStore = useAuthStore();

    // Set some existing errors
    authStore.errors.email = 'Some error';
    authStore.errors.password = 'Another error';

    // Mock API success response
    axios.post.mockResolvedValue({
      data: {
        access_token: 'mocked_access_token',
      },
    });

    // Call login
    await authStore.login('test@example.com', 'password123');

    // Assert errors are cleared
    expect(authStore.errors.email).toBe('');
    expect(authStore.errors.password).toBe('');
  });

  it('logs out and removes token', () => {
    const authStore = useAuthStore();

    // Add a token to localStorage
    localStorage.setItem('access_token', 'mocked_access_token');

    // Call logout
    authStore.logout();

    // Assert token is removed
    expect(localStorage.getItem('access_token')).toBeNull();
  });
});
