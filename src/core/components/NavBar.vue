<script setup lang="ts">
import { NavBarModel } from '@/core/models/navbar.model'
import { useCartStore } from '@/core/store/cart';
const cartItems = useCartStore().items;
const routes: Readonly<NavBarModel[]> = [
  new NavBarModel('/admin/productList', 'Product List'),
  new NavBarModel('/admin/productForm', 'Product Form'),
  new NavBarModel('/admin/cart', 'Cart'),
  new NavBarModel('/admin/login', 'Login')
]
</script>

<template>
  <nav
    class="fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
  >
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Web App</span
        >
      </a>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md: dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li v-for="route of routes" :key="route.name">
            <RouterLink
              class="block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 hover:md:text-blue-700"
              :to="route.path"
              v-slot="{ isActive }"
              :data-testid="'mainNav-' + route.path.split('/').pop()"
              >
              <NavLink data-test="navCart" v-if="route.name=='Cart'" data-nav="nav" :class="{ 'text-blue-500': isActive }">
                 {{ route.name }} ({{ cartItems.length }})
              </NavLink>
              <NavLink data-test="navProductList" v-else-if="route.name=='Product List'" data-nav="nav" :class="{ 'text-blue-500': isActive }">
                 {{ route.name }}
              </NavLink>
              <NavLink :id="'nav_' + route.path" v-else data-nav="nav" :class="{ 'text-blue-500': isActive }">
              {{
                route.name
              }}
              </NavLink>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
