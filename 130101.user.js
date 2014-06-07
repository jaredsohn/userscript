// ==UserScript==
// @name          Planets.nu show mine hits
// @description   Adds mine hits to starmap. Normal size X for fatal hit, small x for non-fatal. Different colors for web vs. normal nit.
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://play.planets.nu/*
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @version 0.4
// ==/UserScript==

function wrapper () { // wrapper for injection

//alert("run");

if (vgap.version < 3) {

    vgapMap.prototype.drawExplosions = function () {
            this.explosions.remove();
            this.explosions = this.paper.set();
            for (var i = 0; i < vgap.messages.length; i++) {
                var message = vgap.messages[i];
                if (message.messagetype == 10) {
    
                    var attr = { stroke: "#ff00ff", "stroke-width": "2", "stroke-opacity": 0.5 };
                    var x = message.x;
                    var y = message.y;
                    this.explosions.push(this.paper.path("M" + (this.screenX(x) - 6) + " " + (this.screenY(y) + 6) + "L" + (this.screenX(x) + 6) + " " + (this.screenY(y) - 6)).attr(attr));
                    this.explosions.push(this.paper.path("M" + (this.screenX(x) - 6) + " " + (this.screenY(y) - 6) + "L" + (this.screenX(x) + 6) + " " + (this.screenY(y) + 6)).attr(attr));
                }
                else if (message.messagetype == 16) {
                    //alert( "mess 16" + message.headline + message.body);
                    if (message.headline != "Enemy Distress Call") {
                    //alert ("no en");
                        if (message.body.indexOf(message.headline + " has struck a mine!") >= 0) {
                            //alert (message.body.substr( message.body.indexOf("Damage is at: ") + "Damage is at: ".length, 4));
                            var sz = 4;
                            if (message.body.substr( message.body.indexOf("Damage is at: ") + "Damage is at: ".length, 3).charAt(2) != " ") sz = 6; //this could be better
                            var attr = { stroke: "#ffff00", "stroke-width": "2", "stroke-opacity": 0.3 };
                            var x = message.x;
                            var y = message.y;
                            this.explosions.push(this.paper.path("M" + (this.screenX(x) - sz) + " " + (this.screenY(y) + sz) + "L" + (this.screenX(x) + sz) + " " + (this.screenY(y) - sz)).attr(attr));
                            this.explosions.push(this.paper.path("M" + (this.screenX(x) - sz) + " " + (this.screenY(y) - sz) + "L" + (this.screenX(x) + sz) + " " + (this.screenY(y) + sz)).attr(attr));
                        }
                        if (message.body.indexOf(message.headline + " has struck a WEB mine!") >= 0) {
                            //alert (message.body.substr( message.body.indexOf("Damage is at: ") + "Damage is at: ".length, 4));                    
                            var sz = 4;
                            if (message.body.substr( message.body.indexOf("Damage is at: ") + "Damage is at: ".length, 3).indexOf("<") == -1) sz = 6;                    
                            var attr = { stroke: "#00ff80", "stroke-width": "2", "stroke-opacity": 0.3 };
                            var x = message.x;
                            var y = message.y;
                            this.explosions.push(this.paper.path("M" + (this.screenX(x) - sz) + " " + (this.screenY(y) + sz) + "L" + (this.screenX(x) + sz) + " " + (this.screenY(y) - sz)).attr(attr));
                            this.explosions.push(this.paper.path("M" + (this.screenX(x) - sz) + " " + (this.screenY(y) - sz) + "L" + (this.screenX(x) + sz) + " " + (this.screenY(y) + sz)).attr(attr));
                        }                    
                    }
                    else {
                        if (message.body.indexOf(" has struck a mine!<br/>") >= 0) {
                            //alert (message.body.substr( message.body.indexOf("Damage is at: ") + "Damage is at: ".length, 4));
                            var sz = 4;
                            if (message.body.substr( message.body.indexOf("Damage is at: ") + "Damage is at: ".length, 3).charAt(2) != " ") sz = 6; //this could be better
                            var attr = { stroke: "#ffff00", "stroke-width": "2", "stroke-opacity": 0.3 };
                            var x = message.x;
                            var y = message.y;
                            this.explosions.push(this.paper.path("M" + (this.screenX(x) - sz) + " " + (this.screenY(y) + sz) + "L" + (this.screenX(x) + sz) + " " + (this.screenY(y) - sz)).attr(attr));
                            this.explosions.push(this.paper.path("M" + (this.screenX(x) - sz) + " " + (this.screenY(y) - sz) + "L" + (this.screenX(x) + sz) + " " + (this.screenY(y) + sz)).attr(attr));
                        }
                        if (message.body.indexOf(" has struck a WEB mine!<br/>") >= 0) {
                            //alert (message.body.substr( message.body.indexOf("Damage is at: ") + "Damage is at: ".length, 4));                    
                            var sz = 4;
                            if (message.body.substr( message.body.indexOf("Damage is at: ") + "Damage is at: ".length, 3).indexOf("<") == -1) sz = 6;                    
                            var attr = { stroke: "#00ff80", "stroke-width": "2", "stroke-opacity": 0.3 };
                            var x = message.x;
                            var y = message.y;
                            this.explosions.push(this.paper.path("M" + (this.screenX(x) - sz) + " " + (this.screenY(y) + sz) + "L" + (this.screenX(x) + sz) + " " + (this.screenY(y) - sz)).attr(attr));
                            this.explosions.push(this.paper.path("M" + (this.screenX(x) - sz) + " " + (this.screenY(y) - sz) + "L" + (this.screenX(x) + sz) + " " + (this.screenY(y) + sz)).attr(attr));
                        }                    
                    }
                }
            }
        };
    }
    // NEW VERSION
    else {
    
        var old_parseMessages = vgaPlanets.prototype.parseMessages;
        vgaPlanets.prototype.parseMessages = function () {
            old_parseMessages.apply(this, arguments);
            for (var i = 0; i < vgap.messages.length; i++) {
                var message = vgap.messages[i];
                if (message.messagetype == 16 && message.headline == "Enemy Distress Call" && message.body.indexOf(" has struck a mine!") >= 0) {
                    message.color = "rgba(255,255,0,0.3)";

                    var dam = message.body.substr(message.body.indexOf("Damage is at: ") + "Damage is at: ".length, 3);
                    if (dam.charAt(2) != " " && dam.charAt(2) != "<")
                        message.fatal = true;

                    this.explosions.push(message);
                }
                                        
                if (message.messagetype == 16 && message.headline == "Enemy Distress Call" && message.body.indexOf(" has struck a WEB mine!<br/>") >= 0) {
                    message.color = "rgba(0,255,120,0.3)";

                    var dam = message.body.substr(message.body.indexOf("Damage is at: ") + "Damage is at: ".length, 3);
                    if (dam.charAt(2) != " " && dam.charAt(2) != "<")
                        message.fatal = true;

                    this.explosions.push(message);
                } 
            }
        }
                    
    }
    
} // END wrapper

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
document.body.removeChild(script);