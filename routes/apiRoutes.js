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

  // API Route | 'GET' request
  app.get("/api/notes", function(req, res) {
    console.log(db);
    res.json(db.slice(1));
    });

  // API Route | 'POST' request 
  app.post("/api/notes", function(req, res) {
    id.current_id++; 
    req.body.id = id.current_id; 
    db.push(req.body);
    db[0].current_id++
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), 'utf8', (err) => {
      if (err) throw err;
      else console.log("file written successfully");
    });
    console.log(db);
    res.json(db.slice(1));
  });

  
  // API Route | 'DELETE' request
  app.delete("/api/notes/:id", function(req, res) {

    db = db.filter(note => note.id != req.params.id);
    console.log(req.params.id);
    
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), 'utf8', (err) => {
      if (err) throw err;
      else console.log("file updated");
    });
    console.log(db);
    res.json(db.slice(1));
  });
}