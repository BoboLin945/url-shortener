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
  console.log(`${normalUrl}  -> ${shortUrl}`)
  res.redirect('/')
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
  return `https://url-shortener.herokuapp.com/${shortUrl}`
}

module.exports = router