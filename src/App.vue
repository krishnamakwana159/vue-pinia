<script setup lang="ts">
import NavBar from '@/core/components/NavBar.vue'
</script>

<template>
  <nav>
    <NavBar></NavBar>
  </nav>
  <br>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
