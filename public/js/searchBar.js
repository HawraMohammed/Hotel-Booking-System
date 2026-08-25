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

    hotelList.innerHTML = "";

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
                        <p>
                            ${service}
                        </p>
                    </div>
                `).join('')}

            </div>

            <div class="rooms">

                ${hotel.rooms.map((room) => `
                    <div class="room">
                        <p>
                            ${room.type}
                            ${room.pricePerNight}
                        </p>
                    </div>
                `).join('')}

            </div>

        </div>
    `;
    });
};

search.addEventListener('input', getHotels);
filter.addEventListener('change', getHotels);

