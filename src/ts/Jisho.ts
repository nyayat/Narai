import JishoAPI from 'unofficial-jisho-api'

const jisho = new JishoAPI({ proxy: 'https://cors-anywhere.herokuapp.com/' })

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
  /* console.log('on search')
  /* const url = jisho.getUriForExampleSearch(word)
  console.log('on va await') 
  const response = await fetch(url)
  console.log('on a get uri')
  const json = jisho.parseExamplePageHtml(await response.text(), word)
  console.log(json.results)
  console.log('on a parse example')
  return json.results */

  return await jisho.searchForExamples(word).then((result) => {
    console.log('result')
    console.log(result)
    return result.results
  })
}

export { jisho, search, searchKanji, searchExemple }
