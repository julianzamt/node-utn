const categoriesModel = require('../Models/categoriesModel')

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const categories = await categoriesModel.find()
            res.json(categories)
        }
        catch (e) {
            e.status = 400
            next(e) // Generic error Handler in app.js
        }
    },
    update: async function (req, res, next) {
        try {
            const response = await categoriesModel.updateOne({ _id: req.params.id }, req.body)
            res.json(response)
        }
        catch (e) {
            e.status = 400
            next(e)
        }

    },
    create: async function (req, res, next) {
        try {
            const newCategory = await categoriesModel.create(req.body)
            res.json(newCategory)
        }
        catch (e) {
            e.status = 400
            next(e)
        }
    },
    delete: async function (req, res, next) {
        try {
            const response = await categoriesModel.deleteOne({ _id: req.params.id })
            res.json(response)
        }
        catch (e) {
            e.status = 400
            next(e)
        }
    }

}