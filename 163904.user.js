// ==UserScript==
// @name        RotateImages
// @namespace   faleij
// @description    Provides an image rotation interface upon hovering the mousepointer over images
// @include     *
// @version     1
// @require     https://raw.github.com/Capatcha/raphael/master/raphael-min-2.1.0-GM.js
// @updateURL  	   http://userscripts.org/scripts/source/163904.meta.js
// ==/UserScript==
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft;
        curtop = obj.offsetTop;
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        }
    }
    return [curleft, curtop];
}

var snapp = function (interval, threshold) {
    var highThreshold = interval - threshold;
    return function (number) {
        var a = number % interval;
        var _a = Math.abs(a);
        if (_a < threshold) {
            if (a < threshold) return number - a;
            else return number + a;
        } else if (_a > highThreshold) {
            if (a > highThreshold) return number + interval - a;
            else return number + interval + a;
        } else return number;
    }
}

var lastImg = null;
var lastP = null;

var snapper = snapp(360 / 8, 7);
var rad = Math.PI / 180;

var handler = function (e) {
    //Cache Last post as its a slow recursive function
    var p;
    if (this === lastImg)
        p = lastP;
    else
        p = lastP = findPos(this);
    var image = lastImg = this;

    var cx = p[0] + (this.clientWidth / 2);
    var cy = p[1] + (this.clientHeight / 2);
    var x = e.pageX - cx;
    var y = e.pageY - cy;

    var w = Math.max(this.clientWidth, this.clientHeight) * 1.5;
    var h = w;

    var paper = Raphael(cx - (w / 2), cy - (h / 2), w, h);
    paper.canvas.style.opacity = 0.75;
    //paper.canvas.style.border = "none";
    var bbox = paper.rect(0, 0, w, h);
    bbox.attr("stroke-width",0);
    var r = Math.max(this.clientWidth, this.clientHeight) * 0.5 * 1.3;

    var circle = paper.circle(w / 2, h / 2, 10);
    circle.attr({
        "fill":"#f00",
        stroke:"#000000",
        "stroke-width":2
    });

    var t = paper.text(w / 2, h / 2, "Raphaël");
    t.attr({
        fill:"#000000"
    });

    var md = false;
    var startAngle = 90 * 3;
    var newStart = startAngle;

    //EVENTS

    circle.mousedown(function (_e) {
        md = true;

        var wMu = window.addEventListener("mouseup", function () {
            md = false;
            startAngle = newStart;
            window.removeEventListener("mouseup", wMu);
        });

        _e.preventDefault();
        return false;
    });

    paper.canvas.ondrag = "return false";

    paper.canvas.addEventListener("mousemove", function (_e) {
        if (md) {
            //var cx = this.offsetLeft + (this.clientWidth / 2);
            //var cy = this.offsetTop + (this.clientHeight / 2);
            var x = _e.pageX - cx;
            var y = _e.pageY - cy;
            var tetha = (Math.atan(y / x) / (Math.PI / 180));
            if (x < 0) {
                tetha += 180;
            }
            if (x >= 0 && y < 0) {
                tetha += 360;
            }
            var angle = snapper(tetha);
            p.attr({
                segment:[w/2, h/2, startAngle, angle]
            });
            newStart = angle;
            image.style.MozTransform = "rotate(" + angle + "deg)";
        }
    });

    paper.canvas.addEventListener("mouseout", function (_e) {
        if (!bbox.isPointInside(_e.pageX - (cx - (w / 2)), _e.pageY - (cy - (h / 2))))
            paper.remove();
    });

    //SEGMENT

    paper.customAttributes.segment = function (_x, _y, a1, a2) {
        a1 %= 360;
        a2 %= 360;
        //a2 += a1;

        var a3 = a2 - a1;
        var _a2 = a2;

        var flag = (a3) > 180 || ((a3) > -180 && a3 < 0),
            clr = Math.abs(a3) / 360;

        a1 *= rad;
        a2 *= rad;

        var ex = _x + r * Math.cos(a2);
        var ey = _y + r * Math.sin(a2);
        var scale = ex > _x ? 1 : -1;
        t.transform(["r", _a2, "t", r - 20, -5, "s", scale, scale]);
        circle.transform(["r", _a2, "t", r, 0]);
        t.attr({
            text:a3.toString().substr(0, 6)
        });
        return {
            path:[
                ["M", _x, _y],
                ["l", r * Math.cos(a1), r * Math.sin(a1)],
                ["A", r, r, 0, +flag, 1, ex, ey],
                ["z"]
            ]
            //fill:"hsb(" + clr + ", .75, .8)"
        };
    };

    var p = paper.path().attr({
        segment:[w / 2, h / 2, startAngle, startAngle + 90],
        stroke:"#000000",
        "stroke-width":2
    });

    t.toFront();
    circle.toFront();
};

function addHandler(collection) {
    for (var i = 0; i < collection.length; i++) collection[i].addEventListener("mouseover", handler);
}
document.body.addEventListener("DOMNodeInserted", function (e) {
    addHandler(e.target.querySelectorAll("img"));
});

addHandler(document.querySelectorAll("img"));