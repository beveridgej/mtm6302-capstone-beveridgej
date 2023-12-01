
function showOverlay(button) {
  const pokemonString = button.getAttribute('data-pokemon');
  const pokemon = JSON.parse(pokemonString);
  const overlay = document.getElementById('overlay');
  if (overlay) {
    
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
        <img src="${pokemon.artworkImageUrl}"  class= "col-lg-6 order-first order-lg-last" alt="">
      </div>
    </div>`;
 
    
    overlay.style.display = 'block';


    const closeButton = document.getElementById('btnclose');
    closeButton.addEventListener('click', hideOverlay);
  }
}


function hideOverlay() {
  const overlay = document.getElementById('overlay');
  if (overlay) {
      
      overlay.style.display = 'none';
  }
}


const openBtn = document.querySelector('#openBtn');
const closeBtn = document.querySelector('#closeBtn');
const mySideNav = document.querySelector('#mySideNav');


openBtn.addEventListener('click', function() {
    mySideNav.style.width = '250px'; 
});



closeBtn.addEventListener('click', function() {
    mySideNav.style.width = '0'; 
});


const $pokemons = document.getElementById('pokemons')
let pokemons = [];

let startIndex = 1; 

async function getPokemons(start){
    const pokemons = []; 
    for(let i = start; i < start + 20; i++){ 
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + i);
        const data = await response.json();
        const pokemon = {
            name: data.name,
            spriteImageUrl: data.sprites.front_default,
            artworkImageUrl: data.sprites.other['official-artwork'].front_default,
            types: data.types.map(type => type.type.name), 
            abilities: data.abilities.map(ability => ability.ability.name), 
            moves: data.moves.slice(0, 2).map(move => move.move.name) 
        };
        pokemons.push(pokemon);
    }
    const html = buildPokemons(pokemons);
    $pokemons.innerHTML += html.join('');

    // Add event listeners to the new Pokemon cards
    const pokemonCards = document.querySelectorAll('.card.btn.mb-3.mx-auto.btn-outline-warning');
    pokemonCards.forEach(card => {
        card.addEventListener('click', function() {
            showOverlay(this);
        });
    });

    
    const pokemonCatchButtons = document.querySelectorAll('.pokemon-container');
    pokemonCatchButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pokemonString = this.previousElementSibling.getAttribute('data-pokemon');
            const pokemon = JSON.parse(pokemonString);
            catchPokemon(pokemon);
        });
    });
}


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
            <button class="pokemon-container position-absolute top-0 start-0 translate-middle p-2">
                <img src="/images/pokeball_on.png" id="toggleButton" class="toggleButton img-fluid"></img>
            </button>
        </div>
        `);
    }
    return html;
}

function catchPokemon(pokemon) {
  
  const index = caughtPokemon.findIndex(p => p.name === pokemon.name);
  if (index !== -1) {
      
      caughtPokemon.splice(index, 1);
  } else {
      
      caughtPokemon.push(pokemon);
  }
  
  localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));
  
  updateSideNav();
}

function updateSideNav() {
  
  const sideNav = document.querySelector('.sidenav .caught-container');
  
  sideNav.innerHTML = '';
  
  for (const pokemon of caughtPokemon) {
      const pokemonElement = document.createElement('img');
      pokemonElement.src = pokemon.spriteImageUrl;
      pokemonElement.alt = pokemon.name;
      pokemonElement.addEventListener('click', function() {
          catchPokemon(pokemon); 
      });
      sideNav.appendChild(pokemonElement);
  }
}
getPokemons(startIndex); 


document.querySelector('.btn.btn-outline-warning').addEventListener('click', async () => {
  startIndex += 20; 
  await getPokemons(startIndex); 
});

