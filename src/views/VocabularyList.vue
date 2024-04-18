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
      console.log('tmp', tmp)

      const max = Math.min(tmp.length, 5)
      for (let i = 0; i < max; i++) {
        const parser = new DOMParser()
        const jp_tmp = tmp[i].jp
        const eng_tmp = tmp[i].eng
        const html_jp = parser.parseFromString(jp_tmp, 'text/html')
        const html_eng = parser.parseFromString(eng_tmp, 'text/html')
        console.log(html_jp)
        /* console.log(tmp[i].jp) */
        this.sentences.push({
          jp: jp_tmp,
          eng: eng_tmp
        })
      }
      console.log('updatesjpw', this.sentences)
    }
  }
}
</script>
