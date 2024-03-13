const url_vocab = 'https://jlpt-vocab-api.vercel.app/api/words'

let _vocab
function sortFurigana(
  a: { furigana: string; word: string },
  b: { furigana: string; word: string }
) {
  const a_tmp = a.furigana == '' ? a.word : a.furigana
  const b_tmp = b.furigana == '' ? b.word : b.furigana
  return a_tmp > b_tmp
}

/* 
function sortEnglish(a: { meaning: string }, b: { meaning: string }) {
  return a.meaning > b.meaning
}

function sortLevel(a: { level: string }, b: { level: string }) {
  return a.level > b.level
} */

function clean() {
  console.log('cleaaaaaan')
  const kana = /[\u30a0-\u30ff\u3040-\u309f]/g
  const kanji = /[\u4E00-\u9FAF]/g
  return _vocab
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
  _vocab = json.sort(sortFurigana)
  _vocab.shift()
  _vocab = clean()
  return _vocab
}

async function searchRandom() {
  const url_random = url_vocab + '/random'
  console.log(url_random)

  const response = await fetch(url_random)
  const json = await response.json()
  //_vocab = json.sort(sortFurigana)
}

//await searchLevel(Number(Data.lvl))
const listVoc = await allVocabulary()
console.log(listVoc.length)
console.log("c'était la taille")
export { searchRandom, _vocab, allVocabulary, listVoc, sortFurigana }
