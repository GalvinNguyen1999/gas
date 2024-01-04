'use strict'
const express = require('express')
const route = express.Router()
const AccessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../auth/checkAuth')

route.post('/shop/signup', asyncHandler(AccessController.signup))

module.exports = route
