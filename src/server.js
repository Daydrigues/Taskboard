const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { initDatabase } = require("./db");
const taskRoutes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Rotas da API
app.use("/api/tasks", taskRoutes);

// Health check (útil para verificar se EC2 está OK)
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Rota raiz → frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Inicializa banco e sobe servidor
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Falha ao conectar no banco de dados:", err.message);
    process.exit(1);
  });
