const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o CORS

const app = express(); //Cria o servidor

const port = 3000; //Variavel para armazenar a porta

//Para permitir receber json nas requisições
app.use(express.json());
app.use(cors());

const tarefas = [
    {
    id: 1,
    titulo: "Planejar a sprint",
    descricao: "Definir as próximas atividades do time de desenvolvimento",
    concluida: false
    },

    {
    id: 2,
    titulo: "Revisar código",
    descricao: "Realizar code reviw das funcionalidades entregues pelo time",
    concluida: true
    },

    {
    id: 3,
    titulo: "Documentar API",
    descricao: "Atualizar a documentação da API com os novos endpoints criados",
    concluida: true
    },

    {
    id: 4,
    titulo: "Testar funcionalidade",
    descricao: "Executar testes unitários e de integração na nova feature",
    concluida: false
    }
]

app.get("/", (request, response) => {
    response.send("Terceiro servidor DESI - Malwee");
});

app.get("/tarefas", (req, res) => {
    res.send(tarefas);
});


app.post("/tarefas", (req, res) =>{
    const {titulo, descricao} = req.body;
    
    if (!titulo || !descricao){
        return res.status(400).send({erro:"Título e descrição são obrigatórios!"});
    }

    const novaTarefa = {
        id: tarefas.length + 1,
        titulo,
        descricao,
        concluida: false
    };

    tarefas.push(novaTarefa);
    res.status(201).send(novaTarefa)    

});

app.patch("/tarefas/:id/concluir",(req, res) =>{
    const {id} = req.params;
    const tarefas = tarefas.find(t => t.id === parseInt(id));

    if(!tarefa){
        res.status(404).send({erro:"Tarefa não encontrada!"});
    }

    tarefa.concluida = true;

    res.json(tarefa);
    
});



app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:3000");
})
