<script setup>
import { ref, computed } from 'vue';
import TopMenu from '../components/TopMenu.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import ListTable from '@/components/ListTable.vue';
import ListPaginator from '@/components/ListPaginator.vue';

const headers = ref([
  { value: '#', width: 5 },
  { value: 'Name' },
  { value: 'Category' },
  { value: 'Created By' }
]);
const loading = ref(true);
const showAddPopup = ref(false);

const items = computed(() => {
  return [
    {
      'id': 1,
      'name': 'Iphone 13',
      'category': 'Mobile Phones',
      'created_by': 'Admin'
    }
  ];
  // const responseCategories = categoryStore.categories.value;
  // if (responseCategories && responseCategories.length > 0) {
  //   return responseCategories.map(category => ({
  //     'id': category.id,
  //     'name': category.name
  //   }));
  // } else {
  //   return [];
  // }
});
</script>

<template>
  <TopMenu></TopMenu>
  <BaseLayout title="Inventory" description="List of inventory items added to the system.">
    <template #tools>
      <button class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600" @click="showAddPopup = true">
        Add Item
      </button>
    </template>
    <template #content>
      <div class="mx-auto">
        <ListTable :headers="headers" :rows="items" :loading="loading">
          <template #tools>
            <button class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Edit</button>
            <button class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
          </template>
        </ListTable>
      </div>
      <ListPaginator></ListPaginator>
    </template>
  </BaseLayout>
  <BaseLayout>
    <div>Inventory</div>
  </BaseLayout>
</template>
