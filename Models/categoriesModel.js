const mongoose = require("../bin/mongodb")
const errorMessages = require('../utils/errorMessages')

const categoriesSchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model("categories", categoriesSchema)