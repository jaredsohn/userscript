// ==UserScript==
// @name          Function Map
// @namespace     http://d.hatena.ne.jp/arikui/
// @include       *
// ==/UserScript==

var fields = [
    new Field(
        new Circle(new Point(window.innerWidth / 2, window.innerHeight / 2), window.innerHeight / 2),
        function(){
            alert("center");
        }
    ),
    new Field(
        new Triangle(new Point(0, window.innerHeight), new Point(300, window.innerHeight), new Point(0, window.innerHeight - 300)),
        function(){
            alert("left bottom");
        }
    ),
    new Field(
        new Rectangle(new Point(window.innerWidth / 2, 0), window.innerWidth / 2, window.innerHeight),
        function(){
            alert("right");
        }
    )
];

fields.canvas = null;

fields.execute = function(x, y, e){
    var point = new Point(x, y);
    this.forEach(function(field){
        if(field.geom.inclusion(point))
            field.exec(field, e);
    });
};

fields.createMap = function(){
    var canvas = fields.canvas || document.createElement("canvas");

    canvas.style.left    = "0px";
    canvas.style.top     = window.pageYOffset + "px";
    canvas.style.display = "block";

    if(!fields.canvas){
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = "absolute";

        canvas.addEventListener("mouseup", function(e){
            fields.execute(e.clientX, e.clientY, e);
        }, false);
    
        this.forEach(function(field){
            var color = field.color || Field.color(Math.random());
            field.geom.draw(canvas, color);
        });
    
        fields.canvas = canvas;
        document.body.appendChild(canvas);
    }

    return canvas;
};

/* Field */
function Field(geom, exec){
    this.geom = geom;
    this.exec = exec;
};

Field.color = function(value){
    value  = value * 359;
    var ht = value * 6;
    var d  = ht % 360;
    
    var t2 = function(){
        return Math.round(((255 - d) / 360 * 255) / 255 * 255);
    };

    var t3 = function(){
        return Math.round((255 - (255 - d) / 360 * 255) / 255 * 255);
    };

    switch(Math.round(ht / 360)){
        case 0 : var r = [255, t3(), 0]; break;
        case 1 : var r = [t2(), 255, 0]; break;
        case 2 : var r = [0, 255, t3()]; break;
        case 3 : var r = [0, t2(), 255]; break;
        case 4 : var r = [t3(), 0, 255]; break;
        default: var r = [255, 0, t2()]; break;
    }

    return "rgba(" + r + ",0.3)";
}

/* key events */
var isMousedown = false;

var onmousedown = function(e){
    if(!e.ctrlKey || isMousedown)
        return;

    var callback = arguments.callee;
    isMousedown = true;

    setTimeout(function(){
        if(!isMousedown)
            return;

        document.removeEventListener("mousedown", callback, false);

            fields.createMap();
    }, 1000);
};

document.addEventListener("mousedown", onmousedown, false);

document.addEventListener("mouseup", function(e){
    isMousedown = false;
    document.addEventListener("mousedown", onmousedown, false);

    if(fields.canvas)
        fields.canvas.style.display = "none";
}, false);

/* geometories */
// point
function Point(x, y){
    this.x = x;
    this.y = y;
}

// polygon
function Polygon(){
    switch(arguments.length){
        case 3: return Triangle.apply(null, arguments);
    }

    this.points = Array.prototype.slice.apply(arguments, null);
    this.center = new Point(0, 0);

    this.points.forEach(function(point){
        this.center.x += point.x;
        this.center.y += point.y;
    });

    this.center.x /= this.points.length;
    this.center.y /= this.points.length;
}

Polygon.prototype.draw = function(canvas, color){
    var context = canvas.getContext("2d");

    context.fillStyle = color;
    context.beginPath();

    this.points.forEach(function(p, i){
        if(i == 0)
            context.moveTo(p.x, p.y);
        else
            context.lineTo(p.x, p.y);
    });

    context.lineTo(this.points[0].x, this.points[0].y);
    context.closePath();
    context.fill();
}

// triangle
function Triangle(){
    this.points = Array.prototype.slice.apply(arguments, null);
}

Triangle.prototype.inclusion = function(point){
    var rs = [
        (this.points[1].x - this.points[0].x) * (this.points[2].y - this.points[0].y)
      - (this.points[1].y - this.points[0].y) * (this.points[2].x - this.points[0].x),
        (this.points[2].y - this.points[0].y) * (point.x - this.points[0].x)
      - (this.points[2].x - this.points[0].x) * (point.y - this.points[0].y),
        (this.points[1].x - this.points[0].x) * (point.y - this.points[0].y)
      - (this.points[1].y - this.points[0].y) * (point.x - this.points[0].x)
    ];

    return (0 < rs[1] && 0 < rs[2] && 0 < rs[0] - rs[1] - rs[2])
        || (0 > rs[1] && 0 > rs[2] && 0 > rs[0] - rs[1] - rs[2]);
};

Triangle.prototype.draw = Polygon.prototype.draw;

// rectangle
function Rectangle(p, width, height){
    this.width  = width;
    this.height = height;
    this.points = [
        p,
        new Point(p.x + width, p.y),
        new Point(p.x + width, p.y + height),
        new Point(p.x, p.y + height)
    ];
}

Rectangle.prototype.inclusion = function(point){
    return point.x > Math.min(this.points[0].x, this.points[2].x)
        && point.x < Math.max(this.points[0].x, this.points[2].x)
        && point.y > Math.min(this.points[0].y, this.points[2].y)
        && point.y < Math.max(this.points[0].y, this.points[2].y);
}

Rectangle.prototype.draw = function(canvas, color){
    var context = canvas.getContext("2d");
    context.fillStyle = color;
    context.fillRect(this.points[0].x, this.points[0].y, this.width, this.height);
};

// circle
function Circle(point, r){
    this.center = point;
    this.r = r;
}

Circle.prototype.inclusion = function(point){
    var d = Math.sqrt(Math.pow(this.center.x - point.x, 2) + Math.pow(this.center.y - point.y, 2));
    return d <= this.r;
};

Circle.prototype.draw = function(canvas, color){
    var context = canvas.getContext("2d");
    context.fillStyle = color;
    context.beginPath();
    context.arc(this.center.x, this.center.y, this.r, 0, 2 * Math.PI, 1);
    context.fill();
}
