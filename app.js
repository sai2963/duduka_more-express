const express = require('express');
const app = express();
const path = require('path');
const fs= require('fs')




app.set('views',path.join(__dirname,'frontend'));
app.set('view engine','ejs');
// Serve the files in the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Route for serving the index.html file
app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'frontend', 'index'));
});

app.get('/share', (req, res) => {
  res.render(path.join(__dirname, 'frontend', 'form'));
});
app.get('/confirm', (req, res) => {
  res.render(path.join(__dirname, 'frontend', 'confirm'));
});

app.post('/share',function(req,res){
  const restaurant = req.body;
  const filepath=path.join(__dirname,'data','restaurants.json');
  const fileData=fs.readFileSync(filepath);
  const storedRestaurants=JSON.parse(fileData);
  storedRestaurants.push(restaurant);
  fs.writeFileSync(filepath,JSON.stringify(storedRestaurants));
  res.redirect('/confirm');
});

app.get('/restaurant', (req, res) => {
  const filepath=path.join(__dirname,'data','restaurants.json');
  const fileData=fs.readFileSync(filepath);
  const storedRestaurants=JSON.parse(fileData);
  res.render(path.join(__dirname, 'frontend', 'restaurant'),{X:storedRestaurants.length});
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});