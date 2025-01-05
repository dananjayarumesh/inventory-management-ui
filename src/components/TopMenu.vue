<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/vue'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const mobileMenuOpen = ref(false)
const routeName = route.name;

const logout = async () => {
  auth.logout();
  router.push({ path: '/login' });
}
</script>

<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <!-- <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" /> -->
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <router-link :to="{ name: 'inventory' }"
          class="py-2.5 px-2 rounded-md text-sm/6 font-semibold text-gray-900"
          :class="{ 'bg-blue-700 text-white': routeName === 'inventory' }">
          Inventory
        </router-link>
        <router-link :to="{ name: 'dispatch-notes' }" 
        class="py-2.5 px-2 rounded-md text-sm/6 font-semibold text-gray-900"
        :class="{ 'bg-blue-700 text-white': routeName === 'dispatch-notes' }">
          Dispatch Notes
        </router-link>
        <router-link :to="{ name: 'receive-notes' }" 
        class="py-2.5 px-2 rounded-md text-sm/6 font-semibold text-gray-900"
        :class="{ 'bg-blue-700 text-white': routeName === 'receive-notes' }">
          Receive Notes
        </router-link>
        <router-link :to="{ name: 'categories' }" 
        class="py-2.5 px-2 rounded-md text-sm/6 font-semibold text-gray-900"
        :class="{ 'bg-blue-700 text-white': routeName === 'categories' }">
          Categories
        </router-link>
        <router-link :to="{ name: 'users' }" 
        class="py-2.5 px-2 rounded-md text-sm/6 font-semibold text-gray-900"
        :class="{ 'bg-blue-700 text-white': routeName === 'users' }">
          Users
        </router-link>
      </PopoverGroup>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" class="text-sm/6 font-semibold text-gray-900" @click="logout">Log Out</a>
      </div>
    </nav>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt="" />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <router-link :to="{ name: 'inventory' }"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                Inventory
              </router-link>
              <router-link :to="{ name: 'dispatch-notes' }"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                Dispatch Notes
              </router-link>
              <router-link to="/"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                Receive Notes
              </router-link>
              <router-link to="/"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                Categories
              </router-link>
              <router-link to="/"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                Users
              </router-link>
            </div>
            <div class="py-6">
              <a href="#"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                @click="logout">Log
                Out</a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>
