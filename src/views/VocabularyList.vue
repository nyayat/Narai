<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import * as _tangorin from '@/ts/TangorinAPI'

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
  mounted() {
    let tmp = localStorage.getItem('itemShowed')
    if (tmp) this.itemShowed = JSON.parse(tmp)
  },
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
      localStorage.setItem('itemShowed', JSON.stringify(val))
      let tmp = await _tangorin.searchExemple(val.word)
      const __max = Math.min(tmp.length, 5)
      for (let i = 0; i < __max; i++) {
        const __parser = new DOMParser()
        const __jp_tmp = tmp[i].jp
        const __eng_tmp = tmp[i].eng
        /* const html_jp = _parser.parseFromString(_jp_tmp, 'text/html')
        const html_eng = _parser.parseFromString(_eng_tmp, 'text/html')
        console.log(html_jp) */
        this.sentences.push({
          jp: __jp_tmp,
          eng: __eng_tmp
        })
      }
    }
  }
}
</script>
