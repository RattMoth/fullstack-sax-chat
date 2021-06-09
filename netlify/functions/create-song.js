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

// POST /.netlify/functions/create-song?category=Disney&name=Be+Our+Guest
exports.handler = async (event, context, callback) => {
  if (
    !event.queryStringParameters.category ||
    !event.queryStringParameters.name
  ) {
    return {
      statusCode: 400,
      body: 'Missing query parameter',
    };
  }
  const { category, name } = event.queryStringParameters;

  return client
    .query(
      Create(Collection('Songs'), {
        data: {
          songName: name,
          category: Select(
            'ref',
            Get(Match(Index('categories_by_name'), category))
          ),
          isSelected: false,
        },
      })
    )
    .then((response) => {
      const newSong = response.data;
      // console.log('Songs in queried category', song);
      // console.log(`${.length} songs found`);
      console.log('Create response: ', response);

      return {
        statusCode: 201,
        body: JSON.stringify(newSong),
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
