const express = require('express');
const request = require('request');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3002;
const BASE_URL = 'https://beta-gen2-api.upptec.com/v1';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('You are on the homepage');
});

app.get('/search', (req, res) => {
  const options = {
    url: BASE_URL + '/search?query='+req.query.query,
    headers: {
      'Authorization': 'KVRvYWckWGttWjkyZzRrSHZwKyg5',
      'Accept': 'application/json'
    }
  }

  request.get(options, (innerError, innerRes, innerBody)=> {
    console.log(req.query);
    res.send(JSON.parse(innerBody).results);
  });
});

/* GET products-groups listing. */
app.get('/product-groups', (req, res) => {
  const options = {
    url: BASE_URL + '/product-groups',
    headers: {
      'Authorization': 'KVRvYWckWGttWjkyZzRrSHZwKyg5',
      'Accept': 'application/json'
    }
  }

  request.get(options, (innerError, innerRes, innerBody)=>  {
    let categories = new Set();

    let dataToReturn = JSON.parse(innerBody).data.map((item) => {
      if(item.type == 'product'){
        return item.category.forEach((categoryName)=> {

            categories.add(categoryName);
          });
      }
    });

    res.send([... categories]);
  });
});


/* GET product-id listing*/
app.get('/product-id', (req, res) => {

  const  options = {
    url: BASE_URL + '/product-groups',
    headers: {
      'Authorization': 'KVRvYWckWGttWjkyZzRrSHZwKyg5',
      'Accept': 'application/json'
    }
  }

  request.get(options, (innerError, innerRes, innerBody)=>  {
    let productIds = new Set();

    let dataToReturn = JSON.parse(innerBody).data.map((item) => {
      if(item.type == 'product') {
        return productIds.add(item.id);
      }
    });

    res.send([... productIds]);
  });
});

/* GET products listing*/
app.get('/products/:category', (req, res) => {

  let category = req.params.category

  const  options = {
    url: BASE_URL + '/product-groups',
    headers: {
      'Authorization': 'KVRvYWckWGttWjkyZzRrSHZwKyg5',
      'Accept': 'application/json'
    }
  }

  request.get(options, (innerError, innerRes, innerBody)=>  {
    let products = new Set();

    let dataToReturn = JSON.parse(innerBody).data.map((item) => {
      if(item.type == 'product' && item.category == category) {
        return products.add(item.name);
      }
    });

    res.send([... products]);
  });
});

app.listen(PORT, () => {
  console.log('Gulp is now running on http://localhost: ' + PORT);
});





