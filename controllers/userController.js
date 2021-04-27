const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const users = await userModel.find()
            res.json(users)
        }
        catch (e) {
            e.status = 400
            next(e) // Generic error Handler in app.js
        }
    },
    getById: async function (req, res, next) {
        try {
            const user = await userModel.findById(req.params.id)
            res.json(user)
        }
        catch (e) {
            e.status = 400
            next(e)
        }
    },
    update: async function (req, res, next) {
        try {
            const response = await userModel.updateOne({ _id: req.params.id }, req.body)
            res.json(response)
        }
        catch (e) {
            e.status = 400
            next(e)
        }

    },
    create: async function (req, res, next) {
        try {
            const document = new userModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            let response = await document.save()
            res.json(response)
        }
        catch (e) {
            e.status = 400
            next(e)
        }
    },
    deleteById: async function (req, res, next) {
        try {
            const response = await userModel.deleteOne({ _id: req.params.id })
            res.json(response)
        }
        catch (e) {
            e.status = 400
            next(e)
        }
    },
    login: async function (req, res, next) {
        try {
            const user = await userModel.findOne({ email: req.body.email })
            if (!user) {
                res.json({ error: true, message: "Bad Email/Password." })
                return
            }
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({ userId: user._id }, req.app.get("secretKey"), { expiresIn: "1h" }) //jwt.sign() genera el token
                res.json({ error: false, message: "Login Ok", token: token })
                return
            }
            else {
                res.json({ error: true, message: "Bad Email/Password." })
                return
            }
        }
        catch (e) {
            e.status = 400
            next(e)
        }
    }

}