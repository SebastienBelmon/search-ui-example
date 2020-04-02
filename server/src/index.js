// importation des packages / middleware
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

const { Client } = require('@elastic/elasticsearch');

// initialisation des packages
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// création d'une instance client d'elasticsearch
const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});

// accepte requete http GET pour query une recherche
// sur l'index national-parks
app.get('/national-parks', async (req, res) => {
  // le body de la requete doit etre un JSON, il faut donc bien
  // penser à mettre -H "Content-Type: application/json" dans la
  // requete cURL
  const queryResults = await client.search({
    index: 'national-parks',
    body: req.body,
  });

  // on renvoie seulement les résultats de la recherche, pas de méta données
  res.send(queryResults.body.hits.hits);
});


// requete pour avoir des infos sur les indexes d'elasticsearch
app.get('/indices', async (req, res) => {
  const queryResults = await client.cat.indices({
    format: "json",
    bytes: 'kb',
    v: true,
  });
  res.send(queryResults.body);
});

// écoute serveur sur le port local 3961
app.listen(3961, () => console.log('App running at http://localhost:3961'));
