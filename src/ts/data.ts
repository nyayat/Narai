import * as JVocab from '@/ts/JlptVocab'
let lvl = 0

function slashParameters() {
  const page = window.location.pathname
  console.log('page')
  console.log(page.split('/').slice(1))
  console.log('---page---')
  return page.split('/').slice(1)
}

async function changePage() {
  const page_param = slashParameters()
  if (page_param[0] == '') console.log('vide')
  else if (page_param[0] == 'level') {
    lvl = Number(page_param[1][1])
  } else if (page_param[0] == 'word') console.log('word')
  else lvl = 0
}

async function redirectPage(menu: string, option: string, numPage: number) {
  const page = window.location.origin
  console.log('numpage: ' + numPage)
  console.log(page + '/' + menu + '/' + option + '/' + numPage)
  //location.replace(page + '/' + menu + '/' + option)
  const stateObj = { foo: 'bar' }
  history.pushState(stateObj, '', page + '/' + menu + '/' + option + '/' + numPage)
  changePage()
}

export { redirectPage, slashParameters, lvl, changePage }

/*
https://jlpt-vocab-api.vercel.app/, https://github.com/mistval/unofficial-jisho-api
*/
