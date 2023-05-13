const express = require('express')
const { CreateOrder, getAllPOrders, updateIsDelivered, getOneOrder, deleteOrder } = require('../services/orderService')

const router = express.Router()


router.route('/')
    .post(CreateOrder)
    .get(getAllPOrders)

router.route('/:id')
    .put(updateIsDelivered)
    .get(getOneOrder)

    .delete(deleteOrder)
module.exports = router