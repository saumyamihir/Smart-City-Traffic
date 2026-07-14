const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

const cities = {
    Patna: { x: 170, y: 110 },
    Hajipur: { x: 430, y: 150 },
    Samastipur: { x: 730, y: 130 },
    Muzaffarpur: { x: 600, y: 290 },
    Motihari: { x: 980, y: 340 }
};

const roads = [
    ["Patna", "Hajipur"],
    ["Patna", "Samastipur"],
    ["Hajipur", "Muzaffarpur"],
    ["Samastipur", "Muzaffarpur"],
    ["Muzaffarpur", "Motihari"]
];

let highlightedPath = [];

function drawGraph() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    roads.forEach(road => {

        const a = cities[road[0]];
        const b = cities[road[1]];

        const isHighlighted = highlightedPath.some((_, i) => {
            if (i === highlightedPath.length - 1) return false;

            return (
                (highlightedPath[i] === road[0] &&
                    highlightedPath[i + 1] === road[1]) ||

                (highlightedPath[i] === road[1] &&
                    highlightedPath[i + 1] === road[0])
            );
        });

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        ctx.lineWidth = isHighlighted ? 6 : 3;
        ctx.strokeStyle = isHighlighted ? "#28a745" : "#888";

        ctx.stroke();

    });

    for (let city in cities) {

        const c = cities[city];

        ctx.beginPath();
        ctx.arc(c.x, c.y, 20, 0, Math.PI * 2);

       ctx.fillStyle = highlightedPath.includes(city)
    ? "#22c55e"
    : "#2563eb";

ctx.shadowColor = "rgba(37,99,235,.35)";
ctx.shadowBlur = 10;

ctx.fill();

ctx.shadowBlur = 0;

ctx.fillStyle = "#1e293b";
ctx.font = "bold 15px Poppins";
ctx.fillText(city, c.x - 28, c.y + 38);

    }

}

drawGraph();