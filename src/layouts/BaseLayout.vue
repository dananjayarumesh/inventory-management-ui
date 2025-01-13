<script setup>

defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  },
  description: {
    type: String,
    required: true,
    default: ''
  }
});
</script>

<template>
  <div class="container">
    <div class="sm:px-0 relative mb-5">
      <h3 class="text-base/7 font-semibold text-gray-900">{{ title }}</h3>
      <p class="mt-1 max-w-2xl text-sm/6 text-gray-500">{{ description }}</p>
      <div class="absolute right-0 top-4">
        <slot name="tools"></slot>
      </div>
    </div>
    <slot name="content"></slot>
  </div>
</template>