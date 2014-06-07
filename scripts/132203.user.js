// ==UserScript==
// @name          Modified drawPlanetNames
// @description   Only shows the ID of planets when pressing 'p'
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @version 0.2
// ==/UserScript==

function wrapper () {
    var toggleMode = 0;

    vgapMap.prototype.togglePlanetNames = function() {
        toggleMode = (toggleMode + 1) % 3;

        switch (toggleMode) {
            case 0: // clear
		this.removePlanetNames();
                break;
            case 1: // id only
		for (var i = 0; i < vgap.planets.length; i++) {
		    var planet = vgap.planets[i];
		    var left = this.screenX(planet.x) + 10;
		    var top = this.screenY(planet.y) - 15;
		    $("<div class='PlanetName' style='left:" + left + "px;top:" + top + "px;'>" + planet.id + "</div>").appendTo(this.mapCover);
		}
		break;
	    case 2: // planetname + id
		this.removePlanetNames();
		this.drawPlanetNames();
		break;
        }
    };

    vgaPlanets.prototype.oldhotkey = vgaPlanets.prototype.hotkey;
    vgaPlanets.prototype.hotkey = function (ev) {
        if ((ev.keyCode == 80 || ev.keyCode == 112) && (!this.planetScreenOpen && !this.starbaseScreenOpen)) {
            vgap.map.togglePlanetNames();
        }
	else {
            this.oldhotkey(ev);
	}
    }
}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);

