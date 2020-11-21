'use strict';

const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema(
  {
    bid: {
      type: Number,
      required: [true, 'bid is refernce key and mandatory'],
    },
    beer_name: { type: String, required: [true, 'Beer name is required fied'] },
    beer_label: { type: String, required: [true, 'Label is manadatory'] },
    beer_abv: Number,
    beer_ibu: Number,
    beer_description: String,
    created_at: { type: Date, default: Date.now(), select: false },
    beer_style: String,
    auth_rating: { type: Number, default: 0 },
    in_production: Number,
    brewery: { type: mongoose.Schema.ObjectId, ref: 'Brewery' },
  },
  { strict: false },
);

const Beer = mongoose.model('Beer', beerSchema);
module.exports = Beer;
