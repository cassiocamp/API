const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const produtos = [
    { id: 1, nome: "Teclado Mecânico", preco: 350.00, categoria: "Informática", emEstoque: true },
    { id: 2, nome: "Monitor Utrawide", preco: 180.00, categoria: "Informática", emEstoque: false },
    { id: 3, nome: "Mouse Gamer", preco: 1500.00, categoria: "Informática", emEstoque: true }
  ];
  

app.get('/produtos/em-estoque', (req, res) => {
  const produtosEmEstoque = produtos.filter(produto => produto.emEstoque);
  res.json(produtosEmEstoque);
});

app.get('/produtos/pesquisar', (req, res) => {
  const nome = req.query.nome;
  if (!nome) {
    return res.status(400).json({ error: "Parâmetro 'nome' é obrigatório" });
  }
  const resultados = produtos.filter(produto => 
    produto.nome.toLowerCase().includes(nome.toLowerCase())
  );
  res.json(resultados);
});

app.patch('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { preco } = req.body;

  const produto = produtos.find(prod => prod.id == id);
  if (!produto) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }
  if (preco === undefined) {
    return res.status(400).json({ error: "Preço é obrigatório" });
  }

  produto.preco = preco;
  res.json(produto);
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { categoria } = req.body;

  if (!categoria) {
    return res.status(400).json({ error: "Categoria é obrigatória" });
  }

  const produtoIndex = produtos.findIndex(prod => prod.id == id);
  if (produtoIndex === -1) {
    return res.status(404).json({ error: "Produto não encontrado" });
)}

app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:3000");
});