const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Todo = require("./models/todo");

mongoose
  .connect("mongodb://127.0.0.1:27017/task_hunt")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.log("Error connecting to Database");
  });

app.use(express.json());

//TODO Routes
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

app.get("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.json(todo);
});

app.post("/api/todos", async (req, res) => {
  const { title, description } = req.body.todo;
  const todo = new Todo({ title, description });
  await todo.save();
  res.json(todo);
});

app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
});

app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body.todo;
  const todo = await Todo.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );
  res.json(todo);
});

app.listen(3000, () => {
  console.log("Server running on PORT: 3000");
});
