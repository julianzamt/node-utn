module.exports = {
    getAll: function (req, res, next) {
        const products = [
            {
                id: 1,
                name: "darth vader",
            },
            {
                id: 2,
                name: "luke skywalker",
            }
        ]
        res.json(products)
    },
    getById: function (req, res, next) {
        res.json(req.params)
        const product = [
            {
                id: 1,
                name: "darth vader",
            },
        ]
        res.json(product)
    },
    update: function (req, res, next) {
        console.log(req.params)
        res.json(req.params)
    },
    create: function (req, res, next) {
        console.log(req.body)
        res.json(req.body)
    },
    delete: function (req, res, next) {
        console.log(req.params)
        res.json("delete")
    }

}