const express = require('express');
const path = require('path');

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
app.get('/restaurant', (req, res) => {
  res.render(path.join(__dirname, 'frontend', 'restaurant'));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
