const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo.model");

router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.post("/", async (req, res) => {
  const { todo, desc } = req.body;
  const newTodo = new Todo({ todo, desc });
  await newTodo.save();
  res.status(201).json(newTodo);
});

router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
