var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
  res.send('register/login route!');
});

router.post('/login', function (req, res, next) {
  res.send('users/login route!');
});

module.exports = router;
