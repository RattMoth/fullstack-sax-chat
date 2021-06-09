/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const faunadb = require('faunadb');
require('dotenv').config();

const {
  Ref,
  Paginate,
  Documents,
  Get,
  Match,
  Select,
  Index,
  Create,
  Collection,
  Join,
  Call,
  Lambda,
  Var,
  Map: fMap,
  Function: Fn,
} = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_DEV,
});

// GET /.netlify/functions/get-songs-by-category.js?category=Disney
exports.handler = async (event, context, callback) =>
  client
    .query(Paginate(Match(Index('all_categories'))))
    .then((response) => {
      const categories = response.data;
      console.log('Songs in queried category', categories);
      console.log(`${categories.length} songs found`);

      return {
        statusCode: 200,
        body: JSON.stringify(categories),
      };
    })
    .catch((error) => {
      console.log('error', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
