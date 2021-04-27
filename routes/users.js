var express = require('express');
var router = express.Router();
const { getAll, getById, create, update, deleteById, login } = require('../controllers/userController')

/* GET users listing. */
router.get('/', getAll);
router.post('/register', create);
router.post('/', login);
router.delete('/:id', deleteById);
router.put('/:id', update);


module.exports = router;
