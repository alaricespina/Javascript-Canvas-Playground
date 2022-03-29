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
    this.darkest_color = "#33AED0";
    this.medium_color = "#3DC4EA";
    this.lightest_color = "#3AD3FE";

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

        this.raw_points = [origin, p1, p2, p3, p4, p5, p6];
    }

    this.draw_planes = function() {

        c.fillStyle = this.medium_color;
        // Plane 1 - Right
        c.beginPath();
        c.moveTo(this.raw_points[0].x, this.raw_points[0].y);
        c.lineTo(this.raw_points[1].x, this.raw_points[1].y);
        c.lineTo(this.raw_points[2].x, this.raw_points[2].y);
        c.lineTo(this.raw_points[5].x, this.raw_points[5].y);
        c.lineTo(this.raw_points[0].x, this.raw_points[0].y);
        c.closePath()
        c.fill();

        c.fillStyle = this.darkest_color;
        // Plane 2 - Left
        c.beginPath();
        c.moveTo(this.raw_points[0].x, this.raw_points[0].y);
        c.lineTo(this.raw_points[1].x, this.raw_points[1].y);
        c.lineTo(this.raw_points[3].x, this.raw_points[3].y);
        c.lineTo(this.raw_points[4].x, this.raw_points[4].y);
        c.lineTo(this.raw_points[0].x, this.raw_points[0].y);
        c.closePath()
        c.fill();

        // Plabe 3 - Top
        c.fillStyle = this.lightest_color;
        c.beginPath();
        c.moveTo(this.raw_points[0].x, this.raw_points[0].y);
        c.lineTo(this.raw_points[5].x, this.raw_points[5].y);
        c.lineTo(this.raw_points[6].x, this.raw_points[6].y);
        c.lineTo(this.raw_points[4].x, this.raw_points[4].y);
        c.lineTo(this.raw_points[0].x, this.raw_points[0].y);
        c.closePath()
        c.fill();
    
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
    var width = 1;
    var length = 1;
    var height = 1;
    var mid_x = innerWidth/2;
    var mid_y = innerHeight/2;

    NewCube = create_cube_once(width, length, height, mid_x, mid_y);
    NewCube.draw_figure();
   
    
}

function static_draw(){ 
    var width = 200;
    var length = 200;
    var height = 200;
    var mid_x = innerWidth/2;
    var mid_y = innerHeight/2;

    NewCube = create_cube_once(width, length, height, mid_x, mid_y);
    NewCube.calculate_points();
    NewCube.draw_planes();
   
    
}

var max_width = 200;
var max_height = 200;
var max_length = 200;
var mid_x = innerWidth/2;
var mid_y = innerHeight/2;
var dw = 2;
var dh = 2;
var dl = 2;

var state = 0;

function animate() {
    
    if (evaluateBounds(max_width, max_height, max_length, state)){
        state += 1;
        console.log(state);
    }
    if (state > 5){
        state = 0;
    }

    evaluateState(state);
   
    c.clearRect(0, 0, innerWidth, innerHeight);

    NewCube.draw_figure();


    requestAnimationFrame(animate);
    
}

function evaluateBounds(max_width, max_height, max_length, state){
    var cond1 = (NewCube.width >= max_width) && (state == 0);
    var cond2 = (NewCube.height >= max_height) && (state == 1);
    var cond3 = (NewCube.length >= max_length) && (state == 2);
    var cond4 = (NewCube.width <= 0) && (state == 3);
    var cond5 = (NewCube.height <= 0) && (state == 4);
    var cond6 = (NewCube.length <= 0) && (state == 5);
    var result = cond1 || cond2 || cond3 || cond4 || cond5 || cond6;
    return result;
}

function evaluateState(state) {
    // 0 - Width, 1 - Height, Length - 2
    // 3 - Width <, 4 - Height <, 5 - Length <
    switch (state) {
        case 0:
            NewCube.width += dw;
            break;
        case 1:
            NewCube.height += dh;
            break;
        case 2:
            NewCube.length += dl;
            break;
        case 3:
            NewCube.width -= dw;
            break;
        case 4:
            NewCube.height -= dh;
            break;
        case 5:
            NewCube.length -= dl;
            break;

    }
}

static_draw();
//init();
//animate();



