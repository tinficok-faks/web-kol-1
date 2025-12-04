const path = require("path");
const express = require("express");
const cors = require("cors");

const todosData = require("./todos");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let todos = [...todosData];

const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));


app.get("/api/todos", (req, res) => {
    res.json(todos);
});

app.put("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }

    const { title, when, done } = req.body;

    if (title !== undefined) todos[index].title = title;
    if (when !== undefined) todos[index].when = when;
    if (done !== undefined) todos[index].done = done;

    res.json(todos[index]);
});


app.delete("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }

    const removed = todos[index];
    todos = todos.filter(t => t.id !== id);

    res.json(removed);
});


app.use((req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
