const express = require('express');
const path = require('path');
const app = express();
const port = 3002;

//Returns object/key pair of extended/true
app.use(express(urlencoded( { extended:true})));
//App utilizes express.json
app,use(express.json());
//serving static assets
app.use(express.static('public'))

//incorporate notes html
app.get('/note', (req, res) => {
  res.sendFile(__dirname + 'public/notes.html');
});

//utilizes API routes
const apiRoutes = require('./routes/notes')
app.use('/api', apiRoutes);

//includes index.html
app.get('./public/index.html', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});


//If app listens, log Port message
app.listen(port, () => {
    console.log(`API server now on PORT: ${PORT}`);
  });