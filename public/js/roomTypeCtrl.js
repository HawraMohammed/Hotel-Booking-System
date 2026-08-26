const roomsContainer = document.querySelector('#rooms-container');
const addRoomButton = document.querySelector('#add-room');

addRoomButton.addEventListener('click', () => {
    const room = document.createElement('div');

    room.classList.add('room');

    room.innerHTML = `
            <label>Room Type</label>
            <select name="roomType">
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
            </select>

            <label>Price Per Night</label>
            <input type="number" name="pricePerNight" required>

            <label>Capacity</label>
            <input type="number" name="capacity" required>

            <label>Quantity</label>
            <input type="number" name="quantity" required>

            <button type="button" class="delete-button">
                Remove
            </button>
        `;

    roomsContainer.appendChild(room);
});

roomsContainer.addEventListener('click', (e) => {

    if (e.target.classList.contains('delete-button')) {
        e.target.parentElement.remove();
    }

});
