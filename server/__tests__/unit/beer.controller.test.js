const rewire = require('rewire');
const BeerController = require('../../controllers/beers');
// Use Rewire to mock private unexported methods and variables
// https://www.samanthaming.com/journal/2-testing-non-exported-functions/
const RewiredBeerController = rewire('../../controllers/beers');
const BeerModel = require('../../models/beers');
const httpMocks = require('node-mocks-http');
const beersMock = require('../mock-data/beer-list-input-mock.json');
const beersMockResponse = require('../mock-data/beer-list-response.json');
const searchAndUpdate = require('../../utils/populateData');

BeerModel.find = jest.fn();
jest.mock('../../utils/populateData');
let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('BeerController methods check', () => {
  it('Should have getBeers Function', () => {
    expect(typeof BeerController.getBeers).toBe('function');
  });
  it('Should have getBeerById Function', () => {
    expect(typeof BeerController.getBeerById).toBe('function');
  });
  it('Should have getBeersByName Function', () => {
    expect(typeof BeerController.getBeersByName).toBe('function');
  });
});

describe('Beercontroller getBeers unit test', () => {
  beforeEach(() => {
    // Set common code for the group here
  });
  it('Should call find, return a status code of 200 and an ooject list', async () => {
    // console.log(beersMock);
    BeerModel.find.mockReturnValue(beersMock);
    await BeerController.getBeers(req, res, next);

    expect(BeerModel.find).toBeCalled();
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    // This does not work as the reference are not same
    // expect(res._getJSONData()).toBe(beersMockResponse);
    // Strict equals to compare object equality not memory ref
    expect(res._getJSONData()).toStrictEqual(beersMockResponse);
  }, 5000);
});

describe('Beercontroller getBeersByName unit testing', () => {
  beforeEach(() => {
    // BeerController.
  });
  it('Should call getBeersByName providing a searchString and get a list of beers', async () => {
    //Create a Jest mock
    const searchBeersInDBMock = jest.fn();
    searchBeersInDBMock.mockReturnValue(beersMockResponse);
    // Mock the API call
    searchAndUpdate.mockResolvedValue(null);
    // Set the private function mock
    RewiredBeerController.__set__('searchBeersInDb', searchBeersInDBMock);
    // Set query param mocks
    const searchStr = 'searchstring';
    req.query.str = searchStr;

    await RewiredBeerController.getBeersByName(req, res);
    expect(searchBeersInDBMock).toHaveBeenCalledWith(searchStr, 0, 50);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toMatchSnapshot();
  });
});
