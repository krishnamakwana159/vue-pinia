<script setup lang="ts">
import NavBar from '@/core/components/NavBar.vue'
</script>

<template>
  <nav>
    <NavBar></NavBar>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
