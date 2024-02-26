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

function sortEnglish(a: { meaning: string }, b: { meaning: string }) {
  return a.meaning > b.meaning
}

function sortLevel(a: { level: string }, b: { level: string }) {
  return a.level > b.level
}

async function search(word: string) {
  const url_word = url_vocab + '?word=' + word
  console.log(url_word)
  _vocab = res(url_word)

  const response = await fetch(url_word)
  const json = await response.json()
  _vocab = json.sort(sortFurigana)
}

async function searchLevel(level: string) {
  const url_level = url_vocab + '/all?level=' + level
  console.log(url_level)
  const response = await fetch(url_level)
  const json = await response.json()
  _vocab = json.sort(sortFurigana)
  console.log('vocab : ')
  console.log(_vocab)
  return _vocab
}

async function allVocabulary() {
  //jlpt-vocab-api.vercel.app/api/words/all
  const url_level = url_vocab + '/all'
  console.log(url_level)
  const response = await fetch(url_level)
  const json = await response.json()
  _vocab = json.sort(sortFurigana)
  _vocab.shift()
  console.log('vocab : ')
  console.log(_vocab)
  return _vocab.filter((val: { meaning: string; furigana: string }) => {
    return val.meaning !== '' && !val.furigana.includes('（') && !val.meaning.includes('#NAME?')
  })
}

async function searchRandom() {
  const url_random = url_vocab + '/random'
  console.log(url_random)

  const response = await fetch(url_random)
  const json = await response.json()
  _vocab = json.sort(sortFurigana)
}

async function res(url: string) {
  const response = await fetch(url)
  const json = await response.json()
  console.log(json)
  return json
}

//await searchLevel(Number(Data.lvl))
const listVoc = await allVocabulary()
export {
  search,
  searchLevel,
  searchRandom,
  _vocab,
  allVocabulary,
  listVoc,
  sortFurigana,
  sortLevel,
  sortEnglish
}
