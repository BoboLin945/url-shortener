const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://localhost/url-shortener'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// connecting error
db.on('error', () => {
  console.log('mongodb error...')
})
// connecting success
db.once('open', () => {
  console.log('mongodb connected...')
})

module.exports = db