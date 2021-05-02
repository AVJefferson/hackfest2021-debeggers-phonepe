var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./src/routes/index'))
app.use('/users', require('./src/routes/users'))
app.use('/payments', require('./src/routes/payments'))
app.use('/coins', require('./src/routes/coins'))

module.exports = app
