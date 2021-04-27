const mongoose = require("../bin/mongodb")
const errorMessages = require('../utils/errorMessages')
const validators = require('../utils/validators')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, errorMessages.GENERAL.required], unique: true }, // for custom uniqueness error messages is necessary to write a custom middleware function as is handled by mongo
    email: { type: String, required: [true, errorMessages.GENERAL.required], unique: true },
    password: {
        type: String,
        required: [true, errorMessages.GENERAL.required],
        validate: {
            validator: (v) => validators.isGoodPassword(v),
            message: errorMessages.USERS.passwordIncorrect
        }
    }
})

// Middleware
userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})
userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('username/email already used'));
    } else {
        next(error);
    }
});

module.exports = mongoose.model("Users", userSchema)