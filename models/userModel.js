const mongoose = require('mongoose')


// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'user required'],
    },
    slug: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'email required'],
        lowercase: true,
        uniqe: true,
    },

    // profileImg: String,
    password: {
        type: String,
        required: [true, "passowrd requierd"],
        minlegth: [6, 'to short password'],

    },

    role: {
        type: String,

        enum: ['admin', 'manager'],
        default: "admin",
    }

},

    { timestamps: true }

)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const userModel = mongoose.model('User', userSchema)

module.exports = userModel