import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
      component: () => import('../views/CategoryView.vue'),
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
