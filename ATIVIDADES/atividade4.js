const express = require("express");
const app = express();
app.use(express.json());

let comentarios = [];
let posts = [
  { id: 1, titulo: "Primeiro Post" },
  { id: 2, titulo: "Segundo Post" }
];

let proximoComentarioId = 1;

// GET /posts/:id/comentarios
app.get("/posts/:id/comentarios", (req, res) => {
  const postId = parseInt(req.params.id);
  const comentariosDoPost = comentarios.filter(c => c.post_id === postId);
  res.send(comentariosDoPost);
});

// POST /posts/:id/comentarios
app.post("/posts/:id/comentarios", (req, res) => {
  const postId = parseInt(req.params.id);
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).send({ erro: "Texto do comentário é obrigatório." });
  }

  const novoComentario = {
    id: proximoComentarioId++,
    post_id: postId,
    texto: texto
  };

  comentarios.push(novoComentario);
  res.status(201).send(novoComentario);
});

// DELETE /comentarios/:id
app.delete("/comentarios/:id", (req, res) => {
  const comentarioId = parseInt(req.params.id);
  const index = comentarios.findIndex(c => c.id === comentarioId);

  if (index === -1) {
    return res.status(404).send({ erro: "Comentário não encontrado." });
  }

  comentarios.splice(index, 1);
  res.status(204).send(); // No Content
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
