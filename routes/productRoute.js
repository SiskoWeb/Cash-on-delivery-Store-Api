const express = require('express')

const router = express.Router()
const { createProduct, getAllProdcuts, updateProduct, deleteProduct, getOne, resizeImage, imageUploaderProduct } = require('../services/productService')
const AuthService = require('../services/authService')

router.route('/')

    .post(AuthService.allowTo('admin'),AuthService.protect,imageUploaderProduct, resizeImage, createProduct)
    .get(getAllProdcuts)

router.route('/:id')
    .put(AuthService.allowTo('admin'),AuthService.protect,imageUploaderProduct, resizeImage, updateProduct)
    .delete(AuthService.allowTo('admin'),AuthService.protect,deleteProduct)
    .get(getOne)



module.exports = router