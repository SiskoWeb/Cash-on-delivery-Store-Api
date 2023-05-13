const asyncHandler = require('express-async-handler');
const sharp = require('sharp');


const Categories = require('../models/categoriesModel');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleWar');
const { createCategory, getAll, updateOne, deleteOne, getOne } = require('./handlersFactory');






// @desc Resize Image That user input
exports.resizeImage = asyncHandler(async (req, res, next) => {

    const fileName = `Categories=${Date.now()}-${Math.round(Math.random() * 1E9)}.jpeg`
    if (req.file) {

        await sharp(req.file.buffer)
            .resize(900, 900)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`uploads/categories/${fileName}`)
        req.body.image = fileName
    }
    next()
})



//@Desc MiddleWare using multer to upload image to server
exports.imageUploaderCategories = uploadSingleImage('image')



// @desc    Create  category
// @route   PUT /api/v1/categories/:id
// @access    Protected/Admin
exports.createCategory = createCategory(Categories)


// @desc    Get All category
// @route   GET /api/v1/categories/:id
// @access    Protected/Admin
exports.getAllCategories = getAll(Categories)

// @desc    update specific category
// @route   UPUT /api/v1/categories/:id
// @access    Protected/Admin
exports.updateCategory = updateOne(Categories)

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access    Protected/Admin
exports.deleteCategory = deleteOne(Categories)

// @desc    Get specific category
// @route   GET /api/v1/categories/:id
// @access    Protected/Admin
exports.getOne = getOne(Categories)