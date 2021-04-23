const mongoose = require("../bin/mongodb")
const errorMessages = require('../utils/errorMessages')

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, errorMessages.GENERAL.required],
        maxlength: [30, errorMessages.GENERAL.maxlength]
    },
    weapon: {
        type: String,
        required: [true, errorMessages.GENERAL.required],
        maxlength: [30, errorMessages.GENERAL.maxlength]
    },
    howMuchILoveIt: {
        type: Number,
        required: [true, errorMessages.GENERAL.required],
        max: [10, errorMessages.GENERAL.zeroToTen],
        min: [0, errorMessages.GENERAL.zeroToTen]
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "categories"
    }
})

module.exports = mongoose.model("Character", characterSchema)