let db = require("../db/db.json");
const express = require("express");
const path = require("path");
const fs = require("fs");

getMaxID = (notes) => {
  return notes[0].current_id;
}

let id = {current_id:getMaxID(db)};

module.exports = function(app) {

  app.use(express.json());
  app.use(express.static(path.join(__dirname, '../')))

  // GET read the `db.json` file and return all saved notes as JSON
  app.get("/api/notes", function(req, res) {
    console.log(db);
    res.json(db.slice(1));
    });

  // POST receive a new note to save on the request body, add it to the `db.json` file
  app.post("/api/notes", function(req, res) {
    id.current_id++; 
    req.body.id = id.current_id; 
    console.log(req.body);
    db.push(req.body);
    db[0].current_id++
    fs.appendFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), 'utf8', (err) => {
      if (err) throw err;
      else console.log("file written successfully");
    });
    console.log(db);
    res.json(db.slice(1));
  });

}