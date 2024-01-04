'use strict'
const shopModel = require('../models/shop.model')

const selectParams = {
  name: 1,
  email: 1,
  status: 1,
  roles: 1,
  password: 1
}

const findByEmail = async ({ email, select = selectParams }) => {
  return await shopModel.findOne({ email }).select(select).lean()
}

module.exports = {
  findByEmail
}
