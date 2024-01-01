const bcrypt = require('bcrypt')
const crypto = require('crypto')
const shopModel = require('../models/shop.model')
const KeyTokenService = require('../services/keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { getInformation } = require('../utils')

const roleShop = {
  SHOP: 'SHOP',
  ADMIN: 'ADMIN',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR'
}

class AccessService {
  static signup = async ({ name, email, password }) => {
    try {
      const holderShop = await shopModel.findOne({ email }).lean()
      if (holderShop) {
        return {
          code: 'xxx',
          message: 'Shop already exists'
        }
      }
     
      const passwordHash = await bcrypt.hash(password, 10)
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [roleShop.SHOP]
      })
      if (newShop) {
        // create private key, public key
        // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem'
        //   },
        //   privateKeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem'
        //   }
        // })
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')
        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey
        })
        if (!keyStore) {
          return {
            code: 'xxx',
            message: 'keyStore error',
          }
        }
        const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)

        return {
          code: 201,
          metadata: {
            shop: getInformation({ fields: ['_id', 'name', 'email'], object: newShop }),
            tokens
          }
        }
      }

      return {
        code: 200,
        metadata: null
      }
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'Error'
      }
    }
  }
}

module.exports = AccessService