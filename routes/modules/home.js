const express = require('express')
const router = express.Router()
const ShortUrl = require('../../models/shortUrl')

const URL = 'https://lit-refuge-27029.herokuapp.com/' || 'http://localhost:3000/'

// index 
router.get('/', (req, res) => {
  res.render('index')
})

// short URL
router.post('/', (req, res) => {
  // get user's url
  const long = req.body.normalUrl
  // create short uel
  let short = generateShortUrl()
  // create data
  ShortUrl.create({
    normalUrl: long,
    shortUrl: short,
  })
  short = URL + short
  let message = `Success! Please use this link :`
  res.render('index', { long, short, message })
})

// response normal URL
router.get('/:shortUrl', (req, res) => {
  const short = req.params.shortUrl
  ShortUrl.findOne({ shortUrl: short })
    .lean()
    .then((shortUrl) => {
      if (!shortUrl) {
        return res.status(404).send(`Oops! the url is not found!`)
      } else {
        const normalUrl = shortUrl.normalUrl
        res.redirect(`${normalUrl}`)
      }
    })
    .catch(error => console.log(error))
})


// generate shortUrl function
function generateShortUrl() {
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

  // check short url is exist
  isExist(shortUrl)

  return `${shortUrl}`
}

// check short url is exist
function isExist(shortUrl) {
  let isExist = true
  ShortUrl.find({ shortUrl: shortUrl })
    .lean()
    .then((shortUrls) => {
      while (isExist) {
        if (shortUrls.length > 0) {
          isExist = true
          generateShortUrl()
        } else {
          isExist = false
          return
        }
      }
    })
}

module.exports = router