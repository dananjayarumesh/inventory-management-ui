import { mount } from '@vue/test-utils';
import { vi, describe, it, expect } from 'vitest';
import TopMenu from '@/components/TopMenu.vue';
import { createRouter, createWebHistory } from 'vue-router';

vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn().mockReturnValue({
    logout: vi.fn(),
  }),
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/inventory', name: 'inventory' },
    { path: '/login', name: 'login' },
    { path: '/dispatch-notes', name: 'dispatch-notes' },
    { path: '/receive-notes', name: 'receive-notes' },
    { path: '/categories', name: 'categories' },
    { path: '/users', name: 'users' }
  ],
});

describe('TopMenu', () => {
  it('renders the navigation menu correctly', async () => {
    const wrapper = mount(TopMenu, {
      global: {
        plugins: [router],
      },
    });

    // assert values in more solid way
    expect(wrapper.text()).toContain('Inventory');
    expect(wrapper.text()).toContain('Dispatch Notes');
    expect(wrapper.text()).toContain('Receive Notes');
    expect(wrapper.text()).toContain('Categories');
    expect(wrapper.text()).toContain('Users');
    expect(wrapper.text()).toContain('Log Out');
  });

  // TODO: complete this file
});
