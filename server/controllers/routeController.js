const Graph = require("../algorithms/graph");
const dijkstra = require("../algorithms/dijkstra");
const roads = require("../data/roads");
const calculateRoute = require("../services/routeService");

const graph = new Graph();

roads.forEach((road) => {
    graph.addRoad(
        road.from,
        road.to,
        road.distance,
        road.traffic
    );
});

const findRoute = (req, res) => {

    const {
        source,
        destination,
        vehicle = "Car"
    } = req.query;

    if (!source || !destination) {
        return res.status(400).json({
            message: "Source and Destination are required"
        });
    }

    const result = dijkstra(graph, source, destination);

    if (!result) {
        return res.status(404).json({
            message: "Route not found"
        });
    }

    const finalResult = calculateRoute(result, vehicle);

    res.json(finalResult);

};

module.exports = { findRoute };