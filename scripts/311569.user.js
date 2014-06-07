// ==UserScript==
// @name       planets.nu automatic gravity well movement
// @version    0.15
// @description Enables auto usage of gravity wells and auto warp
// @include    http://planets.nu/*
// @history   0.5   Added shift-w to toggle on/off
// @history	  0.6   If you select the planet you are over, don't plot a course into the gravwell
// @history	  0.7   If you select a target distance within 1ly (really under 2ly - aka next to you), set warp speed to 1 so you can fly around in gravity wells.
// @histopy   0.8	Fixed warpwell bug from Planets.nu. Ships with WP's in warpwells keep their WP on the next turn, in the warpwell. This results in a perpetual move cycle on ships not manual reset each turn. This also allows multiple-step warpwell plotting.
// @history   0.9   Corrected distance function to use Math.dist instead of half assing it (You could have used sqrt(a^2+b^2) atleast!)
// @history   0.10  Added on/off toggle and display under menu.
// @history   0.11  Fixed display bug - ship window now shows "warp well" instead of planet
// @history   0.12  Clear waypoints only on if: first turn load; wp is in a warpwell; ship is over a planet; and not going warp1
// @history   0.13  Found bug in clearing function, as the turn status doesn't get set when you load the turn, so using the turn history viwer would cause the clearing function to re-run. 
//					This highlighted a bug! :) Fixed clearing with wp is in a warpwell -> wp is in a warpwell of the planet youi are over.
// @history   0.14  Added check for HYP ships... don't warpwell them, or they will not land on planet!
// @history   0.15  Cleared WP's are saved immediatly.
// ==/UserScript==

function wrapper () {
    var ver = 0.15;
    console.log("autoGravetyWell plugin v" + ver);
    vgap.autoGravetyWell = new Object();
    vgap.autoGravetyWell.shipSelectorClickOn = true;
    vgap.autoGravetyWell.shipSelectorClickInit = false;
    
    vgapMap.prototype.shipSelectorClick = function (event) {                
        // grav well offsets
        var delta = [[-3,0],[3,0],[0,-3],[0,3],[-2,-2],[2,2],[-2,2],[2,-2]];
        var minDist = [2000000,0,0];
        
        vgap.playSound("select");
        //console.log("autoGravetyWell: shipSelectorClick: " + event);
        
        this.hypcircles = new Array();
        var ship = this.activeShip;        
        var tx = this.x;
        var ty = this.y;
        ship.target = null;
        
        //console.log("               :    -> " + ship.targetx + " x " + ship.targety);
        //for (var i = 0; i < ship.waypoints.length; i++) {
        //    console.log("               : " + i + " -> " + ship.waypoints[i].x + " x " + ship.waypoints[i].y);
        //}
        
        if (this.over) {      	    
            tx = this.over.x;
            ty = this.over.y;
            ship.target = this.over;
            //console.log("               : click over target");
        } else {
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
            //console.log("               : snapWP to target");
        }
        
        // Set warp, if you are not aiming at 1ly move to hit a gravity well
        //console.log("               : distance: " + Math.dist(ship.x, ship.y, tx, ty));
        if (Math.dist(ship.x, ship.y, tx, ty) >= 2) {
            var finalDamage = ship.damage - Math.floor(ship.supplies/5);
            var damageCap = vgap.race.id == 2 ? 150 : 100;
            ship.warp = Math.min(ship.engineid, Math.ceil((damageCap - finalDamage) / 10));
            //console.log("               : warp " + ship.warp);
        } else {
            ship.warp = 1;
            //console.log("               : warp " + ship.warp);
        }                
        //console.log("               : Target WP: " +tx+ " x " +ty);
        
        // Auto warpwell!
        var notHyp = true;
        if (ship.friendlycode.toLowerCase() == "hyp")
            notHyp = false;
        
        if (vgap.autoGravetyWell.shipSelectorClickOn && ship.x != tx && ship.y != ty && notHyp) {            
            var lastX = 0;
            var lastY = 0;
            
            // Closest squair, given the LAST wp
            if (ship.waypoints.length > 0) {
                lastX = ship.waypoints[ship.waypoints.length - 1].x;
                lastY = ship.waypoints[ship.waypoints.length - 1].y;
            } else {
                lastX = ship.x;
                lastY = ship.y;
            }
            
            for (var b = 0; b < vgap.planets.length; b++) {
                if (vgap.planets[b].x == tx && vgap.planets[b].y == ty) {      
                    for(var i = 0; i < delta.length ; i++) {
                        var checkX = this.over.x + delta[i][0];
                        var checkY = this.over.y + delta[i][1];
                        var dist = Math.dist(lastX, lastY, checkX, checkY);
                        //console.log("               : " + i + " -> " + delta[i][0] + "/" + delta[i][1] + " = " + dist);
                        if(dist < minDist[0]) {
                            //console.log("               : setting min");
                            minDist[0] = dist;
                            minDist[1] = checkX;
                            minDist[2] = checkY;
                        }
                    }
                    tx = minDist[1];
                    ty = minDist[2];
                    //ship.target = null;
                    //console.log("               : WP moved to warpwell at: " + tx + " " + ty); 
                    break;
                }
            }
        }                
        
        //reset waypoints - targetx is the first waypoint and waypoints holds additional ones.
        if (!event || (ship.x == ship.targetx && ship.y == ship.targety)) {
            ship.targetx = tx;
            ship.targety = ty;
            ship.waypoints = new Array();
            //console.log("               : Reset WP");
        } else {
            ship.waypoints.push({ x: tx, y: ty });
            //console.log("               : Push WP");
            //for (var i = 0; i < ship.waypoints.length; i++) {
            //   console.log("               : " + i + " -> " + ship.waypoints[i].x + " x " + ship.waypoints[i].y);
            //}
        }
        
        vgap.loadWaypoints();   
        this.draw();
        vgap.shipScreen.screen.refresh();        
    }; 
    
    // Fix a but in Nu where if you move to a WP on your next turn that WP still exists.
    var old_processLoad = vgaPlanets.prototype.processLoad;
    vgaPlanets.prototype.processLoad = function(result) {
        old_processLoad.apply(this, arguments);
        if (!result.success) return;
        
        if (vgap.player.turnstatus == 0) { 
            vgap.autoGravetyWell.clearBuggedWP();
            //vgap.player.turnstatus = 1;
        }
        
        // Add menu button
        if (vgap.autoGravetyWell.shipSelectorClickInit == false) {
            $("<ul style='padding: 0 5px 0 5px;margin: 0;position: absolute;right: 20px;z-index: 6;color: #fff;" +
              "border-bottom-left-radius: 5px 5px;border-bottom-right-radius: 5px 5px;border-top-left-radius: 5px 5px;border-top-right-radius: 5px 5px;" + 
              "background-color: #333;list-style-type: none;' id='GravWellMenu'>" + 
              "<li style='font-size: xx-small;' id='GravWell' onClick='vgap.shipSelectorClickToggle()'>AutoWells On</li></ul>").css("top", "38px").appendTo("body");
            vgap.autoGravetyWell.shipSelectorClickInit = true;
        }
        
        vgap.autoGravetyWell.shipSelectorClickOn = true;   
        $("#GravWell").text("AutoWells On");
    };
    
    vgap.autoGravetyWell.shipSelectorClickToggle = function() {
        //console.log("Toggle!");
        vgap.autoGravetyWell.shipSelectorClickOn = !vgap.autoGravetyWell.shipSelectorClickOn;
        if (vgap.autoGravetyWell.shipSelectorClickOn) {
            $("#GravWell").text("AutoWells On");
        } else {
            $("#GravWell").text("AutoWells Off");
        }
    };
    
    vgap.autoGravetyWell.clearBuggedWP = function() {
        //console.log("Turn Status: " + vgap.player.turnstatus);
        // Find "bugged" WP's
        
        for (var i = 0; i < vgap.myships.length; i++) {
            var ship = vgap.myships[i];     
            // If you're on a planet AND your next WP is in a warpwell
            var planetAt = vgap.planetAt(ship.x, ship.y);
            var planetTarget = vgap.warpWell(ship.targetx, ship.targety);
            if (planetAt && planetAt == planetTarget && ship.warp != 1) {
                if (ship.waypoints.length > 0) {
                    ship.targetx = ship.waypoints[0].x;
                    ship.targety = ship.waypoints[0].y;
                    ship.waypoints.shift();
                } else {
                    ship.targetx = ship.x;
                    ship.targety = ship.y;
                }                    
                
                console.log("        reseting " + ship.name + " -> " + ship.targetx + " x " + ship.targety);
                vgap.loadWaypoints();
                ship.changed = 1;
            }
        }
    };
    
    
    var old_hotkey = vgaPlanets.prototype.hotkey;
    vgaPlanets.prototype.hotkey = function (ev) {
        // shift-w
        if (ev.keyCode == 87 && ev.shiftKey) {
            vgap.autoGravetyWell.shipSelectorClickToggle();
            return;
        } 
        
        // shift-e
        if (ev.keyCode == 69 && ev.shiftKey) {
            vgap.autoGravetyWell.clearBuggedWP();
            return;
        }
        
        old_hotkey.apply(this, arguments);	
    };  
}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
