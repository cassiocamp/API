document.addEventListener('DOMContentLoaded', () => {
    const produtosContainer = document.getElementById('produtos-container');

    
    const API_URL = 'http://localhost:3000/produtos';

    
    async function fetchAndRenderProdutos() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Erro ao carregar produtos.');
            }
            const produtos = await response.json();
            renderProdutos(produtos);
        } catch (error) {
            console.error('Erro:', error);
            produtosContainer.innerHTML = `<p style="color:red;">Erro ao conectar com o servidor. Tente novamente mais tarde.</p>`;
        }
    }

    
    function renderProdutos(produtos) {
        if (produtos.length === 0) {
            produtosContainer.innerHTML = '<p>Nenhum produto em estoque.</p>';
            return;
        }

        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
        `;

        produtos.forEach(produto => {
            tableHTML += `
                <tr id="produto-${produto.id}" class="produto-item">
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td id="quantidade-${produto.id}">${produto.quantidade}</td>
                    <td>
                        <input type="number" id="input-${produto.id}" min="1" value="1">
                        <button class="btn-entrada" data-id="${produto.id}">Registrar Entrada</button>
                        <button class="btn-saida" data-id="${produto.id}">Registrar Saída</button>
                    </td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        produtosContainer.innerHTML = tableHTML;
        addEventListeners();
    }

    // Função para adicionar os event listeners aos botões
    function addEventListeners() {
        document.querySelectorAll('.btn-entrada').forEach(button => {
            button.addEventListener('click', handleEntradaSaida);
        });
        document.querySelectorAll('.btn-saida').forEach(button => {
            button.addEventListener('click', handleEntradaSaida);
        });
    }

    // Função genérica para tratar cliques de entrada e saída
    async function handleEntradaSaida(event) {
        const id = event.target.dataset.id;
        const inputQuantidade = document.getElementById(`input-${id}`);
        const quantidade = parseInt(inputQuantidade.value);

        if (isNaN(quantidade) || quantidade <= 0) {
            alert('Por favor, insira uma quantidade válida.');
            return;
        }

        const tipo = event.target.classList.contains('btn-entrada') ? 'entrada' : 'saida';
        const endpoint = `${API_URL}/${id}/${tipo}`;
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantidade: quantidade }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(`Erro ao registrar ${tipo}: ${data}`);
                return;
            }

            // Atualiza a quantidade na tabela sem recarregar a página
            document.getElementById(`quantidade-${id}`).textContent = data.quantidade;
            inputQuantidade.value = 1; // Reseta o input para 1
            alert(`${tipo === 'entrada' ? 'Entrada' : 'Saída'} de ${quantidade} unidades registrada com sucesso!`);

        } catch (error) {
            console.error('Erro:', error);
            alert(`Ocorreu um erro ao tentar registrar ${tipo}. Verifique a conexão com a API.`);
        }
    }

    // Carrega os produtos ao iniciar a página
    fetchAndRenderProdutos();
});