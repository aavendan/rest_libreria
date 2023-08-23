var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var librosRouter = require('./routes/rest_libros');
var autoresRouter = require('./routes/rest_autores');
var autoresLibrosRouter = require('./routes/rest_autores_libros');

/* MÓDULO dotenv */
const dotenv = require('dotenv');

/* CARGA DE DATOS DE CONFIGURACION EN MEMORIA */
dotenv.config();

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

var authenticateJWT = require('./middleware/auth');


var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// authenticateJWT, 
app.use('/rest/libro', librosRouter);
app.use('/rest/autor', autoresRouter);
app.use('/rest/autor_libro',  autoresLibrosRouter);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
