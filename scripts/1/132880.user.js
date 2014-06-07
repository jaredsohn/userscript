// ==UserScript==
// @name       planets.nu map objects selection
// @namespace  http://xeye.openfun.org
// @version    0.1.23
// @description  make map objects selection more VPA-like, including auto gravity well usage and auto warp
// @include    http://planets.nu/home*
// @copyright  2012+, xeye
// ==/UserScript==

function exec(fn) {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = '(' + fn + ')();';
	document.body.appendChild(script);
	document.body.removeChild(script);
};

exec(function() {
    vgapMap.prototype.shipSelectorClick = function (event) {
        // grav well offsets
        var delta = [[-3,0],[3,0],[0,-3],[0,3],[-2,-2],[2,2],[-2,2],[2,-2]];
        var minDist = [2000000,0,0];

        vgap.playSound("select");

        var ship = this.activeShip;

        var tx = this.x;
        var ty = this.y;
        ship.target = null;

        if (this.over) {
            if(!event.altKey && this.over.isPlanet) {
               for(i=0;i<delta.length;i++) {
                      var checkX = this.over.x + delta[i][0];
                      var checkY = this.over.y + delta[i][1];
                      var dist = Math.abs(ship.x - checkX) + Math.abs(ship.y - checkY);
                      if(dist < minDist[0]) {
                           minDist[0] = dist;
                           minDist[1] = checkX;
                           minDist[2] = checkY;
                   }
              }
              tx = minDist[1];
              ty = minDist[2];
            } else {
              tx = this.over.x;
              ty = this.over.y;
              ship.target = this.over;
            }
            var finalDamage = ship.damage - Math.floor(ship.supplies/5);
            var damageCap = vgap.race.id == 2 ? 150 : 100;
            ship.warp = Math.min(ship.engineid, Math.ceil((damageCap - finalDamage) / 10));
        }
        else {
            //snap to waypoint if near one
            for (var i = 0; i < vgap.ships.length; i++) {
                var other = vgap.ships[i];
                var otherDest = vgap.getDest(other);
                if (other.id != ship.id && this.getDist(this.x, this.y, otherDest.x, otherDest.y) < (10 / this.zoom)) {
                    tx = otherDest.x;
                    ty = otherDest.y;
                    break;
                }
            }
        }

        //reset waypoints - targetx is the first waypoint and waypoints holds additional ones.
        if (!event.shiftKey || (ship.x == ship.targetx && ship.y == ship.targety)) {
            ship.targetx = tx;
            ship.targety = ty;
            ship.waypoints = new Array();
        }
        else
            ship.waypoints.push({ x: tx, y: ty });


        this.draw();

        vgap.shipScreen.loadMovement();
    }

    vgapMap.prototype.mouseup = function (e) {
        if (!e.clientX)
            e = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

        this.mdown = false;
        this.mousemove(e);

        var dist = vgap.map.getDist(e.clientX, e.clientY, this.mdownX, this.mdownY);
        if (dist > 6)
            return; //map drag
        else {
            vgap.map.click(e);
        }
    }
    
    vgapMap.prototype.click = function (event) {
        if (this.putHypCircle) {
            this.hyperjump(this.x, this.y);
            this.putHypCircle = false;
            $("body").css("cursor", "");
            return;
        }
    
    if (this.measure) {
        this.markMeasure();
        return;
    }
    
    //second click on the same item. Open it up.
    if (this.over && this.activePlanet) {
        if (this.activePlanet.targetx == this.over.x && this.activePlanet.targety == this.over.y) {
            this.loadOver();
            return;
        }
    }
    if (this.over && this.activeShip) {
        var dest = vgap.getDest(this.activeShip);
        if (dest.x == this.over.x && dest.y == this.over.y) {
            this.loadOver();
            return;
        }
    }

    var middle = event.which ? event.which==2 : event.button==4;

    if (this.activePlanet && (event.altKey || event.ctrlKey || event.shiftKey || event.metaKey || middle)) {
        this.planetSelectorClick();
        return false;
    }
    if (this.activeShip && (event.altKey || event.ctrlKey || event.shiftKey || event.metaKey || middle)) {
        this.shipSelectorClick(event)
        return false;
    }
    
    if (this.over) {
        this.loadOver();
    }
   }          
       
   vgapMap.prototype.loadOver = function () {     
        var showScan = false;
        var ships = vgap.shipsAt(this.over.x, this.over.y);
        var myShipOnStack = false;
        for(var i=0; i<ships.length; i++) {
             if(ships[i].ownerid == vgap.player.id) {
                 myShipOnStack = ships[i];
                 break;
             }
        }       

        if (this.over.isPlanet && this.over.ownerid != vgap.player.id && !myShipOnStack)
            showScan = true;
      
        if (ships.length > 0 && !myShipOnStack)
            showScan = true;

        if (showScan) {
            var inMore = vgap.planetScreenOpen || vgap.shipScreenOpen || vgap.starbaseScreenOpen;
            this.showScan(this.over.x, this.over.y, inMore);
            return;
        }
        if (this.over.isPlanet && this.over.ownerid == vgap.player.id) {
            this.selectPlanet(this.over.id);
        }
        else {
            //ship
            this.selectShip(myShipOnStack.id);
        }
   }

   vgapMap.prototype.mineText = function (x, y) {
	var txt = "";
	var units4Torp = [1,4,9,16,25,36,49,64,81,100];
	for (var i = 0; i < vgap.minefields.length; i++) {
		var minefield = vgap.minefields[i];
		if (this.getDist(minefield.x, minefield.y, x, y) <= minefield.radius) {
			txt += "<div class='ItemSelectionBox minCorrection'><span>";
			if (minefield.ownerid == vgap.player.id)
				txt += "Your Minefield ";
			else {
				var player = vgap.getPlayer(minefield.ownerid);
				var race = vgap.getRace(player.raceid);
				txt += race.adjective + " Minefield ";
			}
			txt += "Id:" + minefield.id + "</span>";
			txt += "<table class='CleanTable'>";
			txt += "<tr><td> Radius: </td><td> " + gsv(minefield.radius) + " </td><td>&nbsp;Mines: </td><td> " + gsv(minefield.units) + " </td></tr>";
			txt += "<tr><td> Friendly: </td><td> " + gsv(minefield.friendlycode) + " </td></tr>";
			txt += "<tr><td> Layed with: (by Robots)</td></tr>";
			for(var tech = units4Torp.length-1; tech > 4; tech--) {
				var torps = Math.floor(minefield.units/units4Torp[tech]);
				txt += "<tr><td> Mark"+(tech-1)+": "+ torps + " (" + Math.floor(torps/4) +")</td></tr>";
			}
			txt += "</table></div>";
		}
	}
	return txt;
   }
       
vgapMap.prototype.hitTextBox = function (hit) {
var txt = "";
if (hit.isPlanet) {//planet
txt += "<div class='ItemSelectionBox minCorrection'>";
txt += "<span>" + hit.id + ": " + hit.name;
if (hit.temp != -1)
txt += "<span style='float:right;'>Temp: " + hit.temp + "</span>";
txt += "</span>";
txt += "<table class='CleanTable'>";
if (hit.infoturn == 0) {
//unknown planet
txt += this.hitText(hit, hit.isPlanet).replace("&nbsp", "");
}
else {
if (hit.nativeclans > 0) {
txt += "<tr><td colspan='4'>" + addCommas(hit.nativeclans * 100) + " " + hit.nativeracename + " - " + hit.nativegovernmentname + "</td></tr>";
}
txt +=
"<tr> <td>Neutronium: </td><td>&nbsp;" + gsv(hit.neutronium) + " / " + gsv(hit.groundneutronium) + "&nbsp;<td>Colonists: </td><td>&nbsp;" + addCommas(gsv(hit.clans * 100)) + "</td></tr>" +
"<tr> <td>Duranium: </td><td>&nbsp;" + gsv(hit.duranium) + " / " + gsv(hit.groundduranium) + "&nbsp;</td>" + "<td>Supplies: </td><td>&nbsp;" + gsv(hit.supplies) + "</td></tr>" +
"<tr> <td>Tritanium: </td><td>&nbsp;" + gsv(hit.tritanium) + " / " + gsv(hit.groundtritanium) + "&nbsp;</td>" + "<td>Megacredits: </td><td>&nbsp;" + gsv(hit.megacredits) + "</td></tr>" +
"<tr> <td>Molybdenum: </td><td>&nbsp;" + gsv(hit.molybdenum) + " / " + gsv(hit.groundmolybdenum) + "</td></tr>";
//known planet
if (hit.ownerid != vgap.player.id && hit.ownerid != 0) {
var player = vgap.getPlayer(hit.ownerid);
var race = vgap.getRace(player.raceid);
txt += "<tr><td colspan='4'>" + race.name + " (" + player.username + ")</td></tr>";
}
txt += this.hitText(hit, hit.isPlanet).replace("&nbsp", "");
}
txt += "</table></div>";
} else {//ship
var ship = hit;
var hull = vgap.getHull(ship.hullid);
var totalCargo = ship.ammo + ship.duranium + ship.tritanium + ship.molybdenum + ship.supplies + ship.clans;
var html = "<div class='ItemSelectionBox minCorrection'>";
if (ship.ownerid == vgap.player.id || vgap.fullallied(ship.ownerid)) {
html += "<span>" + ship.id + ": " + ship.name + "</span>";
html += "<table class='CleanTable'>";
html += "<tr><td colspan='2'>" + ship.x + " : " + ship.y + "</td></tr>";
html += "<tr><td>Neutronium:</td><td>&nbsp;" + gsv(ship.neutronium) + "/" + hull.fueltank + " </td><td>&nbsp;Clans:</td><td>&nbsp;" + gsv(ship.clans) + "</td></tr>";
html += "<tr><td>Duranium:</td><td>&nbsp;" + gsv(ship.duranium) + "</td><td>&nbsp;Supplies:</td><td>&nbsp;" + gsv(ship.supplies) + "</td></tr>";
html += "<tr><td>Tritanium:</td><td>&nbsp;" + gsv(ship.tritanium) + "</td><td>&nbsp;Megacredits:</td><td>&nbsp;" + gsv(ship.megacredits) + "</td></tr>";
html += "<tr><td>Molybdenum:</td><td>&nbsp;" + gsv(ship.molybdenum) + "</td>";
if (ship.torps > 0 || ship.bays > 0) {
var ammoText = "&nbsp;Fighters";
if (ship.torps > 0)
ammoText = "&nbsp;Torpedos";
html += "<td>" + ammoText + ":</td><td>&nbsp;" + gsv(ship.ammo) + "</td></tr>";
}
html += this.hitText(hit, hit.isPlanet).replace("&nbsp", "");
html += "</table>";
} else {//enemy
var player = vgap.getPlayer(ship.ownerid);
var hull = vgap.getHull(ship.hullid);
var race = vgap.getRace(player.raceid);
html += "<div class='enemyShipStyle'>";
html += "<table class='CleanTable'>";
html += "<tr><td colspan='2'>" + ship.id + ": " + ship.name + "</td></tr>";
html += "<tr><td colspan='2'>" + ship.x + " : " + ship.y + "</td></tr>";
html += "<tr><td colspan='2'>" + hull.name + "</td></tr>";
html += "<tr><td>Heading:</td><td>&nbsp;" + gsv(ship.heading) + " at Warp: " + gsv(ship.warp) + "</td></tr>";
html += "<tr><td>Mass: </td><td>&nbsp;" + gsv(ship.mass) + "</td></tr>";
html += "<tr><td colspan='2'>" + race.name + " (" + player.username + ")" + "</td></tr>";
//html += "<tr><td>Neutronium:</td><td>?/" + hull.fueltank + " </td><td>&nbsp;Total Cargo:</td><td>?/" + hull.cargo + "</td></tr>";
html += this.hitText(hit, hit.isPlanet).replace("&nbsp", "");
html += "</table>";
html += "</div>";
}
html += "</div>";
txt = html;
}
return txt;
}
    
})