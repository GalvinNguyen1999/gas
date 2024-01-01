const keyTokenModel = require('../models/keyToken.model')

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const newKeyToken = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey
      })

      return newKeyToken ? newKeyToken.publicKey : null
    } catch (error) { return error }
  }
}

module.exports = KeyTokenService
