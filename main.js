// Define the showOverlay function
function showOverlay(button) {
  const pokemonString = button.getAttribute('data-pokemon');
  const pokemon = JSON.parse(pokemonString);
  const overlay = document.getElementById('overlay');
  if (overlay) {
    // Add the image and details to the overlay
    overlay.innerHTML = `
    <span id="btnclose" class="close">×</span>
    <div class="container-fluid d-flex align-items-center justify-content-center text-center px-5 mt-5" id="pokemonsHd"> 
      <div class="row">
        <div class="over mx-2 col-lg-2 order-0 order-sm-0 order-md-0 order-lg-0 d-flex flex-column align-items-center justify-content-center">
          <h5>Type</h5>
          <p class="m-0">${pokemon.types.join(', ')}</p>
        </div>
        <div class="over mx-2 col-lg-2 order-2 order-sm-2 order-md-2 order-lg-0 d-flex flex-column align-items-center justify-content-center">
          <h5>Abilities</h5>
          <p class="m-0">${pokemon.abilities.join(', ')}</p>
        </div>
        <div class="over mx-2 col-lg-2 order-4 order-sm-4 order-md-4 order-lg-0 d-flex flex-column align-items-center justify-content-center">
          <h5>Moves</h5>
          <p class="m-0">${pokemon.moves.join(', ')}</p>
        </div>
        <img src="${pokemon.artworkImageUrl}"  class= "col-lg-4 order-first order-lg-last" alt="">
      </div>
    </div>`;
 
    // Show the overlay
    overlay.style.display = 'block';

    // Add event listener to close button
    const closeButton = document.getElementById('btnclose');
    closeButton.addEventListener('click', hideOverlay);
  }
}

// Define the hideOverlay function
function hideOverlay() {
  const overlay = document.getElementById('overlay');
  if (overlay) {
      // Hide the overlay
      overlay.style.display = 'none';
  }
}

// Select the open button, close button, and sidebar elements
const openBtn = document.querySelector('#openBtn');
const closeBtn = document.querySelector('#closeBtn');
const mySideNav = document.querySelector('#mySideNav');

// Add a click event listener to the open button
openBtn.addEventListener('click', function() {
    mySideNav.style.width = '250px'; // Open the sidebar
});


// Add a click event listener to the close button
closeBtn.addEventListener('click', function() {
    mySideNav.style.width = '0'; // Close the sidebar
});

// DOM elements
const $pokemons = document.getElementById('pokemons')
let pokemons = [];

let startIndex = 1; // Start index for the Pokemon to fetch

async function getPokemons(start){
    const pokemons = []; // Array to store all the Pokemon data
    for(let i = start; i < start + 20; i++){ // Fetch data for 20 Pokemons starting from 'start'
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + i);
        const data = await response.json();
        const pokemon = {
            name: data.name,
            spriteImageUrl: data.sprites.front_default,
            artworkImageUrl: data.sprites.other['official-artwork'].front_default,
            types: data.types.map(type => type.type.name), // Fetch the types
            abilities: data.abilities.map(ability => ability.ability.name), // Fetch the abilities
            moves: data.moves.slice(0, 2).map(move => move.move.name) // Fetch the moves
        };
        pokemons.push(pokemon);
    }
    const html = buildPokemons(pokemons);
    $pokemons.innerHTML += html.join(''); // Append the new Pokemon to the existing ones

    // Add event listeners to the new Pokemon cards
    const pokemonCards = document.querySelectorAll('.card.btn.mb-3.mx-auto.btn-outline-warning');
    pokemonCards.forEach(card => {
        card.addEventListener('click', function() {
            showOverlay(this);
        });
    });

    // Add event listeners to the new Pokemon catch buttons
    const pokemonCatchButtons = document.querySelectorAll('.pokemon-container');
    pokemonCatchButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pokemonString = this.previousElementSibling.getAttribute('data-pokemon');
            const pokemon = JSON.parse(pokemonString);
            catchPokemon(pokemon);
        });
    });
}


// Initialize an empty array to store the caught Pokemon
let caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon')) || [];

function buildPokemons(pokemons){
  const html = [];
  for(const pokemon of pokemons){
      html.push(`
      <div class="col-lg-3 d-flex justify-content-center position-relative"> 
          <button class="card btn mb-3 mx-auto btn-outline-warning" data-pokemon='${JSON.stringify(pokemon)}'>
              <div class="card-body align-items-center d-flex flex-column justify-content-center">
                  <img src="${pokemon.spriteImageUrl}" class=" button card-img-top" alt="">  
                  <h5 class="card-title">${pokemon.name}</h5>  
              </div>
          </button>
          <button class="pokemon-container btn d-flex position-absolute bottom-0 start-10">
              <img src="/images/pokeball_on.png" id="toggleButton" class="toggleButton img-fluid"></img>
          </button>
      </div>
      `);
  }
  return html;
}


function catchPokemon(pokemon) {
  // Check if the Pokemon is already in the caughtPokemon array
  const index = caughtPokemon.findIndex(p => p.name === pokemon.name);
  if (index !== -1) {
      // If the Pokemon is already caught, remove it from the array
      caughtPokemon.splice(index, 1);
  } else {
      // If the Pokemon is not caught, add it to the array
      caughtPokemon.push(pokemon);
  }
  // Save the caughtPokemon array to local storage
  localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));
  // Update the side navigation bar
  updateSideNav();
}

function updateSideNav() {
  // Get the side navigation bar element
  const sideNav = document.querySelector('.sidenav .caught-container');
  // Clear the current contents of the side navigation bar
  sideNav.innerHTML = '';
  // Add each caught Pokemon to the side navigation bar
  for (const pokemon of caughtPokemon) {
      const pokemonElement = document.createElement('img');
      pokemonElement.src = pokemon.spriteImageUrl;
      pokemonElement.alt = pokemon.name;
      pokemonElement.addEventListener('click', function() {
          catchPokemon(pokemon); // Call the catchPokemon function to remove the Pokemon from the caught list
      });
      sideNav.appendChild(pokemonElement);
  }
}
getPokemons(startIndex); // Fetch the first 20 Pokemon


document.querySelector('.btn.btn-warning').addEventListener('click', async () => {
    startIndex += 20; // Increment the start index by 20
    await getPokemons(startIndex); // Fetch the next 20 Pokemon
});

