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

            <div class="pict-details">

                <div class="picture">
                    <img src="${hotel.pictures[0].url}">
                </div>

                <div class="details">

                    <h2>
                        ${hotel.name}
                    </h2>

                    <p>
                        ${hotel.location}
                    </p>

                    <p>
                        ${hotel.description}
                    </p>

                </div>

                <div class="buttons">

                    <a href="/hotels/${hotel._id}">
                        View
                    </a>

                    <a href="/hotels/${hotel._id}/reservations/new">
                        Reserve now!!
                    </a>

                </div>

            </div>

            <div class="services">

                ${hotel.services.map((service) => `
                    <div class="service">
                         <span>
                                            <i class="${serviceIcons[service]}"></i>
                                          ${service}
                                        </span>
                    </div>
                `).join('')}

            </div>

            <div class="rooms">

                ${hotel.rooms.map((room) => `
                    <div class="room">
                       <span>
                                            <i class="${roomIcons[room.type]}"></i>
                                          ${room.type}
                                                ${room.pricePerNight} BHD
                                        </span>
                    </div>
                `).join('')}

            </div>

        </div>
    `;
    });
};
getHotels();
search.addEventListener('input', getHotels);
filter.addEventListener('change', getHotels);

