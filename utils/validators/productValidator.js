const { check, body } = require('express-validator');
const slugify = require('slugify');

const validationMiddleWare = require('../../middlewares/validatorMiddleWare')

const categoriesModel = require('../../models/categoriesModel');

exports.gerProductValidator = [
    check('id').isMongoId().withMessage('invalid product id format'), validationMiddleWare
]


exports.createProductValidator = [

    check("title").notEmpty().withMessage('Product name Required')
        .isLength({ min: 2 }).withMessage('Product name too short')
        .isLength({ max: 32 }).withMessage('Product name too Long')
    ,

    check("price")
        .notEmpty().withMessage('price is  Required')
        .isNumeric()
        .withMessage('price should be number')
        .isLength({ max: 200000 }).withMessage('to long price Prodcut'),

    check('description')
        .notEmpty().withMessage('description is required')
        .isLength({ min: 20 }).withMessage('description is too short Should Mord then 20 letter')
        .isLength({ max: 2000 }).withMessage('description is too short shouild less then 2000 letter'),


    check('quantity')
        .notEmpty().withMessage('quantity is required')
        .isNumeric().withMessage('quantity shouild be number'),

    check('imageCover')
        .notEmpty().withMessage('imageCover is requird'),

    check('images')
        .optional().isArray().withMessage('images should be array of string'),

    check('category')
        .notEmpty().withMessage('category required')
        .isMongoId().withMessage('invalid id formate')

        .custom((value) =>

            categoriesModel.findById(value).then(cat => {
                if (!cat) {
                    return Promise.reject(
                        new Error("no category with this id")

                    )

                }
            })

        )

    , body('title').custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),

    validationMiddleWare
]

exports.updateProductValidator = [
    check('id').isMongoId().withMessage('invalid product id format'), validationMiddleWare
]

exports.deleteProductValidator = [
    check('id').isMongoId().withMessage('invalid product id format'), validationMiddleWare
]
exports.getOneProductValidator = [
    check('id').isMongoId().withMessage('invalid product id format'), validationMiddleWare
]