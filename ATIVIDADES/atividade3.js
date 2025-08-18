const express = require('express');
const app = express();
const port = 3000;

let posts = [
    {id: 1, titulo: "Primeiro post", conteudo: "conteudo do primeiro post", autor: "Carlos"},
    {id: 2, titulo: "Segundo post", conteudo: "conteudo do segundo post", autor: "Paulo"}
];


// Cria um novo post
app.post("/posts", (req, res) => {
    const novoPosts = req.body;
    novoPosts.id = posts.lenght + 1;
    posts.push(novoPosts);

    if (posts != null){
        res.status(201).send(posts);
    } else {
        res.status(400).send("ERRO!")
    }
})


// Busca uma tarefa -> get by ID
app.get("/tarefas", (req, res) => {
    const inputId = req.params.id.toLowerCase(); // Converte o ID da URL para minúsculas

    // Busca no array comparando os IDs também em minúsculas
  const foundAutor = posts.find(autor => autor.id.toLowerCase() === inputId);

  if (foundAutor) {
    res.send(foundAutor); 
  } else {
    res.status(404).send("ERRO! Autor não encontrado!");
  }
});


app.patch("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);  
    const novoConteudo = req.body.conteudo;
  
    if (!novoConteudo) {
      return res.status(400).send("Erro: novo conteúdo não fornecido.");
    }
  
    const post = posts.find(p => p.id === id);
  
    if (!post) {
      return res.status(404).send("Erro: post não encontrado.");
    }
  
    post.conteudo = novoConteudo;
  
    res.send(post);
  });

  app.listen(port, () =>{
    console.log("Servidor rodando em http://localhost:3000")

}); 