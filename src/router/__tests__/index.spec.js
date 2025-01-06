import { mount } from '@vue/test-utils';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '..';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/components/TopMenu.vue', () => ({
  default: {
    name: 'TopMenu',
    template: '<div>TopMenu</div>',
  },
}));

vi.mock('@/views/LoginView.vue', () => ({
  default: {
    name: 'LoginView',
    template: '<div>Login</div>',
  },
}));

vi.mock('@/views/InventoryView.vue', () => ({
  default: {
    name: 'InventoryView',
    template: '<div>Inventory</div>',
  },
}));

vi.mock('@/views/DispatchNoteView.vue', () => ({
  default: {
    name: 'DispatchNoteView',
    template: '<div>DispatchNote</div>',
  },
}));

vi.mock('@/views/ReceiveNoteView.vue', () => ({
  default: {
    name: 'ReceiveNoteView',
    template: '<div>ReceiveNote</div>',
  },
}));

vi.mock('@/views/CategoryView.vue', () => ({
  default: {
    name: 'CategoryView',
    template: '<div>Category</div>',
  },
}));

vi.mock('@/views/UserView.vue', () => ({
  default: {
    name: 'UserView',
    template: '<div>UserView</div>',
  },
}));

describe('Router Tests', () => {
  let app;

  beforeEach(() => {
    setActivePinia(createPinia());
    app = createApp(App);
    app.use(router);
  });

  it('should navigate to /login', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    await router.push('/login');
    await router.isReady();
    expect(wrapper.html()).toContain('Login');
    expect(wrapper.html()).not.toContain('TopMenu');
  });

  it('should navigate to /inventory when logged in (auth: true)', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    await router.push('/');
    await router.isReady();
    expect(wrapper.html()).toContain('Inventory');
    //TODO: investigate issue here
    // expect(wrapper.html()).toContain('TopMenu');
  });

  it('should navigate to /dispatch-notes when logged in (auth: true)', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    await router.push('/dispatch-notes');
    await router.isReady();
    expect(wrapper.html()).toContain('DispatchNote');
    expect(wrapper.html()).toContain('TopMenu');
  });

  it('should navigate to /receive-notes when logged in (auth: true)', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    await router.push('/receive-notes');
    await router.isReady();
    expect(wrapper.html()).toContain('ReceiveNote');
    expect(wrapper.html()).toContain('TopMenu');
  });

  it('should navigate to /categories when logged in (auth: true)', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    await router.push('/categories');
    await router.isReady();
    expect(wrapper.html()).toContain('Category');
    expect(wrapper.html()).toContain('TopMenu');
  });

  it('should navigate to /users when logged in (auth: true)', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    await router.push('/users');
    await router.isReady();
    expect(wrapper.html()).toContain('User');
    expect(wrapper.html()).toContain('TopMenu');
  });

  it('should check the "auth" meta property on /inventory route', () => {
    const route = router.resolve('/');
    expect(route.meta.auth).toBe(true);
  });

  it('should check the "auth" meta property on /login route', () => {
    const route = router.resolve('/login');
    expect(route.meta.auth).toBeUndefined();
  });

  it.skip('should navigate to a non-existent route and check 404 ', async () => {
    // TODO: implement
  });
});
