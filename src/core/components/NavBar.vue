<script setup lang="ts">
import { NavBarModel } from '@/core/models/navbar.model'

const routes: Readonly<NavBarModel[]> = [
  new NavBarModel('/admin/productList', 'Product List'),
  new NavBarModel('/admin/productForm', 'Product Form')
]
</script>

<template>
  <ul>
    <li v-for="route of routes" :key="route.name">
      <RouterLink :to="route.path">{{ route.name }}</RouterLink>
    </li>
  </ul>
</template>
