<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
const search = defineModel()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-light bg-light justify-content-between">
        <a><RouterLink to="/">Home</RouterLink></a>
        <a><RouterLink to="/about">About</RouterLink></a>
        <a><RouterLink to="/vocabulary/all/all/1">Vocabulary List</RouterLink></a>
        <a><RouterLink to="/Quiz">Quiz</RouterLink></a>
        <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            type="search"
            v-model="search"
            placeholder="Search a word..."
            aria-label="Search"
          />
          <RouterLink :to="'/vocabulary/search/' + search + '/1'"
            ><button
              @click="console.log(search)"
              class="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button></RouterLink
          >
        </form>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
