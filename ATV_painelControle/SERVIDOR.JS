const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o CORS

const app = express(); //Cria o servidor

const port = 3000; //Variavel para armazenar a porta

//Para permitir receber json nas requisições
app.use(express.json());
app.use(cors());

const produtos = [
    { "id": 1,
     "nome": "Monitor Gamer 27 polegadas",
      "quantidade": 25 },
    
    { "id": 2,
      "nome": "Mouse Gamer",
       "quantidade": 32 },

    { "id": 3,
     "nome": "Teclado",
      "quantidade": 17 },

    { "id": 4,
     "nome": "Memória RAM 12GB",
      "quantidade": 8 },
    
]

let nextId = 5;

//request - requisição
//response - respota
app.get("/", (request, response) => {
    response.send("Segundo servidor DESI - Malwee");
})

//Buscar todos os usuários
app.get("/produtos", (req, res) => {
    //send -> envia os dados
    res.send(produtos);
})

//Buscar um usuário -> get by id
app.get("/produtos/:id", (req, res) => {
    //params - parametros da requisição (fica na url)
    const id = parseInt(req.params.id);

    const produto = produtos.find(produto => produto.id == id);

    if (produtos != null) {
        res.send(produtos)
    } else {
        res.status(404).send("Produto não encontrado!")
    }
})

//Criar um usuário
app.post("/produtos", (req, res) => {
    //body - corpo da requisição
    const novoProduto = req.body;
    novoProduto.id = nextId ++;
    produtos.push(novoProduto);

    res.status(201).send(novoProduto)
})

//Registra a entrada de produtos
app.post("/produtos/:id/entrada", (req, res) => {
    const id = parseInt(req.params.id);
    const { quantidade } = req.body;

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).send("Produto não encontrado!");
    }

    if (typeof quantidade !== "number" || quantidade <= 0) {
        return res.status(400).send("Quantidade inválida!");
    }

    produto.quantidade += quantidade;
    res.send(produto);
});

//Registra a Saída de produtos
app.post("/produtos/:id/saida", (req, res) => {
    const id = parseInt(req.params.id);
    const {quantidade } = req.body;

    const produto = produto.find(p => p.id === id);

    if (quantidade > produto.quantidade) {
        return res.status(400).send("A quantidade de saída é maior que o estoque atual!");
    }

    produto.quantidade -= quantidade;
    res.send(produto);
});

app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:3000");
})