'use strict'

import express from 'express'
import bodyParser from 'body-parser'
const app = express()

const port = process.env.PORT || 3000
const version = process.env.VERSION || '/api'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get(version + '/product', (req, res) => {
  res.status(200).send([])
})

app.get(version + '/product/:id', (req, res) => {

})

app.post(version + '/product', (req, res) => {
  res.status(200).send(req.body)
})

app.put(version + '/product/:id', (req, res) => {

})

app.delete(version + '/product/:id', (req, res) => {

})

app.listen(port, () => {
  console.log('API REST corriendo en http://localhost:'+ port)
})

