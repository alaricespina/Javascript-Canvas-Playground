console.log("Script loaded");

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas)

var c = canvas.getContext('2d');

c.fillRect(100, 100, 100, 100);
c.fillRect(400, 100, 100, 100);
c.fillRect(100, 300, 100, 100);

console.log(canvas)