const campoBusca = document.querySelector('#busca');

campoBusca.addEventListener('blur', () => {
    const BUSCA = campoBusca.value;

    if (!BUSCA) return;

    const url = `https://pokeapi.co/api/v2/pokemon/${BUSCA}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon não encontrado!");
            }
            return response.json();
        })
        .then(data => {
            let resultado = document.querySelector('#resultado');
            if (!resultado) {
                resultado = document.createElement('div');
                resultado.id = 'resultado';
                document.body.appendChild(resultado);
            }

            resultado.innerHTML = `
                <h2>${data.name.toUpperCase()} (#${data.id})</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
            `;
        })
        .catch(error => {
            alert(error.message);
        });
});
