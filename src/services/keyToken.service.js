const keyTokenModel = require('../models/keyToken.model')
const { Types } = require('mongoose')

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const filter = { user: userId }
      const update = { publicKey, privateKey }
      const options = { upsert: true, new: true }

      const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

      return tokens ? tokens.publicKey : null
    } catch (error) { return error }
  }

  static findTokenById = async ({ userId }) => {
    const keyToken = await keyTokenModel
      .findOne({ user: Types.ObjectId(userId) })
      .lean()

    return keyToken
  }

  static removeKeyById = async (keyId) => {
    const removeToken = await keyTokenModel
      .findOneAndDelete({ _id: Types.ObjectId(keyId) })
      .lean()

    return removeToken
  }
}

module.exports = KeyTokenService
