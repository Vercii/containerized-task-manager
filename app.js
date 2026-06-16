const express = require("express");
const pool = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());

// TEST DB CONNECTION
pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.error("DB connection error:", err);
    } else {
        console.log("DB connected:", result.rows);
    }
});

// GET
app.get("/tasks", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id ASC"
        );

        res.json(result.rows);
    } catch (err) {
        console.error("GET /tasks error:", err);
        res.status(500).json({ error: err.message });
    }
});

// CREATE
app.post("/tasks", async (req, res) => {
    try {
        const { title } = req.body;

        const result = await pool.query(
            "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
            [title]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("POST /tasks error:", err);
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
app.put("/tasks/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { completed } = req.body;

        const result = await pool.query(
            "UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *",
            [completed, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("PUT /tasks error:", err);
        res.status(500).json({ error: err.message });
    }
});



// DELETE
app.delete("/tasks/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted" });
    } catch (err) {
        console.error("DELETE /tasks error:", err);
        res.status(500).json({ error: err.message });
    }
});

//START SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});