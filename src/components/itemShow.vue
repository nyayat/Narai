<script setup lang="ts">
import * as _tangorin from '@/ts/TangorinAPI'
</script>

<template>
  <div class="show_container">
    <div id="lvl" class="item lvl">{{ itemShowed.level }}</div>
    <section class="content_div">
      <h2>
        <ruby>
          {{ itemShowed.word }}
          <rt>{{ itemShowed.furigana }}</rt>
        </ruby>
      </h2>
      <div class="vocabulary_show">
        <div class="meaning">
          <div class="card">{{ itemShowed.meaning }}</div>
        </div>
        <div class="sentences">
          <!-- class="scroll-container" -->
          <details v-for="item in sentences" :key="item" class="card">
            <!-- -->
            <summary>exemple</summary>
            <br />
            <div v-html="item.jp"></div>
            <br />
            <div v-html="item.eng"></div>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>

<script lang="ts">
export default {
  props: ['itemShowed', 'sentences'],
  data() {
    return {}
  },
  watch: {
    itemShowed: async function (newVal, oldVal) {
      console.log('changement')
    }
  }
}
</script>
