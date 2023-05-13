const express = require('express')
const { CreateOrder, getAllPOrders, updateIsDelivered, getOneOrder, deleteOrder } = require('../services/orderService')

const router = express.Router()

const AuthService = require('../services/authService')

router.route('/')
    .post(AuthService.protect, AuthService.allowTo('admin', "manager"), CreateOrder)
    .get(getAllPOrders)

router.route('/:id')
    .put(AuthService.protect, AuthService.allowTo('admin', "manager"), updateIsDelivered)
    .get(AuthService.protect, AuthService.allowTo('admin', "manager"), getOneOrder)

    .delete(AuthService.protect, AuthService.allowTo('admin', "manager"), deleteOrder)
module.exports = router