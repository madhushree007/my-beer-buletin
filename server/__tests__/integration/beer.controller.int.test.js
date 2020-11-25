const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const beerIntMockData = require('../mock-data/beerIntMocks')
const Beer = require('../../models/beers')


const endpointURL = '/beers';


describe(`Integration Testing for ${endpointURL}`, () => {

  beforeEach(async () => {
    try {
      const beerDocs = beerIntMockData.map(beer => new Beer(beer));
      await Beer.collection.insertMany(beerDocs);
    } catch (err) {
      console.log(err)
    }
  })
  
  it(`GET ${endpointURL}`, async () => {
    const response = await request(app).get(endpointURL);
    expect(response.statusCode).toBe(200);
    const res = response.body;
    expect(res.status).toBe('success');
    expect(res.count).not.toBe(0);
  });

  it(`GET ${endpointURL}/:bid`, async () => {
    beer = beerIntMockData[0]
    const response = await request(app).get(endpointURL+`/${beer.bid}`);
    expect(response.statusCode).toBe(200);
    const res = response.body;
    expect(res.status).toBe('success');
    expect(res.beer.bid).toBe(beer.bid)
  });

  it(`GET ${endpointURL}/search?str=Da&page=0&limit=10`, async () => {
    beer = beerIntMockData[0]
    const response = await request(app).get(endpointURL+'/search?str=js&page=0&limit=10');
    expect(response.statusCode).toBe(200);
    const res = response.body;
    expect(res.status).toBe('success');
    expect(res.count).not.toBe(0);
    expect(res.data.beers.length).not.toBe(0);
    // console.log(response.body)
  });

  afterEach(async function () {
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
      await collection.remove()
    }
  })

});


