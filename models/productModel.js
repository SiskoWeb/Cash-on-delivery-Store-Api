const mongoose = require('mongoose')

const productSchema = mongoose.Schema({


    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'to short product title'],
        maxlength: [100, 'to long product title'],
    },
    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, ' product Description is required'],
        minlength: [20, ' to shot product description']
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required']

    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [200000, 'to long product price']
    },
    priceAfterDiscount: {
        type: Number
    },

    colors: [String],
    imageCover: {
        type: String,
        required: [true, 'image cover is required']

    },
    images: [String],

    ratingsAverage: {
        type: Number,
        min: [1, 'rating mus be abouve or erual 1.0'],
        max: [5, 'rating mus be below or erual 1.0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Categories',
        required: [true, 'Product must be Belong to parent Category']
    },
},

    {
        timestamps: true, // to enable virtual populate
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })

const setImageUrl = (doc) => {
    if (doc.imageCover) {
        const imageUrl = `http://127.0.0.1:3000/products/${doc.imageCover}`
        doc.imageCover = imageUrl
    }
    if (doc.images) {
        // also we can use foreach
        // eslint-disable-next-line array-callback-return
        doc.images.map((img, index) => {

            const imageUrl = `http://127.0.0.1:3000/products/${img}`
            doc.images[index] = imageUrl
        })

    }
}


// middleware from mongoose give us ablite to add url to images
productSchema.post('init', (doc) => {
    setImageUrl(doc)

});

productSchema.post('save', (doc) => {
    setImageUrl(doc)

});

// Mongoose query middleware : Display name category
productSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: 'name -_id',
    });
    next();
});
const productModel = mongoose.model('Product', productSchema)

module.exports = productModel