const express = require('express');
const path = require('path');
const app = express();
const port = 3002;

//serving static assets
app.use(express.static('public'))
//app.get('/api/notation', (req, res) => {
  //  res.sendFile(path.join(__dirname, 'index.html'));
  //});
console.log(path.join(__dirname, 'index.html'));
app.listen(port, () => {
    console.log(`API server now on port 3002!`);
  });