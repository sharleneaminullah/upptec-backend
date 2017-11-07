const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3002;

const productRouter = express.Router();


productRouter.route('/Products')
  .get(function(req, res) {
    let responseJson = {hello: "THis is my API"};
    res.json(responseJson);
  });

app.use('/api', productRouter);

app.get('/', (req, res) => {
  res.send('You are on the homepage');
});

app.listen(port, () => {
  console.log('Gulp is now running on http://localhost: ' + port);
});


