// ==UserScript==
// @name       planets.nu automatic gravity well movement
// @namespace  http://xeye.openfun.org
// @version    0.1.4
// @description Enables auto usage of gravity wells and auto warp
// @include    http://planets.nu/home*
// @include    http://*.planets.nu/home*
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
    vgapMap.prototype.shipSelectorClick = function (event) {
        var shift = (event & 1) > 0;
        // grav well offsets
        var delta = [[-3,0],[3,0],[0,-3],[0,3],[-2,-2],[2,2],[-2,2],[2,-2]];
        var minDist = [2000000,0,0];

        vgap.playSound("select");

        var ship = this.activeShip;

        var tx = this.x;
        var ty = this.y;
        ship.target = null;

        if (this.over) {
            if(event == 0) {
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
        if (!shift || (ship.x == ship.targetx && ship.y == ship.targety)) {
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
            eMask = e.shiftKey ? 1:0 | e.ctrlKey ? 2:0 | e.altKey ? 4:0 | e.metaKey ? 8:0;
            vgap.map.click(eMask);
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
    
    if (this.activePlanet) {
        this.planetSelectorClick();
        return;
    }
    if (this.activeShip) {
        this.shipSelectorClick(event)
        return;
    }
    
    if (this.over) {
        this.loadOver(event);
    }
   }
        
})
