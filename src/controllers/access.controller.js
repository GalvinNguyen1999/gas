'use strict'
const AccessService = require('../services/access.service')
const { OK, CREATED } = require('../core/success.message')

class AccessController {
  signup = async (req, res, next) => {
    new CREATED({
      message: 'Account created successfully',
      metadata: await AccessService.signup(req.body),
      options: { limit: 10 }
    })
    .send(res)
  }
}

module.exports = new AccessController()
