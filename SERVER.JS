const express = require('express'); // Importa o Express

const app = express(); // Cria o servidor

const port = 3000; // Variável para armazenar a porta

app.listen(port, () =>{
    console.log("Servidor rodando em http://localhost:3000")

}); 