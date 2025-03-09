const pool = require("./pool");
require("dotenv").config();

async function getTasks() {
    try {
        const result = await pool.query("SELECT * FROM tasks");
        return result.rows;
    } catch (err) {
        console.error("Error Fetching Tasks:", err.stack);
        throw err;
    }
}

async function addTask(name) {
    try {
        const result = await pool.query(
            "INSERT INTO tasks (name) VALUES ($1) RETURNING *",
            [name]
        );
        return result.rows[0];
    } catch (err) {
        console.error("Error Adding Task:", err.stack);
        throw err;
    }
}

async function updateTask(id, name, completed) {
    try {
        const result = await pool.query(
            "UPDATE tasks SET name = $1, completed = $2 WHERE id = $3 RETURNING *",
            [name, completed, id]
        );
        return result.rows[0];
    } catch (err) {
        console.error("Error Updating Task:", err.stack);
        throw err;
    }
}

async function deleteTask(id) {
    try {
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );
        return result.rows[0];
    } catch (err) {
        console.error("Error Deleting Task:", err.stack);
        throw err;
    }
}

module.exports = { getTasks, addTask, updateTask, deleteTask };
