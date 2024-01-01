'use strict'
const express = require('express')
const route = express.Router()
const AccessController = require('../../controllers/access.controller')

route.post('/shop/signup', AccessController.signup)

module.exports = route