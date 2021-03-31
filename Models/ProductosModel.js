const mongoose = require("../bin/mongodb")

const productSchema = new mongoose.Schema({
    name: String,
    weapon: String,
    favoriteColor: String
})

module.exports = mongoose.model("Productos", productSchema)