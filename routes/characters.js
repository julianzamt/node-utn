var express = require('express');
const app = require('../app');
var router = express.Router();
const controller = require('../controllers/characterController')

/* GET users listing. */
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', (req, res, next) => { req.app.validateUser(req, res, next) }, controller.create);
router.put('/:id', (req, res, next) => { req.app.validateUser(req, res, next) }, controller.update);
router.delete('/:id', (req, res, next) => { req.app.validateUser(req, res, next) }, controller.deleteById);



module.exports = router;
