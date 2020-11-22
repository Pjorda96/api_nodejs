'use strict'

import mongoose from 'mongoose'
import User from '../models/user'
import { createToken } from '../services'

function signUp(req, res) {
  const user = new User(req.body)

  user.save(err => {
    if (err) res.status(500).send({ message: 'Error al crear usuario: ' + err })

    return res.status(200).send({ token: createToken(user) })
  })
}

function signIn(req, res) {

}

export default {
  signUp,
  signIn
}
