async function loadCities() {

    try {

        const response = await fetch("http://localhost:5000/api/cities");

        const cities = await response.json();

        const source = document.getElementById("source");
        const destination = document.getElementById("destination");

        source.innerHTML = '<option value="">Select Source City</option>';
        destination.innerHTML = '<option value="">Select Destination City</option>';

        cities.forEach(city => {

            source.innerHTML += `<option value="${city}">${city}</option>`;
            destination.innerHTML += `<option value="${city}">${city}</option>`;

        });

    } catch (err) {

        console.error("Cities Error :", err);

    }

}

async function findRoute() {

    const btn = document.querySelector(".find-btn");

    btn.innerHTML = "Finding Route...";
    btn.disabled = true;

    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const vehicle = document.getElementById("vehicle").value;

    if (!source || !destination) {

        alert("Please select source and destination.");

        btn.innerHTML = "Find Best Route";
        btn.disabled = false;

        return;

    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/route?source=${source}&destination=${destination}&vehicle=${vehicle}`
        );

        const data = await response.json();

        if (!data.path) {

            document.getElementById("result").innerHTML =
                "<h3>No Route Found</h3>";

            btn.innerHTML = "Find Best Route";
            btn.disabled = false;

            return;

        }

        highlightedPath = data.path;
        drawGraph();
        drawRouteOnMap(data.path);
        
        loadNearbyPlaces(source);

        document.getElementById("result").innerHTML = `

<div class="result-box">

<h3>🚦 Route Summary</h3>

<p>📍 <b>Source :</b> ${source}</p>

<p>🎯 <b>Destination :</b> ${destination}</p>

<p>🛣️ <b>Route :</b><br>${data.path.join(" ➜ ")}</p>

<p>📏 <b>Distance :</b> ${data.distance} KM</p>

<p>🚗 <b>Vehicle :</b> ${vehicle}</p>

<p>
🚦 <b>Traffic :</b>

<span class="traffic-badge ${data.traffic.toLowerCase()}">
${data.traffic}
</span>

</p>

<p>⏱️ <b>Estimated Time:</b> ${data.estimatedTime}</p>

<p>⛽ <b>Fuel Cost :</b> ₹${data.fuelCost}</p>

</div>

`;

        btn.innerHTML = "Find Best Route";
        btn.disabled = false;

        setTimeout(() => {

            document.querySelector(".result-card").scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        }, 300);

    } catch (err) {

        console.error(err);

        btn.innerHTML = "Find Best Route";
        btn.disabled = false;

        document.getElementById("result").innerHTML =
            "<h3>⚠️ Server Error</h3>";

    }

}

loadCities();

async function loadNearbyPlaces(city) {

    try {

        const response = await fetch(
            `http://localhost:5000/api/places?city=${city}`
        );

        const places = await response.json();

        let html = "<ul>";

        places.forEach(place => {

            html += `<li>${place}</li>`;

        });

        html += "</ul>";

        document.getElementById("nearbyPlaces").innerHTML = html;

    } catch (err) {

        console.error(err);

    }

}