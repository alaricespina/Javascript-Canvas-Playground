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

function Point(x, y){
    this.x = x;
    this.y = y;
}

function Rect3D(x, y, l, w, h){
    this.x = x;
    this.y = y;
    this.length = l;
    this.width = w;
    this.height = h;
    this.points = []

    this.calculate_points = function() {
        origin = Point(this.x, this.y);
        p1 = Point(this.x, this.y + this.height);
        p2 = Point(this.get_angled_points(p1, 45, this.width));
        p3 = Point(this.get_angled_points(p1, 135, this.length));
        p4 = Point(p3.x, p3.y - this.height);
        p5 = Point(p2.x, p2.y - this.height);
        p6 = Point(this.x, this.y - this.height);
        //p6 = Point(this.get_angled_points(p3, 45, this.width));
        
        this.points = [
            [origin, p1], [origin, p4], [origin, p5],
            [p1, p2], [p1, p3],
            [p3, p4], [p4, p6],
            [p2, p5], [p5, p6]            
        ]
    }

    this.draw_connectors = function() {
        var x1, x2, y1, y2;

        for (var i = 0; i < this.points.length; i++){
            
            x1 = this.points[i][0].x;
            y1 = this.points[i][0].y;
            x2 = this.points[i][1].x;
            y2 = this.points[i][1].y;

            c.beginPath();
            c.moveTo(x1, y1);
            c.lineTo(x2, y2);
            c.stroke();

        }
    }

    this.convert_to_radians = function(degrees) {
        return degrees * (Math.PI/180);
    }

    this.get_angled_points = function(point, degree, length){
        degrees = this.convert_to_radians(degree);
        angled_x = point.x + length * Math.cos(degrees);
        angled_y = point.y + length * Math.sin(degrees);

        return new Point(angled_x, angled_y)

    }
}


function init(){ 
    var mid_x = innerWidth/2;
    var mid_y = innerHeight/2;
    var TestCube = new Rect3D(mid_x, mid_y, 100, 100, 100);
    TestCube.calculate_points();
    TestCube.draw_connectors();
}

init();



