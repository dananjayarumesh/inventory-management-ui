import { describe, it, expect, vi, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import router from '@/router/index';
import { authApiClient, guestApiClient } from '../apiClient';
import defines from '@/defines';

describe('apiClient', () => {
  let authMock, guestMock;

  beforeEach(() => {
    authMock = new MockAdapter(authApiClient);
    guestMock = new MockAdapter(guestApiClient);
    vi.spyOn(router, 'push').mockImplementation(() => {});

    localStorage.clear();
  });

  describe('authApiClient', () => {
    it('includes Authorization header if token exists', async () => {
      const token = 'mocked_token';
      localStorage.setItem(defines.accessTokenKey, token);
      authMock.onGet('/test').reply((config) => {
        expect(config.headers.Authorization).toBe(`Bearer ${token}`);
        return [200, { success: true }];
      });

      const response = await authApiClient.get('/test');
      expect(response.data.success).toBe(true);
    });

    it('does not include Authorization header if token does not exist', async () => {
      authMock.onGet('/test').reply((config) => {
        expect(config.headers.Authorization).toBeUndefined();
        return [200, { success: true }];
      });

      const response = await authApiClient.get('/test');
      expect(response.data.success).toBe(true);
    });

    it('handles 401 response by clearing token and redirecting to login', async () => {
      localStorage.setItem(defines.accessTokenKey, 'mocked_token');
      authMock.onGet('/test').reply(401);

      await expect(authApiClient.get('/test')).rejects.toThrow();
      expect(localStorage.getItem(defines.accessTokenKey)).toBeNull();
      expect(router.push).toHaveBeenCalledWith({ path: '/login' });
    });

    it('handles 500 response by alerting user', async () => {
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => { });
      authMock.onGet('/test').reply(500);

      await expect(authApiClient.get('/test')).rejects.toThrow(
        'Server Error: Please try again later.'
      );
      expect(alertMock).toHaveBeenCalledWith(
        'There was an issue with the server. Please try again later.'
      );
      alertMock.mockRestore();
    });
  });

  describe('guestApiClient', () => {
    it('does not include Authorization header', async () => {
      const token = 'mocked_token';
      localStorage.setItem(defines.accessTokenKey, token);

      guestMock.onGet('/test').reply((config) => {
        expect(config.headers.Authorization).toBeUndefined();
        return [200, { success: true }];
      });
      const response = await guestApiClient.get('/test');
      expect(response.data.success).toBe(true);
    });

    it('handles 500 response by alerting user', async () => {
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => { });
      guestMock.onGet('/test').reply(500);

      await expect(guestApiClient.get('/test')).rejects.toThrow(
        'Server Error: Please try again later.'
      );
      expect(alertMock).toHaveBeenCalledWith(
        'There was an issue with the server. Please try again later.'
      );
      alertMock.mockRestore();
    });
  });
});
