const request = require('supertest');
const app = require('../../app');

const endpointURL = '/beers';

describe(`Integration Testing for ${endpointURL}`, () => {
  it(`GET ${endpointURL}`, async () => {
    const response = await request(app).get(endpointURL);
    expect(response.statusCode).toBe(200);
  });
});
