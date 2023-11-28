
// // Gets the side navigation and main content elements
// const mySideNav = document.getElementById("mySideNav");
// const main = document.getElementById("main");

// // Open sidenav function
// function openNav() {
//     mySideNav.style.width = "250px"; // Sets the width of the sidenav to 250px
//     main.style.marginLeft = "250px"; // Moves the main content to the right by 250px
// }

// // Close sidenav function
// function closeNav() {
//     mySideNav.style.width = "0"; // Sets the width of the side navigation to 0
//     main.style.marginLeft= "0"; // Move the main content back to the left
// }

// // Adds event listeners
// document.addEventListener('openNav', openNav); // Adds event listeners for opening the sidenav
// document.addEventListener('closeNav', closeNav); // Adds event listeners for opening the sidenav

// const overlay = document.getElementById('overlay');  // Gets the overlay and button elements
// const button = document.querySelector('.button'); 
// const btnclose = document.getElementById('btnclose')



// // button.addEventListener('click', function() { // Add an event listener to the button for toggling the overlay
    
//     // if (overlay.style.display === 'none') {  // If the overlay is hidden, show it. Otherwise, hide it.
//         // overlay.style.display = 'block';
//     // } else {
//         // overlay.style.display = 'none';
//     // }
// // });


// btnclose.addEventListener('click', function() { // Add an event listener to the close button for hiding the overlay
//     overlay.style.display = 'none';
// }); 


// const sidebar = document.getElementById('mySideNav'); // Gets the sidebar and toggle button elements
// const toggleButton = document.getElementById('toggleButton');

// // Creates the image element with a grid in the sidenav
// let img = document.createElement('img');
// img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
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
function parseUrl (url) {
    return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1)
}



let result = parseUrl("https://pokeapi.co/api/v2/pokemon/");
console.log(result);


// DOM elements
const $pokemons = document.getElementById('pokemons')

// let books = []
let pokemons = []



// Function to display all the books

function buildPokemons(pokemons){

    const html = []

    for( const pokemon of pokemons){
        html.push(`

        <button class="card btn w-75 mb-3 mx-auto btn-outline-warning">  
            <div  class="card-body">
                <img src="${pokemon.return[0].sprites.front_default}" class=" button card-img-top" alt="${pokemon.name}">  
                <img src="/images/pokeball_on.png" id="toggleButton" class="position-absolute top-0 start-0 translate-middle p-2"></img> 
                <h5 class="card-title">${pokemon.name}</h5>  
            </div>
        </button>   
`)
    }

    return html
}

// Fetch
// fetch('https://pokeapi.co/api/v2/pokemon + id')
//   .then(response => response.json())
//   .then(json => console.log(json))

async function getPokemons(){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`)
    data = await response.json()

    console.log(data)
    const html = buildPokemons(pokemons)

    $pokemons.innerHTML = html.join('')
}

getPokemons()
// buildWishList()



//Display details

// async function getBook(id){
//     const response = await fetch('https://pokeapi.co/api/v2/pokemon' + id)
//     const obj = await response.json()

//     $books.innerHTML = `
//     <a href="" class="col-6 mb-3">
//         <img src="${obj.image}" alt="" class="img-fluid">
//     </a>
//     <div class="col-6">
//         <h1>${obj.title}</h1>
//         <p>${obj.description}</p>
//         <button class="back btn btn-secondary">Back</button>
//         <button class="save btn btn-primary"
//             data-id="${obj.id}"
//             data-title="${obj.title}"
//             data-description="${obj.description}"
//             data-image="${obj.image}"
//         >+</button>
//         <button class="remove btn btn-danger" data-id="${obj.id}">-</button>
        
//     </div>
//     `

// }


// $seussology.addEventListener('click', function(e){
//     e.preventDefault()

//     if(e.target.closest('.book')){
//         getBook(e.target.closest('.book').dataset.id)
//     }else if(e.target.classList.contains('back')){
//         getBooks()
//     }else if(e.target.classList.contains('save')){
//         if(!save.find(book => book.id === e.target.dataset.id)){
//             save.push({
//                 id: e.target.dataset.id,
//                 title: e.target.dataset.title,
//                 description: e.target.dataset.description,
//                 image: e.target.dataset.image
//             })
            
//             localStorage.setItem('save', JSON.stringify(save))
//             buildWishList()
//         }
//     }else if(e.target.classList.contains('remove')){
//         console.log(e.target.dataset.id)
//         const index = save.findIndex( book => book.id === e.target.dataset.id )
//         console.log(index)
//         if(index >= 0){
//             save.splice(index, 1)
//             localStorage.setItem('save',JSON.stringify(save))
//             buildWishList()

//         }

//     }


// })


// function buildWishList(){
//     const ls = JSON.parse(localStorage.getItem('save'))

//     if(ls){
//         save = ls
//     }
//     const html = buildBooks(save)
//     $wishList.innerHTML = html.join('')
// }
