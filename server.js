// imports needed modules 
const express = require('express');
const path = require('path');
// makes an express app
const app = express();
// sets server port to 3001
const PORT = process.env.PORT || 3001;
// Starts the server using the 'node server.js' command 
app.listen(PORT, () => {
  console.log(`App listening at port: ${PORT}`);
});
//  middleware config that serves static files from "public", and
//  parses the json & url-encoded data
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// imports the api route
const apiRoute = require('./routes/routes.js');
app.use('/api', apiRoute);

// html route config that handles get request for /notes path
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});
// handles all other get requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

  
