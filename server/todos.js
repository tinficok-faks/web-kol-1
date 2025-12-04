const { v4: uuidv4 } = require("uuid");

const todos = [
  { title: "Buy groceries", timestamp: 1764845228329, done: true },
  { title: "Email client", timestamp: 1764845228329, done: true },
  { title: "Clean desk", timestamp: 1764931675258, done: false },
  { title: "Pay bills", timestamp: 1765104490843, done: false },
  { title: "Read 20 pages", timestamp: 1765018057945, done: false },
  { title: "Workout", timestamp: 1765104490843, done: true },
  { title: "Plan weekly tasks", timestamp: 1764845228329, done: true },
  { title: "Water plants", timestamp: 1765018057945, done: false },
  { title: "Review code", timestamp: 1764931675258, done: false }
];

const expTodos = todos.map(todo => ({
  ...todo,
  id: uuidv4(),
}));

module.exports = expTodos;