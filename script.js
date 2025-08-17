// This is the script file for the class navigator.

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const mapContainer = document.getElementById('map-container');

const locations = JSON.parse(localStorage.getItem('locations')) || [];

function renderLocations() {
    mapContainer.innerHTML = '';
    locations.forEach(location => {
        const locationEl = document.createElement('div');
        locationEl.className = 'location';
        locationEl.classList.add(location.type);
        locationEl.style.left = `${location.x}px`;
        locationEl.style.top = `${location.y}px`;
        locationEl.textContent = location.name;
        mapContainer.appendChild(locationEl);
    });
}

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const foundLocation = locations.find(l => l.name.toLowerCase().includes(searchTerm));

    // Remove previous highlights
    document.querySelectorAll('.location.highlight').forEach(el => {
        el.classList.remove('highlight');
    });

    if (foundLocation) {
        const locationEl = Array.from(mapContainer.children).find(
            el => el.textContent === foundLocation.name
        );
        if (locationEl) {
            locationEl.classList.add('highlight');
        }
    } else if (searchTerm) {
        alert('Location not found');
    }
});

// Initial render
renderLocations();
