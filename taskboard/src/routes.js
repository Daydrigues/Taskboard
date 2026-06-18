const express = require("express");
const router = express.Router();
const { pool } = require("./db");

// GET /tasks — listar todas as tarefas
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar tarefas." });
  }
});

// POST /tasks — criar nova tarefa
router.post("/", async (req, res) => {
  const { title, description, status } = req.body;
  if (!title) return res.status(400).json({ error: "O título é obrigatório." });

  try {
    const [result] = await pool.execute(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
      [title, description || null, status || "todo"]
    );
    const [rows] = await pool.execute("SELECT * FROM tasks WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar tarefa." });
  }
});

// PUT /tasks/:id — atualizar tarefa
router.put("/:id", async (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;

  try {
    await pool.execute(
      "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
      [title, description || null, status || "todo", id]
    );
    const [rows] = await pool.execute("SELECT * FROM tasks WHERE id = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Tarefa não encontrada." });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar tarefa." });
  }
});

// DELETE /tasks/:id — deletar tarefa
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute("DELETE FROM tasks WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Tarefa não encontrada." });
    res.json({ message: "Tarefa deletada com sucesso." });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar tarefa." });
  }
});

module.exports = router;
