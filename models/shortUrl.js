const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortUrlSchema = new Schema({
  normalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  }
})

module.exports = shortUrlSchema