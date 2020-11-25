var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose')
const RevieController = require('../../controllers/reviews');

const ReviewModel = require('../../models/review');
const httpMocks = require('node-mocks-http');
const reviewMock = require('../mock-data/review-db-mock.json');
const reviewMockResponse = require('../mock-data/review-res-mock.json');
const reviewMocks = require('../mock-data/reviewMock');
const Review = require('../../models/review');

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('RevieController methods check', () => {
  it('Should have getReviewsForBeer Function', () => {
    expect(typeof RevieController.getReviewsForBeer).toBe('function');
  });
  it('Should have postReview Function', () => {
    expect(typeof RevieController.postReview).toBe('function');
  });
  it('Should have upDownVote Function', () => {
    expect(typeof RevieController.upDownVote).toBe('function');
  });
});

describe('ReviewController getReviewsForBeer unit test', () => {
  beforeEach(() => {
    // Set common code for the group here
  });
  it('Should call find, return a status code of 200 and an ooject list', async () => {
    req.params.bid = 3
    const expectations = sinon.mock(ReviewModel)
      .expects('find')
      .chain('sort')
      .withArgs('-created_at')
      .chain('exec')
      .resolves(reviewMock);

    await RevieController.getReviewsForBeer(req, res, next);
    
    expectations.once();
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(reviewMockResponse);
  }, 10000);
});

describe('ReviewController upDownVote unit testing', () => {
  beforeEach(() => {
    // RevieController.
  });
  it('Should call upDownVote providing a reviewid and get a valid review response', async () => {
    //Create a Jest mock
    ReviewModel.findOneAndUpdate = jest.fn();
    ReviewModel.findOneAndUpdate.mockReturnValue(reviewMocks.reviewUpVoteDbMockRes);
    req.params.reviewId = '5fbd4336b4c24e042a9afd3b';
    req.params.direction = 'up';
    await RevieController.upDownVote(req, res, next);

    expect(ReviewModel.findOneAndUpdate).toBeCalled();
    expect(ReviewModel.findOneAndUpdate).toHaveBeenCalledWith(
      {_id:'5fbd4336b4c24e042a9afd3b'}, 
      {$inc:{like_count:1}}, 
      {new: true}
    );
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getData()).toStrictEqual(reviewMocks.reviewUpVoteDbMockRes);
  });

  it('Should call upDownVote providing a reviewid and get a valid review response', async () => {

    ReviewModel.findOneAndUpdate = jest.fn();
    req.params.reviewId = '5fbd4336b4c24e042a9afd3b';
    req.params.direction = 'upd';
    await RevieController.upDownVote(req, res, next);

    expect(ReviewModel.findOneAndUpdate).not.toBeCalled();
    expect(next).toHaveBeenCalledWith(new Error(`invalid direction: ${req.params.direction}`));

  });

  it('Should be able to post a new review and get a valid response', async () => {
    ReviewModel.create = jest.fn();
    ReviewModel.create.mockReturnValue(reviewMocks.reviewPostResMock);

    req.body = reviewMocks.reviewPostReqMock

    await RevieController.postReview(req, res, next);

    expect(ReviewModel.create).toHaveBeenCalledWith(
      req.body
    );    

    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getData()).toStrictEqual(reviewMocks.reviewPostResMock);
  });

  it('Should return error when body is undefined', async () => {
    ReviewModel.create = jest.fn();
    ReviewModel.create.mockReturnValue(reviewMocks.reviewPostResMock);

    req.body = undefined;
    await RevieController.postReview(req, res, next);

    expect(ReviewModel.create).not.toBeCalled();
    expect(next).toHaveBeenCalledWith(new Error('No review content to save'));

  });
});
