const expressAsyncHandler = require("express-async-handler");


const User = require('../models/userModel')

// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs');

const crypto = require('crypto');

const ApiError = require("../utils/apiError");




// create token by passing id user
const createToken = (payload) =>
    jwt.sign({ userId: payload }, "ADD_TOKEN_KEY_HERE", {
        expiresIn: '90d'
    })



//@desc only who has key can create new accounts
exports.allowCreateAccount = expressAsyncHandler(async (req, res, next) => {


    const key = req.body.key !== 'yassine.info'
    if (key) {
        return next(
            new ApiError('You are not allowed to create New Accounts , you need key', 403)
        );
    }
    next()

})


// @DESC SIGNUP
// @ROUTE GET /API/V1/AUTH/SIGNUP
// @DACCESS rotected/ by Key "yassine.info"
exports.signup = expressAsyncHandler(async (req, res, next) => {


    //  1- create user
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password


    })

    // 2 - create token
    const token = createToken(user._id)

    res.status(201).json({ data: user, token })
})

// @DESC LOGIN
// @ROUTE GET /API/V1/AUTH/LOGIN
// @DACCESS PUBLIC
exports.login = expressAsyncHandler(async (req, res, next) => {

    // 1) check if login is true

    const user = await User.findOne({ email: req.body.email })
    //2) match if passowrd correct
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {

        next(new ApiError('email or password uncourrect', 404))
    }

    //3) create Token 
    const token = createToken(user._id)


    res.status(200).json({ data: user, token })
})




//@DESC Check if User Loged 
exports.protect = expressAsyncHandler(async (req, res, next) => {

    //1) check if token exist
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new ApiError('you are not login , plase login to get access  this route', 400))
    }

    //2) decoded Token 
    const decoded = jwt.verify(token, "ADD_TOKEN_KEY_HERE")

    //3) check if user exist 

    const currentUser = await User.findById(decoded.userId)


    if (!currentUser) {

        return next(new ApiError('the user that belong to this token does no longer exist', 401))

    }


    //4) verify token (no change happens  epired token)

    req.user = currentUser

    next()

})



//@DESC CHeck IF user is a admin 
exports.allowTo = (...roles) => expressAsyncHandler(async (req, res, next) => {

    if (!roles.includes(req.user.role)) {
        return next(
            new ApiError('You are not allowed to access this route', 403)
        );
    }
    next()
})