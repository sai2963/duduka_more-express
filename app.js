const express = require('express');
const path = require('path');
const fs= require('fs')



const app = express();
app.set('views',path.join(__dirname,'frontend'));
app.set('view engine','ejs');
// Serve the files in the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Route for serving the index.html file
app.get('/index', (req, res) => {
  res.render(path.join(__dirname, 'frontend', 'index'));
});
app.get('/share', (req, res) => {
  res.render(path.join(__dirname, 'frontend', 'form'));
});
app.get('/confirm', (req, res) => {
  res.render(path.join(__dirname, 'frontend', 'confirm'));
});
app.post('/share', function(req, res) {
  const restaurant = req.body;
  const filepath = path.join(__dirname, 'data', 'restaurants.json');
  let fileData = fs.readFileSync(filepath);
  let storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);
  fs.writeFileSync(filepath, JSON.stringify(storedRestaurants));
  res.redirect('/confirm');
});

app.get('/restaurant', (req, res) => {
  res.render(path.join(__dirname, 'frontend', 'restaurant'),{X:2});
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
