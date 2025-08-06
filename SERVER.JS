const express = require('express'); // Importa o Express

const app = express(); // Cria o servidor

const port = 3000; // Variável para armazenar a porta

//Para permitir receber json nas requisições
app.use(express.json());

const usuarios = [
    {"id": 1, "nome": "Cassio", "idade": "17 anos", "senha": "2135"},
    {"id": 2 , "nome": "Italo", "idade": "13 anos", "senha": "2011"}
]

//request = requisição
//response = resposta
app.get("/", (request, response) => {
    response.send("Primeiro servidor AIPSII - Malwee");

})

//Buscar todos os usuarios
app.get("/usuarios", (req, res) =>{
    res.send(usuarios); // send -> Envia os dados
})

//Buscar um usuário - > get by id
app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const usuario = usuarios
    .find(usuario => usuario.id == id);

    if(usuario != null) {
        res.send(usuario)
    } else {
        res.status(404).send("Usuário não encontrado!")
    }
})

//Criar um usuário
app.post("/usuarios", (req, res) => {
    const novoUsuario = req.body;
    novoUsuario.id = usuarios. lennght + 1;
    usuarios.push(novoUsuario);

    res.status(201).send(novoUsuario);
})

//Atualizar um usuário
app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const novoUsuario = req.body;
    novoUsuario.id = id;
    const index = usuarios.findIndex(usuario => usuario.id == id);

    if (index != null){
        usuarios[index] = novoUsuario;
        res.status(204).send(novoUsuario);
    } else {
        res.status(404).send("Usuário não encontrado!")

    }

})


//Deletar usuário
app.delete("/usuario/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(usuario => usuario.id == id);

    if (index != null){
        usuarios.splice(index, 1);
        res.status(204).send("Usuário com id:" + id + " removido com sucesso!")

    } else{
        res.status(404).send("Usuário não encontrado!")
    }
})

app.listen(port, () =>{
    console.log("Servidor rodando em http://localhost:3000")

}); 