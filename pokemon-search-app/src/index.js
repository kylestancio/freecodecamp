

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const errorContainer = document.getElementById("error-container");
const resultContainer = document.getElementById("result-container")

const pokemonImageFrontDisplay = document.getElementById("sprite")
const pokemonNameDisplay = document.getElementById("pokemon-name");
const pokemonIdDisplay = document.getElementById("pokemon-id");
const weightDisplay = document.getElementById("weight");
const heightDisplay = document.getElementById("height");
const typesDisplay = document.getElementById("types");
const hpDisplay = document.getElementById("hp");
const attackDisplay = document.getElementById("attack");
const defenseDisplay = document.getElementById("defense");
const specialAttackDisplay = document.getElementById("special-attack");
const specialDefenseDisplay = document.getElementById("special-defense");
const speedDisplay = document.getElementById("speed");

searchButton.addEventListener("click", () => {
  if (searchInput.value !== ""){
    getPokemonData(searchInput.value);
  }
})

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && searchInput.value !== ""){
    getPokemonData(searchInput.value);
  }
})

async function getPokemonData(query){
  
  errorContainer.style.display = "none";
  resultContainer.style.display = "none";

  const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query.toLowerCase()}`)
    .then(res => { 
      if (res.status === 404) throw "Pokémon not found";
      return res.json();
    })
    .catch(err => {
      alert(err);
      errorContainer.style.display = "block";
      errorContainer.innerHTML = err;
      console.log(err)
    });

  if (!response) return;
  errorContainer.style.display = "none";
  resultContainer.style.display = "block";
  
  const { 
    id, 
    name,
    weight,
    height,
    types,
    stats, 
    sprites,
  } = response;

  const [ 
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed
  ] = stats;


  const {
    front_default
  } = sprites;

  pokemonImageFrontDisplay.src = front_default;

  pokemonNameDisplay.innerHTML = name;
  pokemonIdDisplay.innerHTML = `#${id}`;
  weightDisplay.innerHTML = weight;
  heightDisplay.innerHTML = height;

  typesDisplay.innerHTML = "";
  types.map(item => {
    const typesChild = document.createElement("span");
    typesChild.innerHTML = `${item.type.name.toUpperCase()} `;
    typesDisplay.appendChild(typesChild)
  })

  hpDisplay.innerHTML = hp.base_stat;
  attackDisplay.innerHTML = attack.base_stat;
  defenseDisplay.innerHTML = defense.base_stat;
  specialAttackDisplay.innerHTML = specialAttack.base_stat;
  specialDefenseDisplay.innerHTML = specialDefense.base_stat;
  speedDisplay.innerHTML = speed.base_stat;

}