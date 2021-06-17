const express = require('express')
const router = express.Router()

// index 
router.get('/', (req, res) => {
  res.send('This will be a url shortener application!')
})

module.exports = router