
// Gets the side navigation and main content elements
const mySideNav = document.getElementById("mySideNav");
const main = document.getElementById("main");

// Open sidenav function
function openNav() {
    mySideNav.style.width = "250px"; // Sets the width of the sidenav to 250px
    main.style.marginLeft = "250px"; // Moves the main content to the right by 250px
}

// Close sidenav function
function closeNav() {
    mySideNav.style.width = "0"; // Sets the width of the side navigation to 0
    main.style.marginLeft= "0"; // Move the main content back to the left
}

// Adds event listeners
document.addEventListener('openNav', openNav); // Adds event listeners for opening the sidenav
document.addEventListener('closeNav', closeNav); // Adds event listeners for opening the sidenav

const overlay = document.getElementById('overlay');  // Gets the overlay and button elements
const button = document.querySelector('.button'); 
const btnclose = document.getElementById('btnclose')



button.addEventListener('click', function() { // Add an event listener to the button for toggling the overlay
    
    if (overlay.style.display === 'none') {  // If the overlay is hidden, show it. Otherwise, hide it.
        overlay.style.display = 'block';
    } else {
        overlay.style.display = 'none';
    }
});


btnclose.addEventListener('click', function() { // Add an event listener to the close button for hiding the overlay
    overlay.style.display = 'none';
}); 


const sidebar = document.getElementById('mySideNav'); // Gets the sidebar and toggle button elements
const toggleButton = document.getElementById('toggleButton');

// Creates the image element with a grid in the sidenav
let img = document.createElement('img');
img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
sidebar.style.display = 'grid';
sidebar.style.gridTemplateColumns = '1fr'; 
sidebar.style.gridAutoRows = 'auto'; 
sidebar.style.justifyItems = 'center';


toggleButton.addEventListener('click', function() { // Adds an event listener to the toggle button for adding/removing the image
    
    if (sidebar.contains(img)) {  // If the image is in the sidebar, remove it
        
        sidebar.removeChild(img);  
    } else {
        
        sidebar.appendChild(img); // If the image is not in the sidebar, add it
    }
});