const express = require('express')

const router = express.Router()
const { createProduct, getAllProdcuts, updateProduct, deleteProduct, getOne, resizeImage, imageUploaderProduct } = require('../services/productService')
const AuthService = require('../services/authService')

router.route('/')

    .post(AuthService.protect, AuthService.allowTo('admin', "manager"), imageUploaderProduct, resizeImage, createProduct)
    .get(getAllProdcuts)

router.route('/:id')
    .put(AuthService.protect, AuthService.allowTo('admin', "manager"), imageUploaderProduct, resizeImage, updateProduct)
    .delete(AuthService.protect, AuthService.allowTo('admin', "manager"), deleteProduct)
    .get(getOne)



module.exports = router