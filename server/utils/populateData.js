const env = require('../env');
const secret = require('../secret');
const axios = require('axios');
const Beer = require('../models/beers');
const Brewery = require('../models/brewery');

const searchAndUpdate = async (searchStr, offset, limit) => {
  console.log(env);
  console.log(secret);
  try {
    const res = await axios.get(
      env.untapped.url
        .replace('{METHOD_NAME}', 'search/beer')
        .replace('{CLIENTID}', secret.API_CLIENT_ID)
        .replace('{CLIENTSECRET}', secret.API_SECRET)
        .replace('{SEARCH_TEXT}', searchStr)
        .replace('{OFFSET}', offset)
        .replace('{LIMIT}', limit),
    );
    // console.log(res)
    const beers = res.data.response.beers.items;
    // console.log(beers)
    for (b of beers) {
      beer = b.beer;
      brewery = b.brewery;
      savedBrewery = await Brewery.findOneAndUpdate(
        { brewery_id: brewery.brewery_id },
        brewery,
        { new: true, upsert: true },
      );
      console.log('Brewery Saved', savedBrewery._id);
      beer.brewery = savedBrewery._id;
      savedBeer = await Beer.findOneAndUpdate({ bid: beer.bid }, beer, {
        new: true,
        upsert: true,
      });
      console.log('Beer Saved', savedBeer._id);
    }
  } catch (err) {
    console.log('Error', err);
  }
};

module.exports = searchAndUpdate;
