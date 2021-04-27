var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const charactersRouter = require('./routes/characters');
const categoriesRouter = require('./routes/categories');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// token configuration
app.set('secretKey', 'utn2021')
const validateUser = (req, res, next) => {
  jwt.verify(req.headers['x-access-token'], req.app.get("secretKey"), (err, decoded) => {
    if (err) {
      res.json({ message: err.message })
      return
    }
    else {
      req.body.tokenData = decoded;
      next()
    }
  })
}
app.validateUser = validateUser

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/characters', charactersRouter);
app.use('/categories', categoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send json to client
  res.status(err.status || 500);
  res.json({
    error: true,
    message: err.message
  })
});

module.exports = app;
