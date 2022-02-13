console.log("Script loaded");

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas)

var c = canvas.getContext('2d');

// Event Listener 

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
    }
);

window.addEventListener('resize',
    function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    })


// Circle

var colorArray = [
    '#952E5D',
    '#E24756',
    '#351A70',
    '#FDC64E',
    '#FC7E4B'
];
var circleArray = [];

function Circle(x, y, dx, dy, radius) {
    
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.base_radius = radius;
    this.max_radius = 40;
    this.grow = 1;

    this.draw = function() {
        //console.log("Hello Circle created")
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
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
        
        // Mouse Interaction 

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && 
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < this.max_radius) {
                this.radius += this.grow;
            }
            
        } else if (this.radius > this.base_radius) {
            this.radius -= 1;
        }
        this.draw();
    }
    

}






// console.log(circleArray);

function init() {
    circleArray = [];
    for (var i = 0; i < 2000; i++){
        var amp = 5;
        var radius = 3;
        var x = Math.random() * (innerWidth - (2 * radius)) + radius;
        var y = Math.random() * (innerHeight - (2 * radius)) + radius;
        var dx = (Math.random() - 0.5) * amp;
        var dy = (Math.random() - 0.5) * amp;
        
        circleArray.push(new Circle(x, y, dx, dy, radius));
        //console.log("Circle Color: " + circleArray[i].color + " " + colorArray[Math.floor(Math.random() * colorArray.length)]) 
    }
    
}

init();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
        
    }

}

animate();
