'use strict'

import jwt from 'jwt-simple'
import moment from 'moment'
import config from '../config'

function createToken(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

export {
  createToken
}
