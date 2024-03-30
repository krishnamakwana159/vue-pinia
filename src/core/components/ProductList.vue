<script setup lang="ts">
import Product from '@/core/components/Product.vue'
import { useProductStore } from '@/core/store/product'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()

const { productList } = storeToRefs(productStore)
</script>

<template>
  <h2>Product List</h2>

  <table v-if="productList.length > 0">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Category</th>
        <th colspan="2">Actions</th>
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

  <p v-else>Add Product to see the Product List</p>
</template>
