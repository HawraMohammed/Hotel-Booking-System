const roomIcons = {
    "Single": "fa-solid fa-bed",
    "Double": "fa-solid fa-bed-pulse",
    "Suite": "fa-solid fa-hotel"
};
const serviceIcons = {
    "Wifi": "fa-solid fa-wifi", "Swimming Pool": "fa-solid fa-person-swimming"
    , "Room Service": "fa-solid fa-bell-concierge", "View": "fa-solid fa-mountain-sun", "Gym"
        : "fa-solid fa-dumbbell", "Spa": "fa-solid fa-spa", "Parking": "fa-solid fa-square-parking"
    , "Non-smoking rooms": "fa-solid fa-ban-smoking"
};

const search = document.querySelector('#search');
const filter = document.querySelector('#filter');
const hotelList = document.querySelector('.hotels-list');

async function getHotels() {

    const response = await fetch('/hotels', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            search: search.value,
            filter: filter.value,
            action: search.value ? "search" : "filter"
        })
    });

    const hotels = await response.json();

    console.log(hotels);

    hotelList.innerHTML = `
    ${hotels.length === 0 ? '<p>No hotels found</p>' : ''}
`;
    hotels.forEach((hotel) => {

        hotelList.innerHTML += `
        <div class="hotel-container">

            <div class="hotel-main">

                <div class="picture">
                    <img src="${hotel.pictures[0].url}" alt="${hotel.name}">
                </div>

                <div class="hotel-details">

                    <h2>${hotel.name}</h2>

                    <p class="location">
                        <i class="fa-solid fa-location-dot"></i>
                        ${hotel.location}
                    </p>

                    <p class="description">
                        ${hotel.description}
                    </p>

                    <div class="hotel-buttons">

                        <a href="/hotels/${hotel._id}" class="view-button">
                            View
                        </a>

                        <a href="/hotels/${hotel._id}/reservations/new"
                           class="reserve-button">
                            Reserve Now
                        </a>

                    </div>

                </div>

            </div>


            <div class="hotel-info">

                <div class="services">

                    <h3>Services</h3>

                    <div class="service-list">

                        ${hotel.services.map((service) => `
                            <div class="service">
                                <i class="${serviceIcons[service]}"></i>
                                <span>${service}</span>
                            </div>
                        `).join('')}

                    </div>

                </div>


                <div class="rooms">

                    <h3>Rooms</h3>

                    ${hotel.rooms.map((room) => `
                        <div class="room">

                            <div>
                                <i class="${roomIcons[room.type]}"></i>
                                <span>${room.type}</span>
                          

                            <strong>
                                ${room.pricePerNight} BHD
                                <small>/ night</small>
                            </strong>
  </div>
                        </div>
                    `).join('')}

                </div>

            </div>

        </div>
    `;
    });
}
getHotels();
search.addEventListener('input', getHotels);
filter.addEventListener('change', getHotels);

