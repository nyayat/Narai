<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import * as _jvocab from '@/ts/JlptVocab'

import navLevel from '../components/navLevel.vue'
</script>

<template>
  <div>User {{ $route.params.opt }}</div>
  <navLevel />
  <RouterView />
  <div :set="(_page = filteredListLvl(sortedData))">
    <div>
      <table class="vocabulary-list">
        <thead>
          <tr>
            <th>
              <RouterLink
                @click="doSort('level')"
                class="page"
                :to="
                  '/vocabulary/' +
                  $route.params.opt +
                  '/' +
                  $route.params.word +
                  '/' +
                  parseInt(this.$route.params.page)
                "
                >LEVEL <span v-if="sort.field == 'level'">({{ sort.desc ? 'desc' : 'asc' }})</span>
              </RouterLink>
            </th>
            <th>
              <RouterLink
                @click="doSort('furigana')"
                class="page"
                :to="
                  '/vocabulary/' +
                  $route.params.opt +
                  '/' +
                  $route.params.word +
                  '/' +
                  parseInt(this.$route.params.page)
                "
                >Japanese
                <span v-if="sort.field == 'furigana'">({{ sort.desc ? 'desc' : 'asc' }})</span>
              </RouterLink>
            </th>
            <th>
              <RouterLink
                @click="doSort('meaning')"
                class="page"
                :to="
                  '/vocabulary/' +
                  $route.params.opt +
                  '/' +
                  $route.params.word +
                  '/' +
                  parseInt(this.$route.params.page)
                "
                >Meaning
                <span v-if="sort.field == 'meaning'">({{ sort.desc ? 'desc' : 'asc' }})</span>
              </RouterLink>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginate(filteredListLvl(sortedData))" :key="item.id">
            <td class="level" id="level">N{{ item.level }}</td>
            <td>
              <!-- <div class="vocabulary-furigana"></div> -->
              <ruby
                >{{ item.word }} <rt>{{ item.furigana }}</rt></ruby
              >
            </td>
            <td>{{ item.meaning }}</td>
            <!-- <div class="vocabulary-voc"></div> -->
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination" :set="(_size = Math.ceil(_page.length / pageSize))">
      <RouterLink
        @click="scrollToTop()"
        class="page"
        :to="'/vocabulary/' + $route.params.opt + '/all/1'"
        >«</RouterLink
      >

      <RouterLink
        @click="scrollToTop()"
        class="page"
        :to="
          '/vocabulary/' +
          $route.params.opt +
          '/' +
          Math.max(parseInt(parseInt(this.$route.params.page) - 1), 1)
        "
        >‹</RouterLink
      >

      <span v-for="item in createRegisterArray()" :key="item">
        <RouterLink
          @click="scrollToTop()"
          class="page"
          :to="'/vocabulary/' + $route.params.opt + '/' + $route.params.word + '/' + parseInt(item)"
        >
          {{ item }}
        </RouterLink>
      </span>

      <RouterLink
        @click="scrollToTop()"
        class="page"
        :to="
          '/vocabulary/' +
          this.$route.params.opt +
          '/' +
          Math.min(parseInt(parseInt(this.$route.params.page) + 1), _size)
        "
      >
        ›
      </RouterLink>
      <RouterLink
        @click="scrollToTop()"
        class="page"
        :to="'/vocabulary/' + $route.params.opt + '/' + $route.params.word + '/' + _size"
      >
        »
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  init() {},
  computed: {
    sortedData() {
      if (!this.sort.field) {
        return this.listVocab
      }

      if (this.sort.field == 'level')
        return this.listVocab.concat().sort((a, b) => {
          if (this.sort.desc) {
            return a[this.sort.field] > b[this.sort.field] ? -1 : 1
          } else {
            return a[this.sort.field] > b[this.sort.field] ? 1 : -1
          }
        })

      if (this.sort.field == 'furigana') {
        return this.listVocab.concat().sort(_jvocab.sortFurigana)
      }

      return this.listVocab.concat().sort((a, b) => {
        if (this.sort.desc) {
          return this.cleanField(a[this.sort.field]) > this.cleanField(b[this.sort.field]) ? -1 : 1
        } else {
          return this.cleanField(a[this.sort.field]) > this.cleanField(b[this.sort.field]) ? 1 : -1
        }
      })
    }
  },
  data() {
    return {
      pageSize: 20,
      sort: {
        field: '',
        desc: true
      },
      listVocab: _jvocab.listVoc
    }
  },
  mounted() {
    if (sessionStorage.sort) {
      const savedSort = JSON.parse(sessionStorage.getItem('sort'))
      console.log(savedSort)
      this.sort = savedSort
    }
  },
  watch: {
    sort: {
      handler: function (newSort) {
        sessionStorage.setItem('sort', JSON.stringify(newSort))
      },
      deep: true // Watch nested properties inside sort object
    }
  },
  methods: {
    filteredListLvl: function (list: any[]) {
      if (this.$route.params.opt == 'all') return list
      if (this.$route.params.opt == 'search') return this.filteredList(list)
      return list.filter((val) => {
        return val.level == this.$route.params.opt[1]
      })
    },
    filteredList: function (list: any[]) {
      const opt = this.$route.params.word
      return list.filter(
        (val: { romaji: string; furigana: string; word: string; meaning: string }) => {
          return (
            val.romaji.includes(opt) ||
            val.furigana.includes(opt) ||
            val.word.includes(opt) ||
            val.meaning.includes(opt)
          )
        }
      )
    },
    cleanField(field: String) {
      return field
        .toLowerCase()
        .replace('an ', '')
        .replace('a ', '')
        .replace('to ', '')
        .replace(/[-]/g, '')
        .replace(/[,]/g, '')
        .replace(/[, ]/g, '')
        .replace(/[\d+\^*]/g, '')
        .replace(/[\d]/g, '')
        .replace(/[;]/g, '')
        .replace(/[~]/g, '')
        .replace(/[.]/g, '')
        .replace(/^\d+\s+/g, '')
        .replace(/ *\([^)]*\) */g, '')
    },
    paginate: function (list: string | any[]) {
      return list.slice(
        (parseInt(this.$route.params.page) - 1) * this.pageSize,
        parseInt(this.$route.params.page) * this.pageSize
      )
    },
    sizeListFiltered: function () {
      return Math.ceil(this.filteredListLvl(this.listVocab).length / this.pageSize)
    },
    doSort(field: string) {
      console.log('dosort :')
      console.log(field)
      console.log(this.sort.field)
      if (field == this.sort.field) {
        this.sort.desc = !this.sort.desc
      } else {
        this.sort.field = field
        this.sort.desc = true
      }
    },

    createRegisterArray: function () {
      let size = this.sizeListFiltered()
      let registerArray = []
      //      let lastIndex = size
      const maxLength = 5

      let firstRegNr = parseInt(this.$route.params.page)
      let lastRegNr = firstRegNr + maxLength

      if (lastRegNr > size) {
        lastRegNr = size + 1
      }

      let diff = lastRegNr - firstRegNr

      if (diff < maxLength) {
        firstRegNr = lastRegNr - maxLength
        if (firstRegNr < 1) {
          firstRegNr = 1
        }
      }

      for (let i = firstRegNr; i < lastRegNr; i++) {
        registerArray.push(i) //store register number (starts with 1);
      }

      return registerArray
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        console.log('toParams: ' + toParams)
        console.log(toParams)
        console.log('previousParams: ' + previousParams)
        console.log(previousParams)
        console.log(this.$route.params.opt)
        console.log(this.$route.params.opt === undefined)
      }
    )
  }
}
</script>

<style></style>
