const BASE_URL = 'http://localhost:3000';
const SEARCH_URL = 'http://localhost:3000/beers/search?str=me&page=a&limit=b';
export function getBeers() {
  return fetch(`${BASE_URL}/beers`).then(res => res.json());
}
export function getBeerByID(id) {
  return fetch(`${BASE_URL}/beers/${id}`).then(res => res.json());
}

export function searchBeerByName(str) {
  return fetch(`${BASE_URL}/beers/search?str=${str}&page=0&limit=10`).then(res => res.json());
}

export function getBeerReview(bid) {
  return fetch(`${BASE_URL}/reviews/${bid}`).then(res => res.json());
}

export function postBeerReview({bid, username, body}) {
  return fetch(`${BASE_URL}/reviews`, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
    });
  }