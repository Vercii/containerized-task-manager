const express = require("express");
const pool = require("./db");

const app = express();
const PORT = 3000;

let tasks = [];

app.use(express.json());

// Routes
// GET
app.get("/", (req, res) => {
    res.send("Task Manager is running!");
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// POST
app.post("/tasks", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// PUT (UPDATING)
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.completed = req.body.completed;

    res.json(task);
});

// DELETE
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const taskExists = tasks.some(task => task.id === id);

    if (!taskExists) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks = tasks.filter(task => task.id !== id);

    res.json({
        message: "Task deleted"
    });
});

// TEMPORARY: TEST DB CONNECTION
pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log(result.rows);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
