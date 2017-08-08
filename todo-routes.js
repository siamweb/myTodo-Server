
var express = require('express');
 
var app = module.exports = express.Router();
 
var Todo = require('./todo');
 
// POST
// Create a new Todo
app.post('/todos', function (req, res) {
  if (!req.body.text) {
    return res.status(400).send({ "success": false, "msg": "You need to send the text of the todo!" });
  }
 
  var newTodo = new Todo({
    text: req.body.text
  });
 
  newTodo.save(function (err) {
    if (err) {
      console.log("some error: ", err);
      return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
    }
    res.status(201).send({ "success": true, "msg": 'Successful created new Todo.' });
  });
});
 
// GET
// Get all open Todos
app.get('/todos', function (req, res) {
  Todo.find({}, function (err, todos) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
    }
 
    res.status(200).send({ "success": true, "result": todos });
  });
});
 
// DELETE
// Remove one todo by its ID
app.delete('/todos/:todoId', function (req, res) {
  var lectionId = req.params.todoId;
  if (!lectionId || lectionId === "") {
    return res.json({ "success": false, "msg": "You need to send the ID of the Todo", "error": err });
  }
 
  Todo.findByIdAndRemove(lectionId, function (err, removed) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while deleting Todo", "error": err });
    }
    res.status(200).json({ "success": true, "msg": "Todo deleted" });
  });
});