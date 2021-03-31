const productsModel = require('../Models/ProductosModel')

module.exports = {
    getAll: async function (req, res, next) {
        const characters = await productsModel.find()
        res.json(characters)
    },
    getById: async function (req, res, next) {
        const character = await productsModel.findById(req.params.id)
        res.json(character)
    },
    update: async function (req, res, next) {
        const response = await productsModel.updateOne({ _id: req.params.id }, req.body)
        res.json(response)
    },
    create: async function (req, res, next) {
        console.log(req.body)

        const document = new productsModel({
            name: req.body.name,
            weapon: req.body.weapon,
            favoriteColor: req.body.favoriteColor
        })

        const response = await document.save()
        res.json(response)
    },
    delete: async function (req, res, next) {
        const response = await productsModel.deleteOne({ _id: req.params.id })
        res.json(response)
    }

}