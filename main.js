const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");

const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon`).then(response => response.json());
        response.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.textContent = pokemon.name;
            option.value = pokemon.url;
            pokemonList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
}

loadPokemons();

const pokemonSelected = async (pokemonUrl) => {
    try {
        const response = await fetch(pokemonUrl).then(response => response.json());

        const pokemonImage = document.getElementById("pokemon-image");
        const pokemonName = document.getElementById("pokemon-name");
        const pokemonType = document.getElementById("pokemon-type");
        const pokemonStats = document.getElementById("pokemon-stats");
        const pokemonAbilities = document.getElementById("pokemon-abilities");

        const types = response.types.map(typeInfo => typeInfo.type.name).join(" / ");

        pokemonImage.src = response.sprites.front_default;
        pokemonImage.title = `Tipo: ${types}`;
        pokemonName.textContent = response.name;
        pokemonType.textContent = `Tipo: ${types}`;

        pokemonStats.innerHTML = response.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join("");
        pokemonAbilities.innerHTML = response.abilities.map(ability => `<li>${ability.ability.name}</li>`).join("");

    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
}

// fetch(`${POKEAPI_URL}/pokemon`)
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// });