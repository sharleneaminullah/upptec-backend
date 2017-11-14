const express = require('express');
const request = require('request');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3002;
const BASE_URL = 'https://beta-gen2-api.upptec.com/v1';


app.get('/', (req, res) => {
  res.send('You are on the homepage');
});

app.get('/product-groups', (req, res) => {
  const options = {
    url: BASE_URL + '/product-groups',
    headers: {
      'Authorization': 'KVRvYWckWGttWjkyZzRrSHZwKyg5',
      'Accept': 'application/json'
    }
  };
  request.get(options).pipe(res);
})

app.listen(PORT, () => {
  console.log('Gulp is now running on http://localhost: ' + PORT);
});



