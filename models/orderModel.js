const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({

    cartItems: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
            },
            quantity: Number,
            price: Number,
        },
    ],
    shippingAddress: {
        name: String,
        address: String,
        phone: String,
        city: String,

    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    totalOrderPrice: {
        type: Number,
    },
}
    ,
    { timestamps: true }
)


const orderModel = mongoose.model('Orders', orderSchema)

module.exports = orderModel