<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import * as _jisho from '@/ts/Jisho'

import navLevel from '../components/navLevel.vue'
import itemShow from '../components/itemShow.vue'
import scrollVoc from '../components/scrollListVoc.vue'
</script>

<template>
  <div class="container_list">
    <div class="nav_level"><navLevel /></div>

    <article class="container">
      <!---->
      <itemShow :itemShowed="itemShowed" :sentences="sentences" />
      <section class="details">
        <!---->

        <scrollVoc @itemShowedChanged="updateShow" />
      </section>
    </article>
  </div>
</template>

<script lang="ts">
export default {
  init() {},
  data() {
    return {
      itemShowed: { word: '', meaning: '', furigana: '', level: '' },
      sentences: []
    }
  },
  methods: {
    async updateShow(val: any) {
      this.sentences = []
      this.itemShowed = val
      console.log('val', val.word)
      let tmp = await _jisho.searchExemple(val.word)

      const max = Math.min(tmp.length, 5)
      for (let i = 0; i < max; i++) {
        console.log(tmp[i])
        this.sentences.push({
          english: tmp[i].english,
          kanji: tmp[i].kanji,
          kana: tmp[i].kana,
          pieces: tmp[i].pieces
        })
      }
      console.log('updatesjpw', this.sentences)
    }
  }
}
</script>
