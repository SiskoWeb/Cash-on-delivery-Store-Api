const express = require('express')
const { allowCreateAccount, signup, login } = require('../services/authService')

const router = express.Router()

router.route('/signup')
    .post(allowCreateAccount, signup)

router.route('/login')
    .post(login)


module.exports = router