const limit = 10;
let offset = 0;

async function fetchPokemons() {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
  await fetch(url)
    .then((resp) => resp.json())
    .then((result) => renderPokemonCard(result.results))
    .catch((error) => console.log("Error:", error));
}

async function renderPokemonCard(data = []) {
  const pokemons = await data.map((pokemon) => createPokemonCard(pokemon));
  populateCardContainer(pokemons);
}

function populateCardContainer(data = []) {
  const container = document.getElementsByClassName("container")[0];
  container.innerHTML = "";
  container.append(...data);
}

function createPokemonCard(data = {}) {
  const poki = document.createElement("div");
  poki.setAttribute("class", "cards");
  const pokemonURL = data.url;

  fetch(pokemonURL)
    .then((resp) => resp.json())
    .then((result) => {
      const abilities = result.abilities.map((ability) => ability.ability.name);
      const moves = result.moves.map((move) => move.move.name);
      const { name, sprites, weight } = result;

      poki.innerHTML = `
       <div class="card" id="cards">
    <img src="${sprites.other["official-artwork"].front_default}" alt="pokemonImage"/>
    <h2 class="pokemon-name">${name}</h2>
    <div class="stats">
    <div>
        <h3>${weight}</h3>
         <p>Weight</p>
    </div>
    <div>
        <h3>${abilities.length}</h3>
        <p>Abilities</p>
        </div>
        <div>
        <h3>${moves.length}</h3>
        <p>Moves</p>
        </div>
    </div>
</div>
      `;
    })
    .catch((error) => console.log("Error:", error));

  return poki;
}

function previousPage() {
  offset -= limit;
  if (offset < 0) {
    offset = 0;
  }
  fetchPokemons();
}

function nextPage() {
  offset += limit;
  fetchPokemons();
}

fetchPokemons();
