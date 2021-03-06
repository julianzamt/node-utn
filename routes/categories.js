var express = require('express');
var router = express.Router();
const controller = require('../controllers/categoriesController')

/* GET users listing. */
router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
