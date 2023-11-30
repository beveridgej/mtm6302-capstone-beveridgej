

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





// const sidebar = document.getElementById('mySideNav'); // Gets the sidebar and toggle button elements
// const toggleButton = document.getElementById('toggleButton');

// // // Creates the image element with a grid in the sidenav
// let img = document.createElement('img');
// // <img src="${pokemon.spriteImageUrl}" class=" button card-img-top" alt="">;
// sidebar.style.display = 'grid';
// sidebar.style.gridTemplateColumns = '1fr'; 
// sidebar.style.gridAutoRows = 'auto'; 
// sidebar.style.justifyItems = 'center';



// toggleButton.addEventListener('click', function() { // Adds an event listener to the toggle button for adding/removing the image
    
//     if (sidebar.contains(img)) {  // If the image is in the sidebar, remove it
        
//         sidebar.removeChild(img);  
//     } else {
        
//         sidebar.appendChild(img); // If the image is not in the sidebar, add it
//     }
// });



// DOM elements
const $pokemons = document.getElementById('pokemons')
let pokemons = [];


function parseUrl (url) {
    return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1)
}



let startIndex = 1; // Start index for the Pokemon to fetch

async function getPokemons(start){
    const pokemons = []; // Array to store all the Pokemon data
    for(let i = start; i < start + 20; i++){ // Fetch data for 20 Pokemons starting from 'start'
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + i);
        const data = await response.json();
        const pokemon = {
            name: data.name,
            spriteImageUrl: data.sprites.front_default,
            artworkImageUrl: data.sprites.other['official-artwork'].front_default
            
        };
        pokemons.push(pokemon);

    }
    const html = buildPokemons(pokemons);
    $pokemons.innerHTML += html.join(''); // Append the new Pokemon to the existing ones
}

function buildPokemons(pokemons){
    const html = [];
    for(const pokemon of pokemons){
        html.push(`
        <div class="col-lg-3 d-flex justify-content-center"> 
            <button class="card btn mb-3 mx-auto btn-outline-warning" onclick="showOverlay('${pokemon.artworkImageUrl}')"> 
                <div class="card-body align-items-center d-flex flex-column justify-content-center">
                    <img src="${pokemon.spriteImageUrl}" class=" button card-img-top" alt="">  
                    <img src="/images/pokeball_on.png" id="toggleButton" class="toggleButton position-absolute top-0 start-0 translate-middle p-2"></img> 
                    <h5 class="card-title">${pokemon.name}</h5>  
                </div>
            </button>   
        </div>
         
       
        `);
        
        
    }
    
    return html;
}



getPokemons(startIndex); // Fetch the first 20 Pokemon



document.querySelector('.btn.btn-outline-warning').addEventListener('click', () => {
    startIndex += 20; // Increment the start index by 20
    getPokemons(startIndex); // Fetch the next 20 Pokemon
});


function showOverlay(imageUrl) {
    const overlay = document.getElementById('overlay');
    if (overlay) {
      // Add the image to the overlay
      overlay.innerHTML = `
      <span id="btnclose" class="close" onclick="hideOverlay()">&times;</span>
      <div class="container-fluid text-center px-5 mt-5" id="pokemonsHd"> 
        <div class="row">
          <h5 class="over mx-2 col-lg-2 order-0 order-sm-0 order-md-0 order-lg-0"> Type</h5>
          <h5 class="over col-lg-2 mx-2 order-2 order-sm-2 order-md-2 order-lg-0"> Abilities</h5>
          <h5 class="over col-lg-2 mx-2 order-4 order-sm-4 order-md-4 order-lg-0"> Moves</h5>
          <div class="w-100 d-none d-lg-block"> </div>
          <p class= "over  mx-2 col-lg-2 order-1 order-sm-1 order-md-1"> hfahjfkjsdh <br> kjshfsdkjfhsdj</p>
          <p class= "over mx-2 col-lg-2 order-3 order-sm-3 order-md-3"> hfahjfkjsdh <br> kjshfsdkjfhsdj</p>
          <p class= "over mx-2 col-lg-2 order-5 order-sm-5 order-md-5"> hfahjfkjsdh <br> kjshfsdkjfhsdj</p>
          <img src="${imageUrl}"  class= "col-lg-3 order-first order-lg-last" alt="">
        </div>
      </div>`;
   
  
      // Show the overlay
      overlay.style.display = 'block';
    }
  }
  
  // Function to hide the overlay
  function hideOverlay() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }