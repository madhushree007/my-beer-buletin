'use strict';
const mongoose = require('mongoose');

const brewerySchema = new mongoose.Schema(
  {
    brewery_id: {
      type: Number,
      required: [true, 'bid is refernce key and mandatory'],
    },
    brewery_name: {
      type: String,
      required: [true, 'Beer name is required fied'],
    },
    brewery_slug: String,
    brewery_page_url: String,
    brewery_type: String,
    brewery_label: String,
    country_name: String,
    contact: {
      twitter: String,
      facebook: String,
      instagram: String,
      url: String,
    },
    location: {
      brewery_city: String,
      brewery_state: String,
      lat: Number,
      lng: Number,
    },
    brewery_active: Number,
  },
  { strict: false },
);

const Beer = mongoose.model('Brewery', brewerySchema);
module.exports = Beer;
