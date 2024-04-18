<script setup lang="ts">
import * as _jvocab from '@/ts/JlptVocab'
</script>

<template>
  <header>
    <div class="">
      <RouterLink
        @click="doSort('level')"
        class="filter_button"
        id="level_button"
        :to="
          '/vocabulary/' +
          $route.params.opt +
          '/' +
          $route.params.word +
          '/' +
          parseInt($route.params.page)
        "
        >Level
        <span v-if="sort.field == 'level'">{{ sort.desc ? '⇣' : '⇡' }}</span>
      </RouterLink>

      <RouterLink
        @click="doSort('furigana')"
        class="filter_button"
        id="furigana_button"
        :to="
          '/vocabulary/' +
          $route.params.opt +
          '/' +
          $route.params.word +
          '/' +
          parseInt($route.params.page)
        "
        >Japanese
        <span v-if="sort.field == 'furigana'">{{ sort.desc ? '⇣' : '⇡' }}</span>
      </RouterLink>

      <RouterLink
        @click="doSort('meaning')"
        class="filter_button"
        id="meaning_button"
        :to="
          '/vocabulary/' +
          $route.params.opt +
          '/' +
          $route.params.word +
          '/' +
          parseInt($route.params.page)
        "
        >Meaning
        <span v-if="sort.field == 'meaning'">{{ sort.desc ? '⇣' : '⇡' }}</span>
      </RouterLink>
    </div>
  </header>
  <div class="scroll-container">
    <div :set="(_page = filteredListLvl(sortedData))">
      <div
        class="card"
        v-for="item in paginate(filteredListLvl(sortedData))"
        :key="item.id"
        @click="itemShowChange(item)"
      >
        <span class="level tag" id="level">N{{ item.level }}</span>
        <span class="word">
          {{ item.word }}
        </span>
        <div class="cut">{{ item.meaning }}</div>
      </div>
    </div>
  </div>
  <footer>
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
  </footer>
</template>

<style scoped></style>

<script lang="ts">
export default {
  props: ['itemShowed'],
  computed: {
    sortedData() {
      if (!this.sort.field) {
        return this.listVocab
      }

      if (this.sort.field == 'level') {
        return this.listVocab.concat().sort((a, b) => {
          if (this.sort.desc) {
            return a[this.sort.field] > b[this.sort.field] ? -1 : 1
          } else {
            return a[this.sort.field] > b[this.sort.field] ? 1 : -1
          }
        })
      }

      if (this.sort.field == 'furigana') {
        if (this.sort.desc) {
          return this.listVocab.concat().sort(_jvocab.sortFuriganaDesc)
        } else {
          return this.listVocab.concat().sort(_jvocab.sortFurigana)
        }
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
      listVocab: _jvocab.listVoc,
      itemShowed: { word: '', meaning: '', furigana: '', level: '' }
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
    itemShowChange(item) {
      //{ word: '', meaning: '', furigana: '', level: '' }}
      this.itemShowed.word = item.word
      this.itemShowed.meaning = item.meaning
      this.itemShowed.furigana = item.furigana
      this.itemShowed.level = 'N' + item.level

      let lvl = document.getElementById('lvl')
      lvl.style['background-color'] = '#d8315b'
      lvl.style['border-right'] = '5px solid #381b34'
      lvl.style['border-bottom'] = '5px solid #381b34'
      lvl.style['height'] = '45px'
      lvl.style['width'] = '45px'

      this.$emit('itemShowedChanged', this.itemShowed)
    },

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
      let filter_button = document.getElementsByClassName('filter_button')

      for (let i = 0; i < filter_button.length; i++) {
        filter_button[i].style['color'] = '#573953'
      }
      const button = field + '_button'
      document.getElementById(button).style['color'] = '#d8315b'

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

  mounted() {
    if (sessionStorage.sort) {
      const savedSort = JSON.parse(sessionStorage.getItem('sort'))
      this.sort = savedSort
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {}
    )
  }
}
</script>
