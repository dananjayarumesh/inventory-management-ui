import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/',
      name: 'inventory',
      component: () => import('../views/InventoryView.vue'),
      meta: { auth: true },
    },
    {
      path: '/dispatch-notes',
      name: 'dispatch-notes',
      component: () => import('../views/DispatchNoteView.vue'),
      meta: { auth: true },
    },
    {
      path: '/receive-notes',
      name: 'receive-notes',
      component: () => import('../views/ReceiveNoteView.vue'),
      meta: { auth: true },
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/categories/CategoryView.vue'),
      meta: { auth: true },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UserView.vue'),
      meta: { auth: true },
    },
  ],
});

export default router;
