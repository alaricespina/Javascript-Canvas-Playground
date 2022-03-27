console.log("Script loaded");

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas)

var c = canvas.getContext('2d');

//Rectangles
c.fillStyle = "rgba(255,125,0, 0.5)";
c.fillRect(100, 100, 100, 100);
c.fillStyle = "rgba(125,125,0, 0.5)";
c.fillRect(400, 100, 100, 100);
c.fillStyle = "rgba(255,125,125, 0.5)";
c.fillRect(100, 300, 100, 100);

//console.log(canvas)

//Line
c.beginPath();
var x = Math.random() * window.innerWidth;
var y = Math.random() * window.innerHeight;

c.moveTo(x, y);
c.lineTo(x, y);
c.lineTo(400, 300);
c.lineTo(500, 200);
c.lineTo(50, 300);

c.strokeStyle = "red";
c.stroke();

//Circle
c.beginPath();
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = "green";
c.stroke();

//For Loop
for (var i = 0; i < 100; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    //var x = 300 + (i * 10);
    //var y = 300 - (i * 10);
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.stroke();
}