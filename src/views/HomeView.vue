<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import navLevel from '../components/navLevel.vue'
</script>

<template>
  <div class="container_list">
    <div class="nav_level"><navLevel /></div>

    <article class="container">
      <!--style="display: flex; align-items: center"-->

      <div class="show_container" style="display: flex; align-items: center">
        <div class="center" style="padding: 20px">
          Use the vocabulary tab to review all the JLPT vocabulary. You'll find sample sentences to
          help you!
        </div>
      </div>
      <section class="details" style="display: flex; align-items: center">
        <!---->
        <div style="padding: 20px">
          Soon, in the quiz tab, you'll be able to practice vocabulary and its meanings.
        </div>
      </section>
    </article>
  </div>
</template>

<script lang="ts">
export default {
  init() {},
  data() {
    return {}
  },
  methods: {}
}
</script>
