console.log("Script loaded");

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas)

var c = canvas.getContext('2d');



var colorArray = [
    '#952E5D',
    '#E24756',
    '#351A70',
    '#FDC64E',
    '#FC7E4B'
];

function ChainEnds(x, y){
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw_circle = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    

    this.draw = function() {
        c.beginPath();
        this.draw_circle();
    }
}

function Connectors(points_array){
    this.draw_connections = function() {
        for (var i = 0; i < points_array.length-1; i++){
            this.draw_line_between(
            points_array[i].x,
            points_array[i].y,
            points_array[i+1].x,
            points_array[i+1].y
            );
        }
    }
    this.draw_line_between = function(startx, starty, endx, endy) {
        c.beginPath();
        c.moveTo(startx, starty);
        c.lineTo(endx, endy);
        c.stroke();
    }
}

// Chain
connected_points = [];
var max_points = 100;

function init() {
    
    
    for (var i = 0; i < max_points; i++){
        var x = Math.random() * innerWidth;
        var y = Math.random() * innerHeight;

        connected_points.push(new ChainEnds(x, y));
    }


}

function draw_everything() {
    var Conn = new Connectors(connected_points);
    for (var i = 0; i < max_points; i++){
        connected_points[i].draw();
    }
    Conn.draw_connections();
}

init();
draw_everything();


