// ==UserScript==
// @name           Planets.nu Explosion Ship Name
// @description    Planets.nu Explosion Ship Name
// @include        http://planets.nu/home
// @include        http://planets.nu/games/*
// @include        http://play.planets.nu/*
// @include 	   http://*.planets.nu/*
// @version        0.4
// ==/UserScript==
// 0.2 First working version
// 0.3 Updated code to play nicely with other mods.
// 0.4 Updated to work with new URLs

function wrapper () { // wrapper for injection
  


oldDrawExplosions = vgapMap.prototype.drawExplosions;


vgapMap.prototype.drawExplosions = function () {

oldDrawExplosions.apply(this, arguments);  
 for (var i = 0; i < vgap.messages.length; i++) {
            var message = vgap.messages[i];
            if (message.messagetype == 10) {
 		var attr = { stroke: "#ff00ff", "stroke-width": "2", "stroke-opacity": 0.5 };
                var x = message.x;
                var y = message.y;
              	this.drawText(x+20,y+14, message.body.substr(message.body.indexOf("the name of the ship was:")+"the name of the ship was:".length));

            }
        }
};


} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);