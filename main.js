const mySideNav = document.getElementById("mySideNav");
const main = document.getElementById("main");

// Open navigation
function openNav() {
    mySideNav.style.width = "250px";
    main.style.marginLeft = "250px";
}

// Close navigation
function closeNav() {
    mySideNav.style.width = "0";
    main.style.marginLeft= "0";
}

// Add event listeners
document.addEventListener('openNav', openNav);
document.addEventListener('closeNav', closeNav);

const overlay = document.getElementById('overlay'); // 
const button = document.querySelector('.button'); // 
const btnclose = document.getElementById('btnclose')
// Initially hide the overlay


button.addEventListener('click', function() {
    // If the overlay is hidden, show it. Otherwise, hide it.
    if (overlay.style.display === 'none') {
        overlay.style.display = 'block';
    } else {
        overlay.style.display = 'none';
    }
});


btnclose.addEventListener('click', function() {
  overlay.style.display = 'none';
}); 


const sidebar = document.getElementById('mySideNav');
const toggleButton = document.getElementById('toggleButton');

// Create the image element
let img = document.createElement('img');
img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
sidebar.style.display = 'grid';
sidebar.style.gridTemplateColumns = '1fr'; 
sidebar.style.gridAutoRows = 'auto'; 
sidebar.style.justifyItems = 'center';


toggleButton.addEventListener('click', function() {
    
    if (sidebar.contains(img)) {
        // If it is, remove it
        sidebar.removeChild(img);
    } else {
        // If it's not, add it
        sidebar.appendChild(img);
    }
});