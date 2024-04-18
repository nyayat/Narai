<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import navBar from '@/components/navBar.vue'
import footerComp from '@/components/footerComp.vue'

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

  <footerComp />
</template>

<style scoped></style>
