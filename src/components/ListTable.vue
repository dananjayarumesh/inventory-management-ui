<script setup>
defineProps({
  headers: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['edit', 'delete']);
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th v-for="(header, index) in headers"
:key="index"
            class="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-200">
            {{ header }}
          </th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-200"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="(value, valueIndex) in row"
:key="valueIndex"
            class="px-6 py-4 text-sm text-gray-900 border border-gray-200">
            {{ value }}
          </td>
          <td class="px-6 py-4 text-sm text-gray-900 border border-gray-200">
            <button class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
              @click="emit('edit', row.id)">Edit</button>
            <button class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              @click="emit('delete', row.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>