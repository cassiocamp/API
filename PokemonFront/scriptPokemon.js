const campoBusca = document.querySelector('#busca');
const pokemonList = document.getElementById("pokemonList");

let allPokemons = [];

// Carrega 151 pokémons
async function loadPokemons() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();

        const promises = data.results.map(async (pokemon) => {
            const pokeResponse = await fetch(pokemon.url);
            const pokeData = await pokeResponse.json();

            return {
                id: pokeData.id,
                name: pokeData.name,
                img: pokeData.sprites.other["official-artwork"].front_default,
                types: pokeData.types.map(t => t.type.name),
                stats: {
                    hp: pokeData.stats[0].base_stat,
                    attack: pokeData.stats[1].base_stat,
                    defense: pokeData.stats[2].base_stat
                }
            };
        });

        allPokemons = await Promise.all(promises);
        renderPokemons(allPokemons);

    } catch (error) {
        console.error("Erro ao carregar Pokémons:", error);
    }
}

// Renderiza lista
function renderPokemons(pokemons) {
    pokemonList.innerHTML = "";
    pokemons.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("col-md-2", "col-sm-4", "mb-4");

        card.innerHTML = `
            <div class="card text-center shadow-sm p-2 pokemon-card" style="border-radius: 15px; cursor:pointer;" data-id="${pokemon.id}">
                <img src="${pokemon.img}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title">#${pokemon.id} - ${capitalize(pokemon.name)}</h5>
                    <p class="card-text">${pokemon.types.join(", ")}</p>
                </div>
            </div>
        `;
        pokemonList.appendChild(card);
    });

    // Evento de clique nos cards
    document.querySelectorAll(".pokemon-card").forEach(card => {
        card.addEventListener("click", () => {
            const pokemonId = card.getAttribute("data-id");
            const pokemon = allPokemons.find(p => p.id == pokemonId);
            showPokemonDetails(pokemon);
        });
    });
}

// Mostra detalhes no modal
function showPokemonDetails(pokemon) {
    document.getElementById("pokemonModalLabel").textContent = `#${pokemon.id} - ${capitalize(pokemon.name)}`;
    document.getElementById("pokemonImage").src = pokemon.img;
    document.getElementById("pokemonTypes").textContent = pokemon.types.join(", ");
    document.getElementById("statHp").textContent = pokemon.stats.hp;
    document.getElementById("statAttack").textContent = pokemon.stats.attack;
    document.getElementById("statDefense").textContent = pokemon.stats.defense;

    const modal = new bootstrap.Modal(document.getElementById("pokemonModal"));
    modal.show();
}

// Função auxiliar: capitaliza nomes
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Busca em tempo real
campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.toLowerCase();
    const filtrados = allPokemons.filter(p =>
        p.name.includes(termo) || p.id.toString() === termo
    );
    renderPokemons(filtrados);
});

// Inicialização
loadPokemons();