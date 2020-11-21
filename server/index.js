const express = require('express');
// const cors = require('cors');
const app = express();
// const db = require('./models');
const router = require('./router');
const mongoose = require('mongoose');
const env = require('./env');
const secrets = require('./secret');

// app.use(cors());
app.use(express.json());
app.use(router);

(async () => {
  try {
    mongoose
      .connect(env.db.APP_CONN_STR.replace('{PASSWORD', secrets.DB_PASSWORD), {
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
