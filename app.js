const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

require('./models');

const indexRouter = require('./routes/index');
const typesRouter = require('./routes/types');
const tasksRouter = require('./routes/tasks');
const legacyTasksRouter = require('./routes/legacy_tasks')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/types', typesRouter);
app.use('/tasks', tasksRouter);
app.use('/legacyTask', legacyTasksRouter);

module.exports = app;
