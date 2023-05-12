const { check, body } = require('express-validator');
const slugify = require('slugify');
const validationMiddleWare = require('../../middlewares/validatorMiddleWare');

exports.createCetegoriesValidator = [
    check('name').notEmpty()
        .isLength({ min: 2 }).withMessage('category name too short')
        .isLength({ max: 32 }).withMessage('category name too long')
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true;
        }),
    check('image').optional()

    , validationMiddleWare
]


exports.UpdateCetegoriesValidator = [
    check('id').isMongoId()
        .withMessage('Invalid category id format'),

    body('name').optional().custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    })

    , validationMiddleWare
]

exports.DeleteCetegoriesValidator = [
    check('id').isMongoId()
        .withMessage('Invalid category id format')


    , validationMiddleWare
]

exports.GetOneCetegoriesValidator = [
    check('id').isMongoId()
        .withMessage('Invalid category id format')


    , validationMiddleWare
]