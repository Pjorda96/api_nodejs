'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  }

  return jwt.encode(payload, config.secretToken)
}

function decodeToken(token) {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = await jwt.decode(token, config.secretToken)

      if (payload.exp <= moment.unix()) {
        reject({
          status: 401,
          mensaje: 'Token expirado'
        })
      }

      resolve(payload.sub)
    } catch (e) {
      reject({
        status: 500,
        message: 'Invalid token'
      })
    }
  })
}

module.exports = {
  createToken,
  decodeToken
}
