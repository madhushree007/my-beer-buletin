'use strict';
const router = require('express').Router();
const beer = require('./controllers/beers');
const review = require('./controllers/reviews');

router.get('/beers/search', beer.getBeersByName);
router.get('/beers/:id', beer.getBeerById);
router.get('/beers/', beer.getBeers);
router.get('/reviews/:bid', review.getReviewsForBeer);
router.post('/reviews/', review.postReview);
router.get('/reviews/:reviewId/:direction', review.upDownVote);
router.get('/', (req, res) => res.status(200).send('OK'));

module.exports = router;
