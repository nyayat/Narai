const url_vocab = 'https://jlpt-vocab-api.vercel.app/api/words'
import * as _tangorin from './TangorinAPI.js'

let vocab: any[]
function sortFurigana(
  a: { furigana: string; word: string },
  b: { furigana: string; word: string }
) {
  const a_tmp = a.furigana == '' ? a.word : a.furigana
  const b_tmp = b.furigana == '' ? b.word : b.furigana
  return a_tmp > b_tmp
}

function sortFuriganaDesc(
  a: { furigana: string; word: string },
  b: { furigana: string; word: string }
) {
  const a_tmp = a.furigana == '' ? a.word : a.furigana
  const b_tmp = b.furigana == '' ? b.word : b.furigana
  return a_tmp < b_tmp
}

function clean() {
  console.log('cleaaaaaan')
  const kana = /[\u30a0-\u30ff\u3040-\u309f]/g
  const kanji = /[\u4E00-\u9FAF]/g
  return vocab
    .filter((val: { word: string }) => {
      const tmp = val.word.replace(kana, '').replace(kanji, '')
      return tmp.length == 0
    })
    .filter((val: { meaning: string; furigana: string }) => {
      return val.meaning !== '' && !val.furigana.includes('（') && !val.meaning.includes('#NAME?')
    })
}

async function allVocabulary() {
  //jlpt-vocab-api.vercel.app/api/words/all
  const url_level = url_vocab + '/all'
  console.log(url_level)
  const response = await fetch(url_level)
  const json = await response.json()
  vocab = json.sort(sortFurigana)
  vocab.shift()
  vocab = clean()

  return vocab
}

const listVoc = await allVocabulary()
export { listVoc, sortFurigana, sortFuriganaDesc }
