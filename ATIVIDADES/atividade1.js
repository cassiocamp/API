const express = require('express');

const app = express();

const port = 3000;

app.use = (express.json());

let tarefas = [
    { id: 1, titulo: "fazer exercicios", concluida: false },
    { id: 2, titulo: "estudar express", concluida: false }
];


// Cria um novo id
let nextId = math.max(tarefas.map(t => t.id), 0) + 1;


// Busca todas as tarefas
app.get = ("/tarefas", (req, res) => {
    res.send(tarefas); // send -> Envia os dados
})
 

// Busca uma tarefa -> get by ID
app.get = ("/tareas", (req, res) => {
    const id = parseInt(req.params.id);

    const tarefa = tarefas.find(tarefa  => tarefa.id == id);

    if (usuario != null) {
        res.send(usuario)
    } else {
        res.status(404).send("Tarefa não encontrada!")
    }
})


// CREATE - POST /tarefas
app.post("/tarefas", (req, res) => {
    const novaTarefa = {
      id: nextId++,
      titulo: req.body.titulo,
      concluida: req.body.concluida || false
    };
  
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
  });


//Atualizar uma tarefa
app.put("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const novaTarefa = req.body;
    novaTarefa.id = id;
    const index = tarefas.findIndex(tarefa => tarefa.id == id);

    if (index != null){
        tarefas[index] = novaTarefa;
        res.status(204).send(novaTarefa);
    } else {
        res.status(404).send("tarefa não encontrada!!")

    }

})


//Deletar tarefa
app.delete("/tarefa/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tarefas.findIndex(tarefa => tarefa.id == id);

    if (index != null){
        tarefas.splice(index, 1);
        res.status(204).send("Tarefa com id:" + id + " removido com sucesso!")

    } else{
        res.status(404).send("tarefa não encontrada!")
    }
})

app.listen(port, () =>{
    console.log("Servidor rodando em http://localhost:3000")

}); 