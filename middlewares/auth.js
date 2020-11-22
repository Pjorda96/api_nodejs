'use strict'

import jwt from 'jwt-simple'
import moment from 'moment'
import config from "../config";

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'Token not valid' })
  }

  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.decode(token, config.SECRET_TOKEN)

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token expired' })
  }

  req.user = payload.sub
  next()
}

export {
  isAuth
}
