const express = require('express')
const compression = require('compression')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()

// initialize middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// initialize db
require('./db/init.mongodb')

// initialize routes
app.get('/', (req, res) => {
  return res.send({ message: 'Hello world' })
})

// initialize error handlers

module.exports = app
