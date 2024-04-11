<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import navBar from '@/components/navBar.vue'
import HelloWorld from './components/HelloWorld.vue'

const search = defineModel()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="nav_level menu">
        <navBar></navBar>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
