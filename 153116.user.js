// ==UserScript==
// @name       planets.nu VPA-like map objects selection v3
// @namespace  http://xeye.openfun.org
// @version    0.3.0
// @description  make map objects selection more VPA-like, including auto gravity well usage and auto warp v3 code
// @include    http://play.planets.nu/*
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
/////////////////////////////////////
 vgapMap.prototype.shipSelectorClick = function (event) {
        // grav well offsets
        var delta = [[-3,0],[3,0],[0,-3],[0,3],[-2,-2],[2,2],[-2,2],[2,-2]];
        var minDist = [2000000,0,0];
        vgap.playSound("select");
        // clear hyp rings
        this.hypcircles = new Array();
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
                if (other.id != ship.id && Math.dist(this.x, this.y, otherDest.x, otherDest.y) < (10 / this.zoom)) {
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
         
        vgap.loadWaypoints();
        this.draw();
        vgap.shipScreen.screen.refresh();
    }    
    
    
/////////////////////////////////////    
    vgapMap.prototype.click = function (event) {
        
        vgap.debug("click: " + event.clientX + " " + event.clientY);
        var c = event.shiftKey;
        if (this.putHypCircle) {
            this.hyperjump(this.x, this.y);
            this.putHypCircle = false;
            $("body").css("cursor", "");
            return
        }
        if (this.measure) {
            this.markMeasure();
            return
        }
        if (this.over && this.activePlanet) {
            if (this.activePlanet.targetx == this.over.x && this.activePlanet.targety == this.over.y) {
                this.loadOver();
                return
            }
        }
        if (this.over && this.activeShip) {
            var a = vgap.getDest(this.activeShip);
            if (a.x == this.over.x && a.y == this.over.y) {
                this.loadOver();
                return
            }
        }
           
 //////////////////////
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
            shtml.showScan(this.over, inMore);
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
//////////
 vgapMap.prototype.mineText = function (x, y) {
	var txt = "";
	var units4Torp = [1,4,9,16,25,36,49,64,81,100];
	for (var i = 0; i < vgap.minefields.length; i++) {
		var minefield = vgap.minefields[i];
		if (Math.dist(minefield.x, minefield.y, x, y) <= minefield.radius) {
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
})