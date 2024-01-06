const JWT = require('jsonwebtoken')
const { asyncHandler } = require('../helpers/asyncHandler')
const { HEADER } = require('../utils/constant')
const { AuthFailureError, NotFoundError } = require('../core/error.message')
const { findTokenById } = require('../services/keyToken.service')

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: '2 days'
    })

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: '7 days'
    })

    JWT.verify(accessToken, publicKey, (error, decode) => {
      if (error) {
        console.log(`[ERROR]::createTokenPair::${error.message}`)
      }

      console.log(`[INFO]::decode::`, decode)
    })

    return {
      accessToken,
      refreshToken
    }
  } catch (error) { }
}

const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID]
  if (!userId) throw new AuthFailureError('Invalid Request!')

  const keyStore = await findTokenById({ userId })
  if (!keyStore) throw new NotFoundError('Key not found!')

  const accessToken = req.headers[HEADER.Authorization]
  if (!accessToken) throw new AuthFailureError('Invalid Request!')

  try {
    const decode = JWT.verify(accessToken, keyStore.publicKey)
    if (userId !== decode.userId) throw new AuthFailureError('Invalid User!')
    req.keyStore = keyStore

  } catch (error) { throw error }
})

module.exports = {
  createTokenPair,
  authentication
}
