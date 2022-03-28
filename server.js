const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const app = express();
const PORT = 3000;

//Returns object/key pair of extended/true
app.use(express.urlencoded({ extended: true }));
//App utilizes express.json
app.use(express.json());
//serving static assets
app.use(express.static('public'));

function createNewNote(body, notesArray) {
  console.log(body);
  // our function's main code will go here!

  // return finished code to post route for response
  return body;
}


//incorporate notes html
app.get('/note', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

//utilizes API routes
//const apiRoutes = require('./routes/notes')
//app.use('/api', apiRoutes);
function createNewNote(body, notesArray) {
  const notes = body;
  notesArray.push(notes);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return notes;
}

//includes index.html
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

//app.post('/note', (req, res) => {
 // res.
//
app.post('/note', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  res.json(req.body);
});

//app.delete

//If app listens, log Port message
app.listen(PORT, () => {
    console.log(`API server now on PORT: ${PORT}`);
  });