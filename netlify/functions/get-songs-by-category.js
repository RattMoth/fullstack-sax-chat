/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const faunadb = require('faunadb');
require('dotenv').config();

const {
  Ref,
  Paginate,
  Get,
  Match,
  Select,
  Index,
  Create,
  Collection,
  Join,
  Call,
  Map: fMap,
  Function: Fn,
} = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_DEV,
});

// GET /.netlify/functions/get-songs-by-category?category=Disney
exports.handler = async (event, context, callback) => {
  if (!event.queryStringParameters.category) {
    return {
      statusCode: 400,
      body: 'Missing query parameter',
    };
  }
  const { category } = event.queryStringParameters;
  console.log('event: ', event);
  console.log('context: ', context);
  console.log('callback: ', callback);
  const { identity, user } = context.clientContext;
  console.log('identity: ', identity);
  console.log('user', user);
  return client
    .query(
      Paginate(
        Match(
          Index('songs_by_category'),
          Select('ref', Get(Match(Index('categories_by_name'), category)))
        )
      )
    )
    .then((response) => {
      const songsInCategory = response.data;
      console.log('Songs in queried category', songsInCategory);
      console.log(`${songsInCategory.length} songs found`);

      return {
        statusCode: 200,
        body: JSON.stringify(songsInCategory),
      };
    })
    .catch((error) => {
      console.log('error', error);
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
