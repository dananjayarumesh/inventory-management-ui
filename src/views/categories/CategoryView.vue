<script setup>
import { ref, computed, onMounted } from 'vue';
import TopMenu from '@/components/TopMenu.vue';
import ListTable from '@/components/ListTable.vue';
import CategoryAddView from '@/views/categories/CategoryAddView.vue';
import { useCategoryStore } from '@/stores/category';
import { deleteCategory as processDeleteCategory } from '@/services/categoryService';
import BaseLayout from '@/layouts/BaseLayout.vue';

const categoryStore = useCategoryStore();

const headers = ref([{ value: '#', width: 5 }, { value: 'Name' }]);
const loading = ref(true);
const showAddPopup = ref(false);

onMounted(async () => {
  await categoryStore.load();
});

const categories = computed(() => {
  const responseCategories = categoryStore.categories.value;
  if (responseCategories && responseCategories.length > 0) {
    return responseCategories.map(category => ({
      'id': category.id,
      'name': category.name
    }));
  } else {
    return [];
  }
});

const deleteCategory = (async (id) => {
  // TODO: add confirmation popup
  try {
    await processDeleteCategory(id);
    await categoryStore.load();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    //TODO: handle error
  }
});
</script>

<template>
  <TopMenu></TopMenu>
  <BaseLayout title="Categories" description="List of inventory categories added to the system.">
    <template #tools>
      <button class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600" @click="showAddPopup = true">
        Add Category
      </button>
    </template>
    <template #content>
      <div class="mx-auto">
        <ListTable :headers="headers" :rows="categories" :loading="loading">
          <template #tools="{ rowId }">
            <button class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Edit</button>
            <button class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              @click="deleteCategory(rowId)">Delete</button>
          </template>
        </ListTable>
      </div>
    </template>
  </BaseLayout>
  <CategoryAddView :show="showAddPopup" @closed="showAddPopup = false"></CategoryAddView>
</template>
