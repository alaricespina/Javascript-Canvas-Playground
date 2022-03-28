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
    this.x_cords = x;
    this.y_cords = y;
    this.length = l;
    this.width = w;
    this.height = h;
    this.points = []

    this.calculate_points = function() {
        var origin = new Point(this.x_cords, this.y_cords);
        var p1 = new Point(this.x_cords, this.y_cords + this.height);
        var p2 = this.get_angled_points(p1.x, p1.y, 45, this.width);
        var p3 = this.get_angled_points(p1.x, p1.y, 135, this.length);
        var p4 = new Point(p3.x, p3.y - this.height);
        var p5 = new Point(p2.x, p2.y - this.height);
        //var p6 = new Point(this.x_cords, this.y_cords - this.height);
        var p6 = this.get_angled_points(p4.x, p4.y , 45, this.width);
        
        var raw_points = [origin, p1 ,p2 ,p3 ,p4, p5, p6];
        for (var i = 0; i < raw_points.length; i++){
            //console.log("Point: " + raw_points[i].x + " " + raw_points[i].y);
        }

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
            c.strokeStyle = "white";
            c.stroke();

        }
    }

    this.draw_figure = function() {
        this.calculate_points();
        this.draw_connectors();
    }

    this.convert_to_radians = function(degrees) {
        return degrees * (Math.PI/180);
    }

    this.get_angled_points = function(px, py, degree, length){
        var degrees = this.convert_to_radians(degree);
        var angled_x = px + length * Math.cos(degrees);
        var angled_y = py - length * Math.sin(degrees);

        return new Point(angled_x, angled_y)

    }
}

function create_cube_once(w, l , h, cx, cy) {
    var mid_x = cx;
    var mid_y = cy;
    var width = w;
    var length = l;
    var height = h;
    mid_y += width - height;

    var TestCube = new Rect3D(mid_x, mid_y, length, width, height);
    return TestCube;

}

var NewCube;

function init(){ 
    var width = 100;
    var length = 100;
    var height = 100;
    var mid_x = innerWidth/2;
    var mid_y = innerHeight/2;

    NewCube = create_cube_once(width, length, height, mid_x, mid_y);
    NewCube.draw_figure();
   
    
}

init();




