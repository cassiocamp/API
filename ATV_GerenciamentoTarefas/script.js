const listaTarefas = document.getElementById("lista-tarefas");

function carregarTarefas = (){
    fetch('http://localhost:3000')
    .then(response => response.json())
    .then(tarefas => {
        listaTarefas.innerHTML = ' ';

        tarefas.forEach(tarefa => {
            const item = document.createElement('li');
            item.innerHTML = `<strong>${tarefa.titulo}</strong>: ${tarefa.descricao}`;
            listaTarefas.appendChild(item);
        });
    })
    .catch(error => {
        console.error("Erro ao carregar tarefas!", error);
        listaTarefas.innerHTML = '<li>Não foi possível carregar as tarefas!</li>';
    })
}