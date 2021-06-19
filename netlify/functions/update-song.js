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
  Update,
  Join,
  Call,
  Map: fMap,
  Function: Fn,
} = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_DEV,
});

// POST /.netlify/functions/update-song/
exports.handler = async (event, context, callback) => {
  const bodyData = JSON.parse(event.body);
  console.log(bodyData);
  if (!bodyData.currentCategory && !bodyData.currentName) {
    return {
      statusCode: 400,
      body: 'Needs at least one query paramater',
    };
  }
  const { currentCategory, newCategory, currentName, newName } = bodyData;

  return client
    .query(
      Update(Select('ref', Get(Match(Index('song_by_name'), currentName))), {
        data: {
          songName: newName || currentName,
          category: Select(
            'ref',
            Get(
              Match(Index('categories_by_name'), newCategory || currentCategory)
            )
          ),
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
