function removeLink(sentences: Element) {
  const anchors = sentences.getElementsByTagName('a')
  for (let i = 0; i < anchors.length; i++) {
    sentences.getElementsByTagName('a')[i].removeAttribute('href')
  }
  return sentences
}

function replaceLink(sentences: any) {
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

  const el_id = doc.getElementsByClassName(id)

  const result = []
  for (let i = 0; i < el_id.length; i++) {
    const s_jp = removeLink(el_id[i].getElementsByClassName(id_jp)[0])
    const s_eng = removeLink(el_id[i].getElementsByClassName(id_eng)[0])

    result.push({ jp: replaceLink(s_jp.innerHTML), eng: replaceLink(s_eng.innerHTML) })
  }
  return result
}

async function searchExemple(word: string) {
  const tmp_url = 'https://tangorin.com/sentences?search=' + encodeURIComponent(word)
  return await parseTagorin(tmp_url, 'sentences', 's-jp', 's-en')
}

export { searchExemple }
