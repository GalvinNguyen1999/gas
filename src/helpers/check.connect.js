'use strict'
const mongoose = require('mongoose')
const os = require('os')
const process = require('process')

const _SECOND = 5000 

// count connect
const countConnect = () => {
  const numberConnection = mongoose.connections.length
  console.log(`Number of connection ${numberConnection}`)
}

// check over load sever
const checkOverLoad = () => {
  setInterval(() => {
    const numberConnection = mongoose.connections.length
    const numberCore = os.cpus().length
    const memoryUsage = process.memoryUsage().rss

    console.log(`Active Connection ${numberConnection}`)
    console.log(`Memory use: ${memoryUsage / 1024 / 1024 } MB`)
    
    // example maximum of connections base on number of core
    const maxConnections = numberCore * 5

    if (numberConnection > maxConnections) {
      console.log('Connections over loading...')
    }

  }, _SECOND) // monitor every 5 second
}

module.exports = {
  countConnect,
  checkOverLoad
}
