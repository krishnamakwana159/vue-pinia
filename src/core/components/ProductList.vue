<script setup lang="ts">
import Product from '@/core/components/Product.vue'
import { useProductStore } from '@/core/store/product'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()

const { productList } = storeToRefs(productStore)
</script>

<template>
  <div class="mt-16">
    <h2 class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-3xl">
      Product List
    </h2>

    <div class="relative overflow-x-auto">
      <table
        v-if="productList.length > 0"
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Category</th>
            <th scope="col" class="px-6 py-3" colspan="2">Actions</th>
          </tr>
        </thead>

        <tbody>
          <Product
            v-for="(product, index) of productList"
            :key="`${index}-${product.name}`"
            :product="product"
            :index="index"
          />
        </tbody>
      </table>

      <p v-else class="font-medium text-gray-900 dark:text-white">Add Product to see the Product List</p>
    </div>
  </div>
</template>
