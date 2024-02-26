<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-light bg-light justify-content-between">
        <a><RouterLink to="/">Home</RouterLink></a>
        <a><RouterLink to="/about">About</RouterLink></a>
        <a><RouterLink to="/vocabulary/all/1">Vocabulary List</RouterLink></a>
        <a><RouterLink to="/vocabulary/all/1">Quiz</RouterLink></a>
        <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
