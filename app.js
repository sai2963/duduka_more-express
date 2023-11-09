const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'frontend'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/share', (req, res) => {
  res.render('form');
});

app.get('/confirm', (req, res) => {
  res.render('confirm');
});

app.post('/share', function (req, res) {
  const restaurant = req.body;
  const filepath = path.join(__dirname, 'data', 'restaurants.json');
  const fileData = fs.readFileSync(filepath);
  const storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);
  fs.writeFileSync(filepath, JSON.stringify(storedRestaurants));
  res.redirect('/confirm');
});

app.get('/restaurant', (req, res) => {
  const filepath = path.join(__dirname, 'data', 'restaurants.json');
  const fileData = fs.readFileSync(filepath);
  const storedRestaurants = JSON.parse(fileData);
  res.render('restaurant', { X: storedRestaurants.length, restaurants: storedRestaurants });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
