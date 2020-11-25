const rewire = require('rewire');
const RevieController = require('../../controllers/reviews');

const ReviewModel = require('../../models/beers');
const httpMocks = require('node-mocks-http');
const reviewMock = require('../mock-data/review-db-mock.json');
const reviewMockResponse = require('../mock-data/review-res-mock.json');


ReviewModel.find = jest.fn();
jest.mock('../../utils/populateData');
let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
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
  it.only('Should call find, return a status code of 200 and an ooject list', async () => {
    req.params.bid = 3
    ReviewModel.find.mockReturnValue(reviewMock);
    await RevieController.getReviewsForBeer(req, res, next);

    expect(ReviewModel.find).toBeCalled();
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    // This does not work as the reference are not same
    // expect(res._getJSONData()).toBe(reviewMockResponse);
    // Strict equals to compare object equality not memory ref
    expect(res._getJSONData()).toStrictEqual(reviewMockResponse);
  }, 5000);
});

// describe('ReviewController upDownVote unit testing', () => {
//   beforeEach(() => {
//     // RevieController.
//   });
//   it('Should call upDownVote providing a searchString and get a list of beers', async () => {
//     //Create a Jest mock
//     const searchBeersInDBMock = jest.fn();
//     searchBeersInDBMock.mockReturnValue(reviewMockResponse);
//     // Mock the API call
//     searchAndUpdate.mockResolvedValue(null);
//     // Set the private function mock
//     RewiredRevieController.__set__('searchBeersInDb', searchBeersInDBMock);
//     // Set query param mocks
//     const searchStr = 'searchstring';
//     req.query.str = searchStr;

//     await RewiredRevieController.upDownVote(req, res);
//     expect(searchBeersInDBMock).toHaveBeenCalledWith(searchStr, 0, 50);
//     expect(res.statusCode).toBe(200);
//     expect(res._isEndCalled()).toBeTruthy();
//     expect(res._getJSONData()).toMatchSnapshot();
//   });
// });
