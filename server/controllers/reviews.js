const Review = require('../models/review');
const searchAndUpdate = require('../utils/populateData');

// path:/reviews/:bid
exports.getReviewsForBeer = async (req, res, next) => {
  const beerId = req.params.bid;
  try {
    if (!beerId) throw new Error('No beer id provided to get the review for')
    const reviews = await Review.find({bid:beerId}).sort([['created_at', -1]]);
    res
      .status(200)
      .json({ status: 'success', count: reviews.length, data: { reviews } });
  } catch (err) {
    // console.log('error', err); // eslint-disable-line no-console
    // res.status(500).json({ status: 'fail', error: err.message });
    next(err)
  }
};

exports.postReview = async (req, res, next) => {
  try {
    const reviewsBody = req.body;
    if (!reviewsBody) throw new Error('No review content to save')
    const newReviews = await Review.create(reviewsBody);
    res.status(201);
    res.send(newReviews);
  } catch (err) {
    // console.log('e', err); // eslint-disable-line no-console
    // res.status(500).json({ status: 'fail', error: err.message });
    next(err)
  }
};

// path:/reviews/:reviewId/:direction
exports.upDownVote = async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const direction = req.params.direction;
  const inc = (direction === 'up') ? 1 : -1;
  try {
    if (!reviewId || !direction) throw new Error('Review Id or direction missing')
    if (!((direction === 'up') || (direction === 'down'))) throw new Error(`invalid direction: ${direction}`)
    const review = await Review.findOneAndUpdate({_id:reviewId}, {$inc:{like_count:inc}}, {new: true})
    // res.status(500)
    // res.send({status:fail,  error: err.message});
    res.status(201);
    res.send(review);
  } catch (err) {
    console.log('e', err); // eslint-disable-line no-console
    next(err)
    // res.status(500)
    // res.send({status:fail,  error: err.message});
  }
};
