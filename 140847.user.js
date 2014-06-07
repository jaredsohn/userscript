// ==UserScript==
// @name          Planets.nu show ship history
// @description   Turns on showing ship movement history by default
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://play.planets.nu/*
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @version 0.5
// ==/UserScript==

function wrapper () { // wrapper for injection

var old_ShipScreen_load = vgapShipScreen.prototype.load;
vgapShipScreen.prototype.load = function(ship) {
        old_ShipScreen_load.apply(this, arguments);
        vgap.shipScreen.showShipLocHistory = true;
        vgap.shipScreen.draw();
    };
    
var old_Map_load = vgapMap.prototype.load;
vgapMap.prototype.load = function () {
        old_Map_load.apply(this, arguments);
        this.rangeCircles = true;
    };
    
vgapMap.prototype.drawShipHistory = function (ship) {
        var x1 = ship.x;
        var y1 = ship.y;
        var opacity = 1;
        for (var i = 0; i < ship.history.length; i++) {
            var loc = ship.history[i];
            var x2 = loc.x;
            var y2 = loc.y;
            opacity *= 0.75;
            var attr = { stroke: "lightblue", "stroke-width": "1", "stroke-dasharray": "- ", "stroke-opacity": opacity };
            vgap.map.special.push(vgap.map.paper.path("M" + vgap.map.screenX(x1) + " " + vgap.map.screenY(y1) + "L" + vgap.map.screenX(x2) + " " + vgap.map.screenY(y2)).attr(attr));
            x1 = x2;
            y1 = y2;
        }

    };
    
vgapMap.prototype.drawAllShipHistory = function () {
        for (var i = 0; i < vgap.myships.length; i++) {
            vgap.map.drawShipHistory(vgap.myships[i]);
        }
    };
    
if (vgap.version < 3) {

var oldLoadControls = vgapMap.prototype.loadControls; 
vgapMap.prototype.loadControls = function () {

        oldLoadControls.apply(this, arguments);
        
        var additem = "<li onclick='vgap.map.drawAllShipHistory();'>Ship Trails</li>";
        
        //$("#MapTools").append(additem);
        $("#MapTools > li:contains('Connections (q)')").after(additem);

        var height = this.controls.height() - this.toolsMenu.height();
        this.controls.css("marginTop", "-" + this.controls.height() + "px");

    };
    
}
    
//
}
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
document.body.removeChild(script);

