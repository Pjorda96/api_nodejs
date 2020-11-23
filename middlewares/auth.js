'use strict'

import { decodeToken } from '../services';

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'Token not valid' })
  }

  const token = req.headers.authorization.split(' ')[1]

  decodeToken(token)
    .then(res => {
      req.user = res
      next()
    })
    .catch(err => {
      res.status(err.status).send(err.message)
    })
}

export {
  isAuth
}
