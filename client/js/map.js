
let map = L.map('map').setView([26.6, 85.1], 8);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '© OpenStreetMap contributors'
    }
).addTo(map);

const cityCoordinates = {

    Patna: [25.5941, 85.1376],
    Hajipur: [25.6850, 85.2090],
    Samastipur: [25.8620, 85.7795],
    Muzaffarpur: [26.1225, 85.3906],
    Motihari: [26.6486, 84.9089]

};

let routeLine = null;

Object.keys(cityCoordinates).forEach(city => {

    L.marker(cityCoordinates[city])
        .addTo(map)
        .bindPopup(city);

});

function drawRouteOnMap(path) {

    if (routeLine) {

        map.removeLayer(routeLine);

    }

    const coordinates = path.map(city => cityCoordinates[city]);

    routeLine = L.polyline(coordinates, {

        color: "#22c55e",
        weight: 6,
        opacity: 0.9

    }).addTo(map);

    map.fitBounds(routeLine.getBounds(), {

        padding: [50, 50]

    });

}