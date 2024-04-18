<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import * as _tangorin from '@/ts/JlptVocab'
import * as _jisho from '@/ts/TangorinAPI'

import { ref } from 'vue'
</script>

<template>
  <div class="container_list">
    <div class="nav_level">
      <div style="color: white">User {{ $route.params.opt }}</div>
    </div>

    <article class="container">
      <!---->
      <div class="show_container">
        <div>{{ count }} / {{ quiz.nb_question }}<br /><br /></div>
        <section class="content_div">
          <h2>
            <div>Question : {{ quiz.questions[count] }}<br /><br /></div>
          </h2>
          <div class="quiz_show">
            <div class="meaning">a</div>
            <div class="sentences">
              <!-- class="scroll-container" -->
            </div>
          </div>
        </section>
      </div>
      <!---->

      <section class="details">
        <!---->

        <div>Answer:{{ quiz.answers[count] }}<br /><br /></div>
        <div>Answer:{{ quiz.sentences[count] }}<br /><br /></div>
        <button @click="changeQuestion(false)" v-on:click="count = Math.max(0, count - 1)">
          Arrière
        </button>
        <button
          @click="changeQuestion(false)"
          v-on:click="count = Math.min(quiz.nb_question, count + 1)"
        >
          Avant
        </button>
      </section>
    </article>
  </div>
</template>

<script lang="ts">
export default {
  init() {},
  data() {
    return {
      quiz: {
        nb_question: 20,
        current_question: 0,
        wrong_answers: [],
        right_answers: [],
        questions: [],
        answers: [],
        sentences: [],
        opt: ['reading', 'meaning', 'cloze'],
        level: 'N5'
      },
      count: ref(0),

      listVocab: _tangorin.listVoc
    }
  },
  mounted() {
    /* if (sessionStorage.quiz) {
      const savedQuiz = JSON.parse(sessionStorage.getItem('quiz'))
      console.log(savedQuiz)
      this.quiz = savedQuiz
    } */
    this.selectQuestions()
  },
  methods: {
    filteredListLvl: function (list: any[]) {
      if (this.quiz.level == 'all') return list
      return list.filter((val) => {
        return val.level == this.quiz.level[1]
      })
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    selectQuestions: async function () {
      let shuffled = this.listVocab.sort(function () {
        return 0.5 - Math.random()
      })
      let tmp = shuffled.slice(0, this.quiz.nb_question)
      let qa = []
      console.log(this.quiz.questions)
      for (let i = 0; i < this.quiz.nb_question; i++) {
        qa[i] = this.selectQuestion(
          this.quiz.opt[Math.floor(Math.random() * this.quiz.opt.length)],
          tmp[i]
        )
        this.quiz.questions[i] = qa[i].question
        this.quiz.answers[i] = qa[i].answer
        this.quiz.sentences[i] = await _jisho.searchExemple(tmp[i].word)

        this.quiz.sentences[i] =
          this.quiz.sentences[i].length == 0 ? '' : this.quiz.sentences[i][0].kanji
        //this.quiz.opt[Math.floor(Math.random() * this.quiz.opt.length)]
      }
    },
    changeQuestion: function (avant = true) {
      this.quiz.current_question = avant
        ? Math.min(this.quiz.nb_question, this.quiz.current_question + 1)
        : Math.max(0, this.quiz.current_question - 1)
    },
    selectQuestion(type: string, word: any) {
      let res = []
      console.log('word:')
      console.log(word.word)
      const __word = word.word
      const __meaning = word.meaning
      const __reading = word.furigana.length == 0 ? __word : word.furigana
      /* question: "What is the reading of" */
      if (type == 'reading')
        res = { question: 'What is the reading of ' + __word, answer: __reading }
      if (type == 'meaning')
        res = { question: 'What is the meaning of ' + __word, answer: __meaning }
      if (type == 'cloze') res = { question: 'Complete ' + __word, answer: __reading }

      return res
    }
  }
}
</script>

<style></style>
