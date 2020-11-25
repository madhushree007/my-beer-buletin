'use strict';

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    bid: { type:Number, required:[true, 'Beer Id is Mandatory']},
    user_name: { type: String, required: [true, 'User name is required field'] },
    review: { type: String, required: [true, 'Beer name is required field'] },
    like_count: { type: Number, default:0},
    created_at: { type: Date, default: Date.now(), select: false },
  },
  { strict: false },
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
