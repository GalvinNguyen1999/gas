const _ = require('lodash')

const getInformation = ({ fields = [], object = {} }) => {
  return _.pick(object, fields)
}

module.exports = {
  getInformation
}
