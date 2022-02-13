console.log("Script loaded");

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas)

var c = canvas.getContext('2d');

//Circle

function Circle(x, y, dx, dy, radius) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;

    this.draw = function() {
        //console.log("Hello Circle created")
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "green";

        c.stroke();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
    

}



var circleArray = []


for (var i = 0; i < 100; i++){
    var amp = 20;
    var radius = 30;
    var x = Math.random() * (innerWidth - (2 * radius)) + radius;
    var y = Math.random() * (innerHeight - (2 * radius)) + radius;
    var dx = (Math.random() - 0.5) * amp;
    var dy = (Math.random() - 0.5) * amp;
    
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

console.log(circleArray);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

}

animate();
