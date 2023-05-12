const express = require("express")

const router = express.Router()

const { createCategory, resizeImage, imageUploaderCategories, getAllCategories, updateCategory, deleteCategory, getOne } = require('../services/categoriesService')
const { createCetegoriesValidator, UpdateCetegoriesValidator, DeleteCetegoriesValidator, GetOneCetegoriesValidator } = require('../utils/validators/categoriesValidator')
const AuthService = require('../services/authService')

router.route('/')
    .post(AuthService.allowTo('admin'),AuthService.protect,imageUploaderCategories, resizeImage, createCetegoriesValidator, createCategory)
    .get(getAllCategories)


router.route('/:id')
    .put(AuthService.allowTo('admin'),AuthService.protect,imageUploaderCategories, resizeImage, UpdateCetegoriesValidator, updateCategory)
    .delete(AuthService.allowTo('admin'),AuthService.protect,DeleteCetegoriesValidator, deleteCategory)
    .get(GetOneCetegoriesValidator, getOne)

module.exports = router