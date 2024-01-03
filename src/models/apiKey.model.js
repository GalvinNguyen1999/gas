'use strict'
const mongoose = require('mongoose')
const { Schema, model } = mongoose

const DOCUMENT_NAME = 'ApiKey'
const COLLECTION_NAME = 'ApiKeys'

const shopSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: Schema.Types.Boolean,
    default: true
  },
  permissions: {
    type: [String],
    required: true,
    enum: ['0000', '1111', '2222']
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, shopSchema)
