const Beer = require('../models/beers');
const searchAndUpdate = require('../utils/populateData');

exports.getBeers = async (req, res, next) => {
  try {
    const beers = await Beer.find();
    res
      .status(200)
      .json({ status: 'success', count: beers.length, data: { beers } });
  } catch (err) {
    console.log('error', err); // eslint-disable-line no-console
    res.status(500);
  }
};

exports.getBeerById = async (req, res, next) => {
  const beerId = req.params.id;
  try {
    if (beerId.trim() === '') throw new Error('Beer Id cannot be empty');
    const beer = await Beer.find({ bid: beerId });
    if (beer.length) {
      res.status(200).json({ status: 'success', beer: beer[0] });
    } else {
      res
        .status(200)
        .json({ status: 'fail', msg: `No Data found for beerId:${beerId}` });
    }
  } catch (err) {
    console.log('error', err); // eslint-disable-line no-console
    res.status(500);
  }
};

// path:/beers/search?str=string&limit=50&page=0
exports.getBeersByName = async (req, res) => {
  const searchStr = req.query.str;
  const page = Number(req.query.page) || 0;
  const limit = Number(req.query.limit) || 50;
  // const rx = new RegExp(searchStr, 'ig');
  try {
    if (searchStr.trim() === '') throw new Error('Empty Search String');
    let beers = await searchBeersInDb(searchStr, page, limit);
    if (beers.length < limit) {
      await searchAndUpdate(searchStr, page+1, limit);
      beers = await searchBeersInDb(searchStr, page, limit);
    }
      res
        .status(200)
        .json({ status: 'success', count: beers.length, data: { beers } });
  } catch (err) {
    console.log('error', err); // eslint-disable-line no-console
    res.status(500).json(err);
  }
};

const searchBeersInDb = async (searchStr, page, limit) => {
  const rx = new RegExp(searchStr, 'ig');
  const beers = await Beer.find({ beer_name: rx })
      .populate('brewery')
      .limit(limit)
      .skip(page * limit)
      .sort({ beer_name: 'asc' });
  return beers;
}

exports.postBeers = async (req, res) => {
  try {
    const beersBody = req.body;
    const newBeers = await db.Beer.bulkCreate(beersBody, { returning: true });
    res.status(201);
    res.send(newBeers);
  } catch (e) {
    console.log('e', e); // eslint-disable-line no-console
    res.status(500);
  }
};
