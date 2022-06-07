//função para buscar os pokemons

// const fetchPokemon = () => {
//   //requisição ajax no browser com fetch
//   const url = ` https://pokeapi.co/api/v2/pokemon/25`;
//   //invocando o fetch com a url como argumento

//   fetch(url)
//     .then((response) => response.json()) //retorando a response em json
//     .then((pokemon) => {
//       //aqui pega o body com a informação td do pokemon
//       console.log(pokemon);
//     });
// };

// //invocando essa função

// fetchPokemon();

const fetchPokemon = () => {
  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

  //looping para passar pelos pokemons e trazer a promise de cada um deles

  const pokemonPromises = [];

  for (let i = 1; i <= 150; i++) {
    //eu add dentro do argumento do push do array vazio, que foi criado acima, o looping da promise, p que a cada
    // interação a gente add o item no final dessa promise
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then(response => response.json())
    );
  }

  //retorno das promises
  Promise.all(pokemonPromises).then(pokemons => {
    //trazer tds os pokemons nas arrays
    //    console.log(pokemons);

    const liPokemons = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map(TypeInfo => TypeInfo.type.name);

      accumulator += `
      <li class = "card  ${types[0]}">

      <img class = "card-image" alt = ${
        pokemon.name
      }" src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        pokemon.id
      }.png" />
       <h2 class = "card-title">${pokemon.id}. ${pokemon.name} </h2>
       
       <p class = "card-subtitle">${types.join(" | ")}</p>
     
        </li>`;

      return accumulator;
    }, "");

    const ul = document.querySelector('[data-js = "pokedex"]');

    ul.innerHTML = liPokemons;
  });
};

fetchPokemon();
