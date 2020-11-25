const stage = process.env.NODE_ENV || 'dev';
const env = require(`./config/env.${stage}.js`);
const app = require('./app');

console.log(env.server.PORT)
app.listen(env.server.PORT, () => {
  console.log('Listening................PORT:' + env.server.PORT);
});

