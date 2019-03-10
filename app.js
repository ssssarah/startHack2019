var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db/all.js');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var bookingRouter = require('./routes/bookings');
var vehicleRouter = require('./routes/vehicles');

var app = express();

db.connect().then(function(){
 db.refreshDB();
});

var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({
  defaultLayout: 'layout',
  helpers: {
    json: function (context) {
      return JSON.stringify(context);
    }
  }
}));
app.set('view engine', 'handlebars');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/vehicle', vehicleRouter);
app.use('/booking', bookingRouter);

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
  res.send(err.message);
});

module.exports = app;
