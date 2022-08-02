const express = require ('express');
const fs = require('fs');
const path = require('path');
const util = require('util');
 
 
const PORT = 3002;
const app = express();
 
// Middleware for parsing JSON and urlencoded form data. Middleware is anything that sits between the front end and the server and accepts requests and sends responses
//middleware to make sure things are in the json format
app.use(express.json());
//middleware that informs the system we are passing variables and info through the urls, and it should pay attention to those
app.use(express.urlencoded({ extended: true }));
//middleware that informs the system that all of our public facing code lives in the public folder
app.use(express.static('public'));

// HTML home route
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public.index.html'))
})
// HTML notes route
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
