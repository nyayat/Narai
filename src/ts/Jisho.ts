import JishoAPI from 'unofficial-jisho-api'

const jisho = new JishoAPI()

const proxy = 'https://corsproxy.io/?'
console.log('JISHOOOOO', jisho)

/* 'https://cors-anywhere.herokuapp.com/' */

async function search(word: string) {
  const url = proxy + encodeURIComponent(jisho.getUriForPhraseSearch(word))
  const response = await fetch(url)
  const json = await response.json()
  console.log('LAAAAAAAA')
  console.log(json.data)
  console.log(json.data[0])
  console.log(json.data[0].slug)
  return json.data[0].slug
}

async function searchKanji(kanji: string) {
  const url = proxy + encodeURIComponent(jisho.getUriForKanjiSearch(kanji))
  const response = await fetch(url)
  const json = jisho.parseKanjiPageHtml(await response.text(), kanji)
  console.log(json)
  return json
}

async function searchExemple(word: string) {
  const url = proxy + encodeURIComponent(jisho.getUriForExampleSearch(word))

  const response = await fetch(url)
  const json = jisho.parseExamplePageHtml(await response.text(), word)
  /*   console.log('json.results', json.results)
  console.log('on a parse example') */
  return json.results
}

export { jisho, search, searchKanji, searchExemple }
