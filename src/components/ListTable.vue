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

</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th v-for="(header, index) in headers" :key="index" :width="`${header.width}%`"
            class="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-200">
            {{ header.value }}
          </th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-200" width="20%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="(value, valueIndex) in row" :key="valueIndex"
            class="px-6 py-4 text-sm text-gray-900 border border-gray-200">
            {{ value }}
          </td>
          <td class="px-6 py-4 text-sm text-gray-900 border border-gray-200 space-x-1">
            <slot name="tools" :rowId="row.id"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>