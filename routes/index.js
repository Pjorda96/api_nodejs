'use strict'

const express = require('express')
const api = express.Router()

const ProductControllers = require('../controllers/product')

api.get('/product', ProductControllers.getProducts)
api.get('/product/:id', ProductControllers.getProduct)
api.post('/product', ProductControllers.createProduct)
api.put('/product/:id', ProductControllers.updateProduct)
api.delete('/product/:id', ProductControllers.deleteProduct)

module.exports = api
