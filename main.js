// This is an asynchronous function that shows an overlay with Pokémon details
async function showOverlay(button) {
  // Get the Pokémon data from the button's data-pokemon attribute
  const pokemonString = button.getAttribute('data-pokemon');
  // Parse the Pokémon data into a JavaScript object
  const pokemon = JSON.parse(pokemonString);
  // Get the overlay element
  const overlay = document.getElementById('overlay');
  // If the overlay element exists
  if (overlay) {
    // Add the Pokémon details to the overlay's innerHTML
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
 
    // Show the overlay by setting its display style to 'block'
    overlay.style.display = 'block';

    // Get the close button element
    const closeButton = document.getElementById('btnclose');
    // Add a click event listener to the close button that calls the hideOverlay function
    closeButton.addEventListener('click', hideOverlay);
  }
}


// This function hides the overlay
function hideOverlay() {
  // Get the overlay element
  const overlay = document.getElementById('overlay');
  // If the overlay element exists
  if (overlay) {
    // Hide the overlay by setting its display style to 'none'
    overlay.style.display = 'none';
  }
}



// Select the open button, close button, and sidebar elements
const openBtn = document.querySelector('#openBtn');
const closeBtn = document.querySelector('#closeBtn');
const mySideNav = document.querySelector('#mySideNav');

// Add a click event listener to the open button
openBtn.addEventListener('click', function() {
    // Open the sidebar by setting its width to 250px
    mySideNav.style.width = '250px';
});

// Add a click event listener to the close button
closeBtn.addEventListener('click', function() {
    // Close the sidebar by setting its width to 0
    mySideNav.style.width = '0';
});

window.onscroll = function() {myFunction()};






// Select the DOM element with id 'pokemons'
const $pokemons = document.getElementById('pokemons')
// Initialize an empty array to store the Pokémon data
let pokemons = [];

// Set the start index for the Pokémon to fetch
let startIndex = 1;

// Define an asynchronous function to fetch Pokémon data
async function getPokemons(start){
    // Initialize an empty array to store the fetched Pokémon data
    const pokemons = [];
    // Fetch data for 20 Pokémon starting from the 'start' index
    for(let i = start; i < start + 20; i++){
        // Fetch the Pokémon data from the API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + i);
        // Parse the response data into a JavaScript object
        const data = await response.json();
        // Create a Pokémon object with the necessary details
        const pokemon = {
            name: data.name,
            spriteImageUrl: data.sprites.front_default,
            artworkImageUrl: data.sprites.other['official-artwork'].front_default,
            types: data.types.map(type => type.type.name), // Fetch the types
            abilities: data.abilities.map(ability => ability.ability.name), // Fetch the abilities
            moves: data.moves.slice(0, 2).map(move => move.move.name) // Fetch the moves
        };
        // Add the Pokémon object to the 'pokemons' array
        pokemons.push(pokemon);
    }
    // Build the HTML for the Pokémon and add it to the 'pokemons' DOM element
    const html = buildPokemons(pokemons);
    $pokemons.innerHTML += html.join('');

    // Add event listeners to the new Pokémon cards
const pokemonCards = document.querySelectorAll('.card.btn.mb-3.mx-auto.btn-outline-warning');
pokemonCards.forEach(card => {
    card.addEventListener('click', function() {
        showOverlay(this);
    });

    // Check if the Pokémon is in the caught list when the page loads
    const pokemonString = card.getAttribute('data-pokemon');
    const pokemon = JSON.parse(pokemonString);
    if (caughtPokemon.find(caught => caught.name === pokemon.name)) {
        // Get the image element relative to the card
        const imgElement = card.nextElementSibling.querySelector('.toggleButton');
        // Set the image source to the "on" state
        imgElement.src = '/images/pokeball_on.png';
    }
});





 // Add event listeners to the new Pokémon catch buttons
const pokemonCatchButtons = document.querySelectorAll('.pokemon-container');
pokemonCatchButtons.forEach(button => {
    button.addEventListener('click', function() {
        const pokemonString = this.previousElementSibling.getAttribute('data-pokemon');
        const pokemon = JSON.parse(pokemonString);
        catchPokemon(pokemon);

        // Get the image element relative to the clicked button
        const imgElement = this.querySelector('.toggleButton');

        // Check the current source of the image and toggle it
        if (imgElement.src.endsWith('/images/pokeball_off.png')) {
            imgElement.src = '/images/pokeball_on.png';
        } else {
            imgElement.src = '/images/pokeball_off.png';
        }
    });

    // Check if the Pokémon is in the caught list when the page loads
    const pokemonString = button.previousElementSibling.getAttribute('data-pokemon');
    const pokemon = JSON.parse(pokemonString);
    if (caughtPokemon.includes(pokemon)) {
        // Get the image element relative to the button
        const imgElement = button.querySelector('.toggleButton');
        // Set the image source to the "on" state
        imgElement.src = '/images/pokeball_on.png';
    }
});

    
    
}

// Initialize an empty array to store the caught Pokémon
// If there are any caught Pokémon saved in local storage, load them
let caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon')) || [];

// Define a function to build the HTML for the Pokémon
function buildPokemons(pokemons){
  const html = [];
  // Loop over each Pokémon
  for(const pokemon of pokemons){
      // Push the HTML for the Pokémon to the 'html' array
      html.push(`
      <div class="col-lg-3 d-flex justify-content-center position-relative"> 
          <button class="card btn mb-3 mx-auto btn-outline-warning" data-pokemon='${JSON.stringify(pokemon)}'>
              <div class="card-body align-items-center d-flex flex-column justify-content-center">
                  <img src="${pokemon.spriteImageUrl}" class=" button card-img-top" alt="">  
                  <h5 class="card-title ">${pokemon.name}</h5>  
              </div>
          </button>
          <button class="pokemon-container btn d-flex position-absolute bottom-0 start-10">
              <img src="/images/pokeball_off.png" id="toggleButton" class="toggleButton img-fluid"></img>
          </button>
      </div>
      `);
  }
  return html;
}

// Define a function to catch a Pokémon
function catchPokemon(pokemon) {
  // Check if the Pokémon is already in the 'caughtPokemon' array
  const index = caughtPokemon.findIndex(p => p.name === pokemon.name);
  if (index !== -1) {
      // If the Pokémon is already caught, remove it from the array
      caughtPokemon.splice(index, 1);
  } else {
      // If the Pokémon is not caught, add it to the array
      caughtPokemon.push(pokemon);
  }
  // Save the 'caughtPokemon' array to local storage
  localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));
  // Update the side navigation bar
  updateSideNav();
}




// Define a function to update the side navigation bar
function updateSideNav() {
  // Get the side navigation bar element
  const sideNav = document.querySelector('.sidenav .caught-container');
  // Clear the current contents of the side navigation bar
  sideNav.innerHTML = '';
  // Add each caught Pokémon to the side navigation bar
  for (const pokemon of caughtPokemon) {
      const pokemonElement = document.createElement('img');
      pokemonElement.src = pokemon.spriteImageUrl;
      pokemonElement.alt = pokemon.name;
      pokemonElement.addEventListener('click', function() {
          catchPokemon(pokemon); // Call the 'catchPokemon' function to remove the Pokémon from the caught list
      });
      sideNav.appendChild(pokemonElement);
  }
}

// Fetch the first 20 Pokémon
getPokemons(startIndex);

// Add a click event listener to the button with class 'btn btn-warning'
document.querySelector('.btn.btn-warning').addEventListener('click', async () => {
    startIndex += 20; // Increment the start index by 20
    await getPokemons(startIndex); // Fetch the next 20 Pokémon
});

updateSideNav();