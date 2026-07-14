async function findRoute() {

    const source = document.getElementById("source").value.trim();

    const destination = document.getElementById("destination").value.trim();

    const vehicle = document.getElementById("vehicle").value;

    if (source === "" || destination === "") {
        alert("Please enter source and destination.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/route?source=${source}&destination=${destination}&vehicle=${vehicle}`);

        const data = await response.json();

        if (!data.path) {
            document.getElementById("result").innerHTML =
                "<h3>No Route Found</h3>";
            return;
        }

        document.getElementById("result").innerHTML = `
        
        <div class="result-box">
        
        <h3>🚦 Route Summary</h3>
        
        <p>📍 <b>Source:</b> ${source}</p>
        
        <p>🎯 <b>Destination:</b> ${destination}</p>
        
        <p>🛣️ <b>Route:</b><br>${data.path.join(" ➜ ")}</p>
        
        <p>📏 <b>Distance:</b> ${data.distance} KM</p>
        
        <p>🚗 <b>Vehicle:</b> ${vehicle}</p>
        
        <p>🚦 <b>Traffic:</b> ${data.traffic}</p>
        
        <p>⏱️ <b>Estimated Time:</b> ${data.estimatedTime} Hours</p>
        
        <p>⛽ <b>Fuel Cost:</b> ₹${data.fuelCost}</p>
        
        </div>
        
        `;

    } catch (err) {

        console.log(err);

        document.getElementById("result").innerHTML =
            "<h3>Server Error</h3>";

    }

}