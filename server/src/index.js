const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

const { Client } = require('@elastic/elasticsearch');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});

app.get('/', async (req, res) => {
  const queryResults = await client.search({
    index: 'national-parks',
    body: req.body,
  });

  res.send(queryResults.body.hits.hits);
});

app.get('/indices', async (req, res) => {
  const queryResults = await client.cat.indices({
    format: "json",
    bytes: 'kb',
    v: true,
  });
  res.send(queryResults.body);
});

app.listen(3961, () => console.log('App running at http://localhost:3961'));
