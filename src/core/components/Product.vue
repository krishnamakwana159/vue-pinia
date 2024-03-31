<script setup lang="ts">
import router from '@/router'
import { ProductModel } from '../models/product.model'
import { useProductStore } from '@/core/store/product'

const props = defineProps({
  product: {
    type: ProductModel,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const productStore = useProductStore()

const { deleteProduct } = productStore

const handleEditClick = () => {
  router.push({
    path: '/admin/productForm',
    query: {
      productId: props.index
    }
  })
}

const handleDeleteClick = () => {
  if (window.confirm('Are you sure want to delete?')) deleteProduct(props.index)
}
</script>

<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {{ product.name }}
    </td>
    <td class="px-6 py-4">{{ product.price }}</td>
    <td class="px-6 py-4">{{ product.category }}</td>
    <td class="px-6 py-4">
      <button
        @click="handleEditClick"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Edit
      </button>
    </td>
    <td class="px-6 py-4">
      <button
        @click="handleDeleteClick"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
