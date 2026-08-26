const roomType = document.querySelector('[name="roomType"]');
const price = document.querySelector('[name="pricePerNight"]');
const guests = document.querySelector('[name="numOfGuests"]');
const total = document.querySelector('[name="total"]');
roomType.addEventListener('change', () => {
    const selectedOption = roomType.options[roomType.selectedIndex];
    price.value = selectedOption.dataset.price;
    guests.value = selectedOption.dataset.guests;
    if (checkIn.value && checkOut.value) {
        const numOfNights = (new Date(checkOut.value) - new Date(checkIn.value)) / (1000 * 60 * 60 * 24);
        total.value = price.value * numOfNights + " BHD";
    }
})
const checkIn = document.querySelector('[name="checkIn"]');
const checkOut = document.querySelector('[name="checkOut"]');
const today = new Date().toISOString().split('T')[0];
checkIn.min = today;
checkIn.addEventListener('change', () => {
    const date = new Date(checkIn.value);
    date.setDate(date.getDate() + 1);
    checkOut.disabled = false;
    checkOut.min = date.toISOString().split('T')[0];
    const numOfNights = (new Date(checkOut.value) - new Date(checkIn.value)) / (1000 * 60 * 60 * 24);
    if (checkOut.value) {
        total.value = price.value * numOfNights + " BHD";
        const date = new Date(checkOut.value);
        date.setDate(date.getDate() - 1);
        checkIn.max = date.toISOString().split('T')[0];
    }

})
checkOut.addEventListener('change', () => {
    const date = new Date(checkOut.value);
    date.setDate(date.getDate() - 1);
    checkIn.max = date.toISOString().split('T')[0];
    const numOfNights = (new Date(checkOut.value) - new Date(checkIn.value)) / (1000 * 60 * 60 * 24);
    total.value = price.value * numOfNights + " BHD";
})
