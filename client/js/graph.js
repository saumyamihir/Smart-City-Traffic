const canvas = document.getElementById("graphCanvas");

const ctx = canvas.getContext("2d");

const cities = {

    Patna:{x:100,y:80},

    Hajipur:{x:300,y:120},

    Samastipur:{x:520,y:100},

    Muzaffarpur:{x:420,y:250},

    Motihari:{x:700,y:330}

};

const roads=[

["Patna","Hajipur"],

["Patna","Samastipur"],

["Hajipur","Muzaffarpur"],

["Samastipur","Muzaffarpur"],

["Muzaffarpur","Motihari"]

];

function drawGraph(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.lineWidth=3;

roads.forEach(r=>{

const a=cities[r[0]];

const b=cities[r[1]];

ctx.beginPath();

ctx.moveTo(a.x,a.y);

ctx.lineTo(b.x,b.y);

ctx.strokeStyle="#888";

ctx.stroke();

});

for(let city in cities){

const c=cities[city];

ctx.beginPath();

ctx.arc(c.x,c.y,20,0,Math.PI*2);

ctx.fillStyle="#0d6efd";

ctx.fill();

ctx.fillStyle="black";

ctx.fillText(city,c.x-20,c.y+35);

}

}

drawGraph();