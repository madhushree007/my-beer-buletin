const BeerController = require('../../controllers/beers');
const BeerModel = require('../../models/beers');
const httpMocks = require('node-mocks-http');
const mockBeers = require('../mock-data/beer-list.json');

BeerModel.find = jest.fn();
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
  it('Should call find and return a status code of 200', () => {
    // console.log(mockBeers);
    let beersList = [];
    BeerModel.find.mockReturnValue(new Promise(() => mockBeers));
    BeerController.getBeers(req, res, next);

    expect(BeerModel.find).toBeCalled();
    expect(res.statusCode).toBe(200);
    // console.log(beersList);
    // expect(res._isEndCalled()).toBeTruthy();
    // expect(res._getJSONData()).toBe(mockBeers);
  });
});
