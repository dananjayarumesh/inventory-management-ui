<script setup>
import { RouterView, useRoute } from 'vue-router'
import TopMenu from './components/TopMenu.vue'

const route = useRoute();
const isAuthRoute = route.meta.auth === true;
</script>

<template>
  <TopMenu v-if="isAuthRoute" />
  <RouterView />
</template>