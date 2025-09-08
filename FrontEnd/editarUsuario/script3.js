const params = new URLSearchParams(window.location.search);

const usuarioId = params.get("id");

let nome = document.getElementById("nome");
let idade = document.getElementById("idade");
let senha = document.getElementById("senha");
let cep = document.getElementById("cep");
let uf = document.getElementById("uf");
let cidade = document.getElementById("cidade");
let bairro = document.getElementById("bairro");
let rua = document.getElementById("rua");

document.addEventListener("DOMContentLoaded", () => {
    fetch(`http://localhost:3000/usuarios/${usuarioId}`)

        .then(response => response.json())

        .then(data => {
            console.log(data)
            nome.value = data.nome;
            idade.value = data.idade;
            senha.value = data.senha;
            cep.value = data.cep;
            uf.value = data.uf;
            cidade.value = data.cidade;
            bairro.value = data.bairro;
            rua.value = data.rua;
            
        })
        
})
.catch(error => console.log(error));

function atualizarUsuario(event) {
    event.preventDefault();

    fetch(`http://localhost:3000/usuarios/${usuarioId}`, {

        method: 'PUT',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify({
            nome: nome.value,
            idade: idade.value,
            senha: senha.value
        })

    })

        .then(response => response.json())

        .then(data => {console.log(data)
            alert(`Usuário ${usuarioId} foi atualizado com sucesso!`)
            window.location.href = "../index.html";    
        })
        

        .catch(error => console.log(error));

}