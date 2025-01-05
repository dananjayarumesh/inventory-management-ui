import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginView from '../LoginView.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

// Mock the auth store and router
vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn(),
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

describe('LoginView', () => {
  it('renders the login form correctly', () => {
    const mockAuth = {
      login: vi.fn(),
      errors: {},
    };
    useAuthStore.mockReturnValue(mockAuth);

    const wrapper = mount(LoginView);
    expect(wrapper.find('h2').text()).toBe('Sign in to your account');
    expect(wrapper.find('input[name="email"]').exists()).toBe(true);
    expect(wrapper.find('input[name="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').text()).toBe('Sign in');
  });

  it('shows error messages if auth store has errors', async () => {
    const mockAuth = {
      login: vi.fn(),
      errors: { email: 'Invalid email', password: 'Invalid password' },
    };
    useAuthStore.mockReturnValue(mockAuth);

    const wrapper = mount(LoginView);

    expect(wrapper.find('p.text-red-500').exists()).toBe(true);
    expect(wrapper.text()).toContain('Invalid email');
    expect(wrapper.text()).toContain('Invalid password');
  });

  it('calls the login function with correct data', async () => {
    const mockAuth = {
      login: vi.fn().mockResolvedValue(true),
      errors: {},
    };
    const mockRouter = { push: vi.fn() };

    useAuthStore.mockReturnValue(mockAuth);
    useRouter.mockReturnValue(mockRouter);

    const wrapper = mount(LoginView);

    // Set form values
    await wrapper.find('input[name="email"]').setValue('test@example.com');
    await wrapper.find('input[name="password"]').setValue('password123');

    // Trigger form submission
    await wrapper.find('form').trigger('submit.prevent');

    // Assert login function called with correct arguments
    expect(mockAuth.login).toHaveBeenCalledWith('test@example.com', 'password123');

    // Assert router navigation on success
    expect(mockRouter.push).toHaveBeenCalledWith({ path: '/' });
  });

  it('does not navigate if login fails', async () => {
    const mockAuth = {
      login: vi.fn().mockResolvedValue(false),
      errors: {},
    };
    const mockRouter = { push: vi.fn() };

    useAuthStore.mockReturnValue(mockAuth);
    useRouter.mockReturnValue(mockRouter);

    const wrapper = mount(LoginView);

    // Set form values
    await wrapper.find('input[name="email"]').setValue('test@example.com');
    await wrapper.find('input[name="password"]').setValue('wrongpassword');

    // Trigger form submission
    await wrapper.find('form').trigger('submit.prevent');

    // Assert login function called
    expect(mockAuth.login).toHaveBeenCalledWith('test@example.com', 'wrongpassword');

    // Assert router navigation does not happen
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
