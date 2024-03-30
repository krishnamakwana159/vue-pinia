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
  <tr>
    <td>{{ product.name }}</td>
    <td>{{ product.price }}</td>
    <td>{{ product.category }}</td>
    <td><button @click="handleEditClick">Edit</button></td>
    <td><button @click="handleDeleteClick">Delete</button></td>
  </tr>
</template>
