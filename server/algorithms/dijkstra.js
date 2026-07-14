const PriorityQueue = require("./priorityQueue");

function dijkstra(graph, start, end) {

    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();

    for (let city in graph.adjacencyList) {

        if (city === start) {

            distances[city] = 0;

            pq.enqueue(city, 0);

        }

        else {

            distances[city] = Infinity;

            pq.enqueue(city, Infinity);

        }

        previous[city] = null;

    }

    while (pq.values.length) {

        const smallest = pq.dequeue().node;

        if (smallest === end) {

            const path = [];

            let current = end;

            while (current) {

                path.push(current);

                current = previous[current];

            }

            return {
                path: path.reverse(),
                distance: distances[end]
            };

        }

        for (let neighbor of graph.adjacencyList[smallest]) {

            let candidate = distances[smallest] + neighbor.weight;

            if (candidate < distances[neighbor.node]) {

                distances[neighbor.node] = candidate;

                previous[neighbor.node] = smallest;

                pq.enqueue(neighbor.node, candidate);

            }

        }

    }

}

module.exports = dijkstra;