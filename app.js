const express = require("express");

const app = express();
const PORT = 3000;

let tasks = [
    {
        id: 1,
        title: "Learn Docker",
        completed: false
    }
];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Task Manager is running!");
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
