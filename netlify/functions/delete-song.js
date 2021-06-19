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
  Delete,
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
  if (!bodyData.songToDelete) {
    return {
      statusCode: 400,
      body: 'Missing query paramater',
    };
  }
  const { songToDelete } = bodyData;

  return client
    .query(
      Delete(Select('ref', Get(Match(Index('song_by_name'), songToDelete))))
    )
    .then((response) => {
      const deletedSong = response.data.songName;
      console.log('Delete response: ', response);

      return {
        statusCode: 201,
        body: JSON.stringify(deletedSong),
      };
    })
    .catch((error) => {
      if (error.description === 'instance not found') {
        return {
          statusCode: 404,
          body: 'Song with that name was not found.',
        };
      }
      console.log('error', error);
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
