const puppeteer = require('puppeteer')
const fs = require('fs')

let keyword = ''
let pages = 2
let cookie = ''

const auth = {
  name: 'li_at',
  value: '',
  url: 'https://www.linkedin.com/',
  domain: '.linkedin.com',
  path: '/',
  httpOnly: true,
  secure: true
}

const sleep = async (duration) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, duration)
  })
}

const crawl = async (auth = {}, keyword = '', page = 1) => {
  const browser = await puppeteer.launch()
  const tab = await browser.newPage()

  await tab.setCookie(auth)

  await tab.goto(`https://www.linkedin.com/search/results/people/?keywords=${keyword}&page=${page}`)

  await tab.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  })

  await sleep(1000)

  const data = await tab.evaluate(() => {
    const result = []
    const uls = document.querySelectorAll('.search-results__list .search-result__info')
    uls.forEach(data => {
      const link = data.querySelector('a').href
      const nama = data.querySelector('.actor-name').innerText
      const jabatan = data.querySelector('p').innerText
      result.push({
        nama,
        jabatan,
        link
      })
    })
    return result
  })

  if (!fs.existsSync('./screenshots/')){
    fs.mkdirSync('./screenshots/');
  }

  await tab.screenshot({
    path: `./screenshots/${keyword.toLowerCase().split(' ').join('-')}-page-${page}.png`,
    fullPage: true
  })

  await browser.close()

  return data
}

const run = async () => {
  const data = []

  for(let page = 1; page <= pages; page++) {
    console.log('CRAWL PAGE : ', page)
    try {
      const result = await crawl({ ...auth, value: cookie }, keyword, page)
      if (Array.isArray(result) && result.length > 0) {
        data.push(...result)
      }
    } catch (e) {
    }
  }
  const fileName = `hasil-${keyword.toLowerCase().split(' ').join('-')}-page-${pages}.json`
  fs.writeFile(fileName, JSON.stringify(data, null, 2),  function (err) {
    if (err) return console.log(err)
    console.log(`Exported to : ${fileName}`)
  })
}

const args = process.argv.slice(2)

args.forEach((arg, index) => {
  switch (index) {
    case 0: keyword = arg
      break
    case 1: pages = parseInt(arg)
    case 2: cookie = arg
  }
})

run()
