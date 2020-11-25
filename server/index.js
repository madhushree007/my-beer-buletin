const express = require('express');
// const cors = require('cors');
const app = express();
// const db = require('./models');
const router = require('./router');
const mongoose = require('mongoose');
const stage = process.env.NODE_ENV || 'dev';
const env = require(`./config/env.${stage}.js`);
const secrets = require('./secret');

// app.use(cors());
app.use(express.json());
app.use(router);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

function errorHandler (err, req, res, next) {
  console.log(err)
  res.setHeader('Content-Type', 'application/json');
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
}
app.use(errorHandler);

(async () => {
  try {
    mongoose
      .connect(env.db.APP_CONN_STR.replace('{PASSWORD}', secrets.DB_PASSWORD), {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Connected to db');
        const server = app.listen(env.server.PORT, () => {
          console.log('Listening................PORT:' + env.server.PORT);
        });
      });
  } catch (e) {
    console.error('Error connecting to the db', e); // eslint-disable-line no-console
  }
})();

module.exports = app;
