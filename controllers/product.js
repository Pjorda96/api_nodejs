'use strict'

import Product from "../models/product";

async function getProducts() {
  let response = {}

  await Product.find((err, products) => {
    if (err) return response = handleError(err)
    else if (!products) return response = { status: 404, data: 'No products stored' }

    response = { status: 200, data: products }
  })

  return response;
}

async function getProduct(id) {
  let response = {}

  await Product.findById(id, (err, products) => {
    if (err) return response = handleError(err)
    if (!products) return response = { status: 404, data: 'No products stored' }

    response = { status: 200, data: products }
  })

  return response;
}

async function createProduct(product) {
  // let response = {}

  const newProduct = new Product(product)
  // TODO: refactor
  return new Promise(async resolve => {
    await newProduct.save((err, productStored) => {
      // if (err) return response = handleError(err)
      if (err) resolve(handleError(err))

      resolve({ status: 200, data: productStored })
      // response = { status: 200, data: productStored }
    })
  })

  // return response;
}

async function updateProduct(id, product) {
  let response = {}

  await Product.findByIdAndUpdate(id, product, (err, productStored) => {
    if (err) return response = handleError(err)
    if (!productStored) return response = { status: 404, data: 'Product not found' }

    response = { status: 200, data: product }
  })

  return response;
}

async function deleteProduct(id) {
  let response = {}

  return new Promise(async resolve => {
    await Product.findById(id, async (err, productStored) => {
      if (err) resolve({ status: 404, data: 'Product not found' })
      // if (err) return response = { status: 404, data: 'Product not found' }
      if (!productStored) resolve({ status: 404, data: 'Product not found' })
      // if (!productStored) return response = { status: 404, data: 'Product not found' }

      await productStored.remove((err) => {
        if (err) resolve(handleError(err))
        // if (err) return response = handleError(err)

        resolve({ status: 200, data: 'Product deleted' })
        // response = { status: 200, data: 'Product deleted' }
      })
    })
  })

  // return response
}

function handleError(err, status = 500) {
  return { status, data: 'Error: ' + err }
}

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
