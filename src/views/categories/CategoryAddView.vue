<script setup>
import { ref } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { submitCategory } from '@/services/categoryService';
import { useCategoryStore } from '@/stores/category';

const name = ref('');
const nameError = ref('');

defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false
  }
});

const emit = defineEmits(['closed']);
const closeDialog = (() => {
  resetForm();
  emit('closed');
});

const categoryStore = useCategoryStore();

const submitData = (async () => {
  try {
    resetForm();
    await submitCategory(name.value);
    // reload categories
    categoryStore.load();
    closeDialog();
  } catch (error) {
    if (error.response && error.response.status === 422) {
      nameError.value = error.response.data.errors.name[0];
    }
  }
});

const resetForm = (() => {
  nameError.value = '';
});

</script>

<template>
  <AppModal :show="show" @closed="closeDialog">
    <!-- <template #title>
      <h1>Add Category</h1>
    </template> -->
    <template #content>
      <form @submit.prevent="submitData">
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base/7 font-semibold text-gray-900">Add Category</h2>
            <p class="mt-1 text-sm/6 text-gray-600">Add an inventory category to the system.</p>

            <div class="mt-3 col-span-full">
              <label for="name" class="block text-sm/6 font-medium text-gray-900">Name *</label>
              <div class="mt-2">
                <input type="text" 
                id="name" 
                v-model="name"
                  class="block w-full w-100 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                <p v-if="nameError" class="text-sm text-red-500">{{ nameError }}</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <button type="submit"
        class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Submit</button>
      <button type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        @click="closeDialog" 
        ref="cancelButtonRef">Cancel</button>
    </template>
  </AppModal>
</template>