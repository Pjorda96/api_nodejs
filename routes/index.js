'use strict'

import express from 'express'
const api = express.Router()

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product'

api.get('/product', async (req, res) => {
  const products = await getProducts()

  res.status(products.status).send(products.data)
})

api.get('/product/:id', async (req, res) => {
  const productId = req.params.id
  const products = await getProduct(productId)

  res.status(products.status).send(products.data)
})

api.post('/product', async (req, res) => {
  const product = req.body
  const productCreated = await createProduct(product)

  res.status(productCreated.status).send(productCreated.data)
})

api.put('/product/:id', async (req, res) => {
  const productId = req.params.id
  const product = req.body
  const productCreated = await updateProduct(productId, product)

  res.status(productCreated.status).send(productCreated.data)
})

api.delete('/product/:id', async (req, res) => {
  const productId = req.params.id
  const productCreated = await deleteProduct(productId)

  res.status(productCreated.status).send(productCreated.data)
})

export default api
