/* eslint-disable no-restricted-syntax */
const faunadb = require('faunadb');
require('dotenv').config();

const songs = [];

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_DEV,
});

const { Get, Match, Select, Index, Create, Collection } = faunadb.query;

const category = 'Disney';

// map to avoid (help?) with async calls
const requests = songs.map(async (song) =>
  client.query(
    Create(Collection('Songs'), {
      data: {
        songName: song,
        category: Select(
          'ref',
          Get(Match(Index('categories_by_name'), category))
        ),
        isSelected: false,
      },
    })
  )
);

// for (const song of songs) {
//   client.query(
//     Create(Collection('Songs'), {
//       data: {
//         songName: song,
//         category: Select(
//           'ref',
//           Get(Match(Index('categories_by_name'), category))
//         ),
//         isSelected: false,
//       },
//     })
//   );
// }
