'use strict'
const mongoose = require('mongoose')
const { Schema, model } = mongoose

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'shops'

const shopSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 150
  },
  email: {
    type: String,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  verify: {
    type: Schema.Types.Boolean,
    default: false
  },
  roles: {
    type: Array,
    default: []
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, shopSchema)
