const express = require('express')
const { allowCreateAccount, signup, login } = require('../services/authService')
const { createAuthalidator, LoginAuthalidator } = require('../utils/validators/authValidator')

const router = express.Router()

router.route('/signup')
    .post(createAuthalidator, allowCreateAccount, signup)

router.route('/login')
    .post(LoginAuthalidator, login)


module.exports = router