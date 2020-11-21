const db = {
  COMPASS_CONN_STR:
    'mongodb+srv://aaluni:{PASSWORD}@cluster0.4qfk7.mongodb.net/test',
  APP_CONN_STR:
    'mongodb+srv://aaluni:Pa55w*rd@cluster0.4qfk7.mongodb.net/beerb?retryWrites=true&w=majority',
};

const server = {
  PORT: 3000,
};

const untapped = {
  url:
    'https://api.untappd.com/v4/{METHOD_NAME}?client_id={CLIENTID}&client_secret={CLIENTSECRET}&q={SEARCH_TEXT}&limit={LIMIT}&offset={OFFSET}',
};

module.exports = { db, untapped, server };
