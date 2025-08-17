const loginContainer = document.getElementById('login-container');
const passwordInput = document.getElementById('password-input');
const loginButton = document.getElementById('login-button');
const adminContent = document.getElementById('admin-content');
const locationForm = document.getElementById('location-form');
const locationIdInput = document.getElementById('location-id');
const locationNameInput = document.getElementById('location-name');
const locationTypeInput = document.getElementById('location-type');
const locationXInput = document.getElementById('location-x');
const locationYInput = document.getElementById('location-y');
const locationList = document.getElementById('location-list');

const PASSWORD = 'admin';

let locations = JSON.parse(localStorage.getItem('locations')) || [];

function saveLocations() {
    localStorage.setItem('locations', JSON.stringify(locations));
}

function renderLocations() {
    locationList.innerHTML = '';
    locations.forEach(location => {
        const li = document.createElement('li');
        li.textContent = `${location.name} (${location.type}) - [${location.x}, ${location.y}]`;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
            locationIdInput.value = location.id;
            locationNameInput.value = location.name;
            locationTypeInput.value = location.type;
            locationXInput.value = location.x;
            locationYInput.value = location.y;
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            locations = locations.filter(l => l.id !== location.id);
            saveLocations();
            renderLocations();
        };

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        locationList.appendChild(li);
    });
}

loginButton.addEventListener('click', () => {
    if (passwordInput.value === PASSWORD) {
        loginContainer.style.display = 'none';
        adminContent.style.display = 'block';
        renderLocations();
    } else {
        alert('Wrong password');
    }
});

locationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = {
        id: locationIdInput.value || Date.now().toString(),
        name: locationNameInput.value,
        type: locationTypeInput.value,
        x: parseInt(locationXInput.value),
        y: parseInt(locationYInput.value),
    };

    const existingIndex = locations.findIndex(l => l.id === location.id);
    if (existingIndex > -1) {
        locations[existingIndex] = location;
    } else {
        locations.push(location);
    }

    saveLocations();
    renderLocations();
    locationForm.reset();
    locationIdInput.value = '';
});
