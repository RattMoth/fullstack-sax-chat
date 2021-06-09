/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const faunadb = require('faunadb');
require('dotenv').config();

const { Create, Collection } = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_DEV,
});

// POST .netlify/functions/create-category?category=TV+and+Movies
exports.handler = async (event, context, callback) => {
  if (!event.queryStringParameters.category) {
    return {
      statusCode: 400,
      body: 'Missing query parameter',
    };
  }
  const { category } = event.queryStringParameters;

  return client
    .query(
      Create(Collection('Categories'), {
        data: {
          categoryName: category,
        },
      })
    )
    .then((response) => {
      const newCategory = response.data;
      console.log('Create response: ', response);

      return {
        statusCode: 201,
        body: JSON.stringify(newCategory),
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
