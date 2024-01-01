'use strict'
const mongoose = require('mongoose')
require('dotenv').config()
const { db: { host, port, name } } = require('../configs/config.mongodb')
const connectURL = `mongodb://${host}:${port}/${name}`

class Database {
  constructor() {
    this.connect()
  }

  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose
      .connect(connectURL, {
        maxPoolSize: 100
      })
      .then(() => { console.log('Connected MongoDB Success') })
      .catch(() => { console.log('Error Connect DB') })
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

const instanceMongoDB = Database.getInstance()
module.exports = instanceMongoDB
