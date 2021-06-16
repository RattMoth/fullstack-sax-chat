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

// POST /.netlify/functions/create-song/
exports.handler = async (event, context, callback) => {
  const bodyData = JSON.parse(event.body);
  if (!bodyData.category || !bodyData.name) {
    return {
      statusCode: 400,
      body: 'Missing query parameter',
    };
  }
  const { category, name } = bodyData;

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
      const newSong = response.data.songName;
      console.log('Create response: ', response);

      return {
        statusCode: 201,
        body: JSON.stringify(newSong),
      };
    })
    .catch((error) => {
      if (error.description === 'document is not unique.') {
        return {
          statusCode: 400,
          body: 'Duplicate entry not allowed.',
        };
      }
      console.log('error', error);
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
