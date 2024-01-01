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
  refreshToken: {
    type: Array,
    default: []
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema)
