const mongoose = require('mongoose')

const categoriesShema = mongoose.Schema({
    name: {
        type: String,
        required: [true, ' category required'],
        unique: [true, "category name must be unique"],
        minlength: [3, 'category too short'],
        maxlength: [32, 'category too long']
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: {
        type: String,

    }
}, { timestamps: true })


const categoriesModel = mongoose.model('Categories', categoriesShema)

module.exports = categoriesModel