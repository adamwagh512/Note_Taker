const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");
const notes = require("./db/db.json");

const PORT = 3002;
const app = express();

// Middleware for parsing JSON and urlencoded form data. Middleware is anything that sits between the front end and the server and accepts requests and sends responses
//middleware to make sure things are in the json format
app.use(express.json());
//middleware that informs the system we are passing variables and info through the urls, and it should pay attention to those
app.use(express.urlencoded({ extended: true }));
//middleware that informs the system that all of our public facing code lives in the public folder
app.use(express.static("public"));

// GET route for api/notes
// app.get('/api/notes', (req,res) => {
//     console.info(`${req.method} request received for notes`);
//      res.json(notes);
// })

app.get("/api/notes", (req, res) => {
  //reads the db.json file
  const test = fs.readFileSync("./db/db.json", "utf8");
  //console.log to ensure its working (it is)
  console.log(test);
  const test2 = JSON.parse(test);
  console.log(test2);
  res.json(test2);
});

app.post("/api/notes", (req, res) => {
  //logs that post request was received
  console.info(`${req.method} request received for notes`);
  //destructuring assignment for the items in req.body
  const { title, text } = req.body;
  //if all the required properties are present
  if (title && text) {
    //create a variable for the object that we will save
    const newNote = {
      title,
      text,
    };
    //obtain existing notes
    fs.readFileSync("./db/db.json", "utf8", (err, data) => {
      //logs error if there is one
      if (err) {
        console.log(err);
      } else {
        //convert string into JSON format
        const parsedNotes = JSON.parse(data);
        console.log(parsedNotes)
        //Adds a new note
        parsedNotes.push(newNote);
        console.log(newNote)
        console.log(parsedNotes)
        //writes updated notes back to file
        fs.writeFile(
          "./db/db.json",
          //stringifying the data, null means we are not using a replacer, the 4 is a space parameter, and it adds indentation
          JSON.stringify(parsedNotes, null, 4),
          //if there is a write error, console.log it, else console.info 'success
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("succesfully updated reviews")
        );
      }
    });
    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting review");
  }
});

app.delete("/api/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
});

// ********HTML ROUTES***********
// HTML home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public.index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
