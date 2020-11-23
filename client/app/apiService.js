const BASE_URL = 'http://192.168.1.14:3000/beers';
const SEARCH_URL = 'http://localhost:3000/beers/search?str=me&page=a&limit=b';
export function getBeers() {
  return fetch(BASE_URL).then(res => res.json());
}
