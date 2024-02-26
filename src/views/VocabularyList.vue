<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import * as _jvocab from '@/ts/JlptVocab'
</script>

<template>
  <div class="menu">
    <nav>
      <RouterLink to="/vocabulary/all/1">All</RouterLink>
      <RouterLink to="/vocabulary/N5/1">N5</RouterLink>
      <RouterLink to="/vocabulary/N4/1">N4</RouterLink>
      <RouterLink to="/vocabulary/N3/1">N3</RouterLink>
      <RouterLink to="/vocabulary/N2/1">N2</RouterLink>
      <RouterLink to="/vocabulary/N1/1">N1</RouterLink>
    </nav>
  </div>
  <div>User {{ $route.params.level }}</div>

  <RouterView />
  <div :set="(_page = sortedData)">
    <div>
      <table class="vocabulary-list">
        <thead>
          <tr>
            <th>
              <RouterLink
                @click="doSort('level')"
                class="page"
                :to="'/vocabulary/' + $route.params.level + '/' + parseInt(this.$route.params.page)"
                >LEVEL <span v-if="sort.field == 'level'">({{ sort.desc ? 'desc' : 'asc' }})</span>
              </RouterLink>
            </th>
            <th>
              <RouterLink
                @click="doSort('furigana')"
                class="page"
                :to="'/vocabulary/' + $route.params.level + '/' + parseInt(this.$route.params.page)"
                >Japanese
                <span v-if="sort.field == 'furigana'">({{ sort.desc ? 'desc' : 'asc' }})</span>
              </RouterLink>
            </th>
            <th>
              <RouterLink
                @click="doSort('meaning')"
                class="page"
                :to="'/vocabulary/' + $route.params.level + '/' + parseInt(this.$route.params.page)"
                >Meaning
                <span v-if="sort.field == 'meaning'">({{ sort.desc ? 'desc' : 'asc' }})</span>
              </RouterLink>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginate(sortedData)" :key="item.id">
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
        :to="'/vocabulary/' + $route.params.level + '/1'"
        >«</RouterLink
      >

      <RouterLink
        @click="scrollToTop()"
        class="page"
        :to="
          '/vocabulary/' +
          $route.params.level +
          '/' +
          Math.max(parseInt(parseInt(this.$route.params.page) - 1), 1)
        "
        >‹</RouterLink
      >

      <span v-for="item in createRegisterArray()" :key="item">
        <RouterLink
          @click="scrollToTop()"
          class="page"
          :to="'/vocabulary/' + $route.params.level + '/' + parseInt(item)"
        >
          {{ item }}
        </RouterLink>
      </span>

      <RouterLink
        @click="scrollToTop()"
        class="page"
        :to="
          '/vocabulary/' +
          this.$route.params.level +
          '/' +
          Math.min(parseInt(parseInt(this.$route.params.page) + 1), _size)
        "
      >
        ›
      </RouterLink>
      <RouterLink
        @click="scrollToTop()"
        class="page"
        :to="'/vocabulary/' + $route.params.level + '/' + _size"
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
      search: '',
      pageSize: 20,
      sort: {
        field: '',
        desc: true
      },
      listVocab: _jvocab.listVoc
    }
  },
  mounted() {
    if (localStorage.sort) {
      const savedSort = JSON.parse(localStorage.getItem('sort'))
      console.log(savedSort)
      this.sort = savedSort
    }
  },
  watch: {
    sort: {
      handler: function (newSort) {
        // Save to local storage when sort object changes
        //localStorage.setItem('sort', JSON.stringify(newSort));
        console.log('------------------------NEWNAME----------------')
        localStorage.setItem('sort', JSON.stringify(newSort))
        //console.log(newSort.desc)
        //console.log(newSort.field)
      },
      deep: true // Watch nested properties inside sort object
    }
  },
  methods: {
    filteredListLvl: function (list: any[]) {
      if (this.$route.params.level == 'all') return list
      return list.filter((val) => {
        return val.level == this.$route.params.level[1]
      })
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
        console.log(this.$route.params.level)
        console.log(this.$route.params.level === undefined)
      }
    )
  }
}
</script>

<style></style>
