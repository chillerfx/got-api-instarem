import 'babel-polyfill';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import indexRouter from './routes/index';
import mongoose from 'mongoose';

import * as config from './config';

const app = express();
/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;

mongoose.connect(config.database.uri);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
