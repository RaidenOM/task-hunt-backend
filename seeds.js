const mongoose = require("mongoose");
const Todo = require("./models/todo"); // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/task_hunt");

const sampleTodos = [
  { title: "Buy groceries", description: "Milk, Bread, Cheese" },
  { title: "Walk the dog", description: "Take the dog for a walk in the park" },
  { title: "Complete project", description: "Finish the React Native app" },
  { title: "Read a book", description: "Read 'The Great Gatsby'" },
];

// Seed function
async function seedDatabase() {
  await Todo.deleteMany({}); // Clear existing todos
  await Todo.insertMany(sampleTodos); // Insert sample todos
  mongoose.connection.close(); // Close the connection
}

// Run the seed function
seedDatabase();
