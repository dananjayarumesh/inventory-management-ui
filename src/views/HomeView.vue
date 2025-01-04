<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const logout = async () => {
  auth.logout();
  router.push({ path: '/login' });
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
    <div>
      <button @click="logout">Log Out</button>
    </div>
  </header>
</template>
