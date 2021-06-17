const express = require('express')
const router = express.Router()
const ShortUrl = require('../../models/shortUrl')

// index 
router.get('/', (req, res) => {
  res.render('index')
})

// short URL
router.post('/', (req, res) => {
  const normalUrl = req.body.normalUrl
  const shortUrl = generateShortUrl(normalUrl)
  ShortUrl.create({
    normalUrl: normalUrl,
    shortUrl: shortUrl
  })
  res.redirect('/')
})

// response normal URL
router.get('/:shortUrl', (req, res) => {
  console.log(req.params.shortUrl)
  ShortUrl.findOne({ shortUrl: req.params.shortUrl })
    .lean()
    .then((shortUrl) => {
      if (!shortUrl) {
        return res.status(404).send(`Oops! the url is not found!`)
      } else {
        const normalURl = shortUrl.normalUrl
        res.send(`this will be a normal url site, the normal site is ${normalURl}`)
      }
    })
})




// generate shortUrl function
function generateShortUrl(url) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const UpperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '0123456789'

  // create a collection to store random 5 characters
  let collection = []
  collection = collection.concat(lowerCaseLetters.split('')).concat(UpperCaseLetters.split('')).concat(numbers.split(''))

  let shortUrl = ''
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * collection.length)
    shortUrl += collection[index]
  }
  return `${shortUrl}`
}

module.exports = router