

const trafficMultiplier = {
    Low: 1,
    Medium: 1.3,
    High: 1.6
};

const vehicleSpeed = {
    Car: 60,
    Bike: 45,
    Bus: 40
};

function calculateRoute(result, vehicle = "Car") {

    const traffic = "Medium";

    const speed = vehicleSpeed[vehicle] || 60;

    const estimatedTime =
        (result.distance / (speed / trafficMultiplier[traffic])).toFixed(2);

    const fuelCost = (result.distance * 5).toFixed(0);

    return {
        ...result,
        traffic,
        estimatedTime,
        fuelCost
    };
}

module.exports = calculateRoute;