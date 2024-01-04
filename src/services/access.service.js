const bcrypt = require('bcrypt')
const crypto = require('crypto')
const shopModel = require('../models/shop.model')
const KeyTokenService = require('../services/keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { getInformation } = require('../utils')
const { BadRequestError } = require('../core/error.message')

const roleShop = {
  SHOP: 'SHOP',
  ADMIN: 'ADMIN',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR'
}

class AccessService {
  static signup = async ({ name, email, password }) => {
    const holderShop = await shopModel.findOne({ email }).lean()
    if (holderShop) throw new BadRequestError('Shop already registered!')

    const passwordHash = await bcrypt.hash(password, 10)
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [roleShop.SHOP]
    })

    if (newShop) {
      const privateKey = crypto.randomBytes(64).toString('hex')
      const publicKey = crypto.randomBytes(64).toString('hex')

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey
      })
      if (!keyStore) throw new BadRequestError('Error on create key token store!')

      const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)

      return {
        code: 201,
        metadata: {
          shop: getInformation({ fields: ['_id', 'name', 'email'], object: newShop }),
          tokens
        }
      }
    }

    return { code: 200, metadata: null }
  }
}

module.exports = AccessService
