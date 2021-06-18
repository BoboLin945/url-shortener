const { urlencoded } = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const PORT = 3000
const routes = require('./routes')

const app = express()

// mongoDB setting
require('./config/mongoose')

// view setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// body-parser
app.use(express.urlencoded({ extended: true }))

// static files
app.use(express.static('public'))

// routes setting
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on https://localhost/${PORT}`)
})