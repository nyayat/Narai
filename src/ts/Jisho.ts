import JishoAPI from 'unofficial-jisho-api'

const jisho = new JishoAPI()

/* const proxy = 'https://corsproxy.io/?' */
const proxy = 'https://cors-proxy.htmldriven.com/?url='
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
  /* return json.data[0].slug */
}

async function searchKanji(kanji: string) {
  const url = proxy + encodeURIComponent(jisho.getUriForKanjiSearch(kanji))
  const response = await fetch(url)
  const json = jisho.parseKanjiPageHtml(await response.text(), kanji)
  console.log(json)
  return json
}

function removeLink(sentences) {
  console.log('sentences', sentences)
  const anchors = sentences.getElementsByTagName('a')
  for (let i = 0; i < anchors.length; i++) {
    sentences.getElementsByTagName('a')[i].removeAttribute('href')
  }
  return sentences
}

function replaceLink(sentences) {
  const regex = /<(\/?)a>/g
  let newStr = sentences.replace(regex, '<$1span>')

  newStr = newStr.replaceAll('<mark></mark>', '')
  return newStr
}

async function parseTagorin(url = '', id = '', id_jp = '', id_eng = '') {
  const reponse = await fetch(url)
  const html = await reponse.text()

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  /* console.log(doc) */
  const el_id = doc.getElementsByClassName(id)
  /* console.log(id)
      console.log(el_id) */
  const result = []
  for (let i = 0; i < el_id.length; i++) {
    const s_jp = removeLink(el_id[i].getElementsByClassName(id_jp)[0])
    const s_eng = removeLink(el_id[i].getElementsByClassName(id_eng)[0])
    console.log('s_jp.innerHtml', s_jp.innerHTML)
    console.log('s_eng', s_eng)

    console.log('REMOOOOOVE')

    result.push({ jp: replaceLink(s_jp.innerHTML), eng: replaceLink(s_eng.innerHTML) })
  }
  return result
}

async function searchExemple(word: string) {
  //https://tangorin.com/sentences?search=%E3%81%82%E3%81%82
  const tmp_url = 'https://tangorin.com/sentences?search=' + encodeURIComponent(word)
  return await parseTagorin(tmp_url, 'sentences', 's-jp', 's-en')

  /* const url = proxy + encodeURIComponent(jisho.getUriForExampleSearch(word))

  const response = await fetch(url)
  const json = jisho.parseExamplePageHtml(await response.text(), word)
  /*   console.log('json.results', json.results)
  console.log('on a parse example') * /
  return json.results */
}

export { jisho, search, searchKanji, searchExemple }
