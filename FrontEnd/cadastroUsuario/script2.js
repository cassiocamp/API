function cadastroUsuario(event){/*cria uma funcão com o id cadastrarUsuario*/
    event.preventDefault();/* não atualiza a página quando falta informação no formulário*/

    let nome = event.target.nome.value;
    let idade = event.target.idade.value;
    let senha = event.target.senha.value;

fetch('http://localhost:3000/usuarios', {

    method: 'POST',

    headers: {

        'Content-Type': 'application/json'

    },

    body: JSON.stringify({
        "nome": nome,
        "idade": idade,
        "senha": senha
    })

})

    .then(response => response.json())

    .then(dados => {
        console.log(dados)
        alert("Usuário cadstrado com sucesso!");
        window.location.href = "../index.html";
    })

    .catch(error => console.log(error));
}
