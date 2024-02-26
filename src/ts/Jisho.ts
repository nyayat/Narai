import JishoAPI from 'unofficial-jisho-api'

const jisho = new JishoAPI()

const proxy = 'https://cors-anywhere.herokuapp.com/'

async function search(word: string) {
  const url = proxy + jisho.getUriForPhraseSearch(word)
  const response = await fetch(url)
  const json = await response.json()
  console.log(json)
  return json
}

async function searchKanji(kanji: string) {
  const url = proxy + jisho.getUriForKanjiSearch(kanji)
  const response = await fetch(url)
  const json = jisho.parseKanjiPageHtml(await response.text(), kanji)
  console.log(json)
  return json
}

async function searchExemple(word: string) {
  const url = proxy + jisho.getUriForExampleSearch(word)
  const response = await fetch(url)
  const json = jisho.parseExamplePageHtml(await response.text(), word)
  console.log(json.results)
  return json.results
}

export { jisho, search, searchKanji, searchExemple }
