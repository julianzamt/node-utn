const characterModel = require('../Models/characterModel')

module.exports = {
    getAll: async function (req, res, next) {
        let queryFind = {}
        if (req.query.name) {
            queryFind = { name: { $regex: ".*" + req.query.name + ".*", $options: "i" } }
        }
        if (req.query.category) {
            queryFind = { ...queryFind, category: req.query.category }
        }

        try {
            const characters = await characterModel.paginate(queryFind, {
                sort: { howMuchILoveIt: -1 },
                populate: "category",
                limit: req.query.limit || 3,
                page: req.query.page || 1
            })
            res.json(characters)
        }
        catch (e) {
            e.status = 400
            next(e) // Generic error Handler in app.js
        }
    },
    getById: async function (req, res, next) {
        try {
            const character = await characterModel.findById(req.params.id).populate("category")
            res.json(character)
        }
        catch (e) {
            e.status = 400
            next(e)
        }
    },
    update: async function (req, res, next) {
        try {
            const response = await characterModel.updateOne({ _id: req.params.id }, req.body)
            res.json(response)
        }
        catch (e) {
            e.status = 400
            next(e)
        }

    },
    create: async function (req, res, next) {
        try {
            const document = new characterModel({
                name: req.body.name,
                weapon: req.body.weapon,
                howMuchILoveIt: req.body.howMuchILoveIt,
                category: req.body.category,
                createdBy: req.body.tokenData.userId
            })
            const newCharacter = await document.save()
            res.json(newCharacter)
        }
        catch (e) {
            e.status = 400
            next(e)
        }
    },
    deleteById: async function (req, res, next) {
        try {
            const response = await characterModel.deleteOne({ _id: req.params.id })
            res.json(response)
        }
        catch (e) {
            e.status = 400
            next(e)
        }
    }

}