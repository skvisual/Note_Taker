//DECLARE DEPENDENCIES
var http = require("http");
var fs = require('fs');
var path = require('path');
var express = require('express');
// var notesDB = require('./db/db.json');

var data = fs.readFileSync('./db/db.json', "utf8");

var notesDB = JSON.parse(data);

var finalNotesDB = Object.keys(notesDB).map(i => notesDB[i])

// Instantiate a new express app utilizing the express() method.
var app = express();
// const notesDB = [];

//Decleare a port number for the server to find the application.
var PORT = 8080;

// Middleware to handle parsing of the request string and converts to a json object. Later referred to as req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//////////////////////// HTML ROUTES ////////////////////////////   
    // Return the index page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
    
// Return the notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


// Create API get routes
    //set up the notes
app.get("/api/notes", function(req, res) {
    //response to access notesDB variable in order to send to response.
    res.json(finalNotesDB);
});

// Create the API POST routes
app.post('/api/notes', function(req, res) {
   
  //assigns req.body to a variable
  // const newNote = req.body;

  notesDB.push(req.body);

  fs.writeFile('./db/db.json', JSON.stringify(notesDB) + '\n', (err) => {
    if (err){
      console.log('ERROR: Could not add note to database!')
    }
  });
  res.json(finalNotesDB);
});

// Create the API delete routes


app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});


//Turns our server on
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});