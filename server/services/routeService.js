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

    const timeInHours =
        result.distance / (speed / trafficMultiplier[traffic]);

    let estimatedTime;

    if (timeInHours < 1) {

        estimatedTime = `${Math.round(timeInHours * 60)} Minutes`;

    } else {

        const hours = Math.floor(timeInHours);
        const minutes = Math.round((timeInHours - hours) * 60);

        const hourText = hours === 1 ? "Hour" : "Hours";

        if (minutes === 0) {
            estimatedTime = `${hours} ${hourText}`;
        } else {
            estimatedTime = `${hours} ${hourText} ${minutes} Min`;
        }

    }

    const fuelCost = (result.distance * 5).toFixed(0);

    return {
        ...result,
        traffic,
        estimatedTime,
        fuelCost
    };
}

module.exports = calculateRoute;