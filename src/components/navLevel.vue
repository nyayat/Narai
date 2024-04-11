<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="menu">
    <nav>
      <RouterView />
      <RouterLink to="/vocabulary/all/all/1">All</RouterLink>
      <RouterLink to="/vocabulary/N5/all/1">N5</RouterLink>
      <RouterLink to="/vocabulary/N4/all/1">N4</RouterLink>
      <RouterLink to="/vocabulary/N3/all/1">N3</RouterLink>
      <RouterLink to="/vocabulary/N2/all/1">N2</RouterLink>
      <RouterLink to="/vocabulary/N1/all/1">N1</RouterLink>

      <br />
      <br />
      <form>
        <input
          v-model="_search"
          @click="console.log('search', _search)"
          type="search"
          placeholder="Search a word..."
          aria-label="Search"
        /><RouterLink :to="'/vocabulary/search/' + _search + '/1'">
          <button @click="console.log('buttonsearch', _search)" type="submit">
            Search
          </button></RouterLink
        >
      </form>
    </nav>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      _search: ''
    }
  }
}
</script>
