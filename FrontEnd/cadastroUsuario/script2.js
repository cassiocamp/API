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
        "senha": senha,
       
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

const campoCEP = document.querySelector('#cep');

campoCEP.addEventListener('blur', () => {
    const CEP = campoCEP.value;

    const url = `https://viacep.com.br/ws/${CEP}/json/`;

    fetch(`https://viacep.com.br/ws/${CEP}/json/`)

        .then(response => response.json())

        .then(data => {

        });
});

const campoRua = document.querySelector('#rua');
const campoBairro = document.querySelector('#bairro');
const campoCidade = document.querySelector('#cidade');
const campoEstado = document.querySelector('#uf');


campoCEP.addEventListener('blur', () => {
    const CEP = campoCEP.value;


    fetch(`https://viacep.com.br/ws/${CEP}/json/`)
        .then(response => response.json())
        .then(data => {
            campoRua.value = data.logradouro;
            campoBairro.value = data.bairro;
            campoCidade.value = data.localidade;
            campoEstado.value = data.uf;
        });
});