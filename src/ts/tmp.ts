let listItems

function slashParameters() {
  const page = window.location.pathname
  console.log('page')
  console.log(page.split('/').slice(1))
  console.log('---page---')
  return page.split('/').slice(1)
}

function constUrl(menu: string[]) {
  let url = 'https://genshin.jmp.blue'
  for (const el in menu) {
    url += '/' + el
  }
  return url
}

async function getData() {
  const menu = slashParameters()
  const url = constUrl(menu)
  console.log('----hey----')
  console.log('https://genshin.jmp.blue' + window.location.pathname)
  const res = await fetch('https://genshin.jmp.blue' + window.location.pathname)
  const finalRes = await res.json()

  listItems = finalRes
  console.log('----here----')
  console.log(listItems)
  console.log('------------')
}

function redirectPage(option: string) {
  const page = document.URL
  console.log(page + option)
  location.replace(page + '/' + option)
}

await getData()
export { getData, listItems, redirectPage }

/*
https://jlpt-vocab-api.vercel.app/, https://github.com/mistval/unofficial-jisho-api 
*/
