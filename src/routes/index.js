'use strict'
const express = require('express')
const { apiKey, permission } = require('../auth/checkAuth')

const router = express.Router()

// check API Key
router.use(apiKey)
// check permission
router.use(permission('0000'))
// v1
router.use('/v1/api/', require('./access'))

module.exports = router
