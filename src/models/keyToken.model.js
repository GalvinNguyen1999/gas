'use strict'
const mongoose = require('mongoose')
const { Schema, model } = mongoose

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'keys'

const keyTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
    require: true
  },
  privateKey: {
    type: String,
    require: true
  },
  publicKey: {
    type: String,
    require: true
  },
  // token is used
  refreshTokenUsed: {
    type: Array,
    default: []
  },
  // token is use
  refreshToken: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema)
