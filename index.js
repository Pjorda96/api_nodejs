'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';

import Product from './models/product'

const app = express()

const port = process.env.PORT || 3000
const version = process.env.VERSION || '/api'
const database = `mongodb://localhost:${process.env.DB_PORT || '27017'}/shop` // no necessary default port
const databaseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get(version + '/product', (req, res) => {
  Product.find((err, products) => {
    if (err) handleError(err, res)

    res.status(200).send(products)
  })
})

app.get(version + '/product/:id', (req, res) => {
  const productId = req.params.id
  console.log(productId)

  Product.findById(productId, (err, productStored) => {
    if (err) handleError(err, res)
    if (!productStored) res.status(400).send({ message: 'Product not found' } )

    res.status(200).send(productStored)
  })
})

app.post(version + '/product', (req, res) => {
  console.log(req.body)
  const product = new Product(req.body)

  product.save((err, productStored) => {
    if (err) handleError(err, res)

    res.status(200).send(productStored)
  })
})

app.put(version + '/product/:id', (req, res) => {

})

app.delete(version + '/product/:id', (req, res) => {

})

function handleError(err, res) {
  res.status(500).send({ message: 'Error with database: ' + err })
}

mongoose.connect(database, databaseConfig, (err, res) => {
  if (err) {
    return console.log('DB connection error ' + err)
  }
  console.log('DB connection success')

  app.listen(port, () => {
    console.log('API REST running at http://localhost:'+ port)
  })
})
