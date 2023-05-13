const express = require('express')

const router = express.Router()
const { createProduct, getAllProdcuts, updateProduct, deleteProduct, getOne, resizeImage, imageUploaderProduct } = require('../services/productService')
const AuthService = require('../services/authService')
const { createProductValidator, updateProductValidator, deleteProductValidator, getOneProductValidator } = require('../utils/validators/productValidator')

router.route('/')

    .post(AuthService.protect, AuthService.allowTo('admin', "manager"), createProductValidator, imageUploaderProduct, resizeImage, createProduct)
    .get(getAllProdcuts)

router.route('/:id')
    .put(AuthService.protect, AuthService.allowTo('admin', "manager"), updateProductValidator, imageUploaderProduct, resizeImage, updateProduct)
    .delete(AuthService.protect, AuthService.allowTo('admin', "manager"), deleteProductValidator, deleteProduct)
    .get(getOneProductValidator, getOne)



module.exports = router