const express = require('express')
const compression = require('compression')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()
const route = require('./routes')

// initialize middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// initialize db
require('./db/init.mongodb')

// initialize routes
app.use('/', route)

// initialize error handlers

module.exports = app
