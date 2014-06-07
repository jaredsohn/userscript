// ==UserScript==
// @name          Planets.nu improved movement indicators
// @description   A variety of fixes and additions to improve ship movement planning - VERY BETA
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @version 0.8
// ==/UserScript==

// 1. Corrects travel time prediction including warp wells by calculating the actual end position for each turn. If end position is in warp well,
//    and warp greater than 1, end position is moved to planet. If this happens, we also check to see if the target for this path segment is in the warp
//    well of the same planet. If so, it too is moved to the planet so the segment is considered complete without any additional turns of movement.
// 2. Adds "Next turn" field under "Waypoint" and indicators to show stopping points for each turn.
// 3. Uses max distance to travel in a turn = speed + 0.5 to fix edge conditions.
// 4. Removes fuel check for calculating travel time, so "Never!" is not shown due to insufficient fuel. The Arrival box was changed to use the fuel needed coloration.
// 5. (ver 0.5) Adds some code to improve interaction with HYP regarding fuel, turns taken (credit to Lord Helmet). Adds full length HYP line for short waypoints.
// 6. (ver 0.5) Correct Hyp warp well adjustment. Add "Approx." Next Turn and Distance when indirect hyping, and larger destination circle
// 7. (ver 0.7) Fixes warp 1 hang issue.

function wrapper () { // wrapper for injection
if (vgap.version < 3) {
    vgaPlanets.prototype.isIndirectHyping = function(ship) {
            if (this.isHyping(ship)) {
                var dist = vgap.getPath(ship)[0].dist;
                if (dist > 360.05 || dist < 339.95) {
                    return true;
                }
            }
        };
        
    vgapShipScreen.prototype.loadMovement = function () {
    
            //firecloud chunnel lines
            if (this.ship.hullid == 56)
                vgap.map.draw();
    
            this.movement.empty();
            var ship = this.ship;
            var distance = vgap.getTravelDist(ship); //vgap.map.getDist(ship.x, ship.y, ship.targetx, ship.targety);
            var loc = "Deep Space";
            if (vgap.warpWell(ship.x, ship.y))
                loc = "Warp Well";
            if (this.planet != null)
                loc = this.planet.name;
            loc += " (" + ship.x + ", " + ship.y + ")";
            if (ship.iscloaked)
                loc += "<span class='GoodText'> - Cloaked</span>";
    
            var dest = vgap.getDest(ship);
    
            var waypoint = "Deep Space";
            if (vgap.warpWell(dest.x, dest.y))
                waypoint = "Warp Well";
            //var target = vgap.getTarget(ship.targetx, ship.targety);
            if (ship.target != null)
                waypoint = ship.target.name.substr(0, 20);
            waypoint += " (" + dest.x + ", " + dest.y + ")";
    
            if (vgap.isChunnelling(ship)) {
                var targetId = parseInt(ship.friendlycode, 10);
                var target = vgap.getShip(targetId);
                waypoint = "Chunnelling to Firecloud #" + target.id + " (" + target.x + ", " + target.y + ")";
                distance = vgap.map.getDist(ship.x, ship.y, target.x, target.y);
            }
            var tower = vgap.isTowTarget(ship.id);
            var wpCls = "";
            if (tower != null) {
                var towDest = vgap.getDest(tower);
                waypoint = "Towed by #" + tower.id + " to (" + towDest.x + ", " + towDest.y + ")";
                wpCls = " GoodText";
            }
    
            var path = vgap.getPath(ship);
            var fuel = 0;
            for (var i = 0; i < path.length; i++) {
                fuel += this.getFuelUsage(path[i].x1, path[i].y1, path[i].x2, path[i].y2);
            }
            if (fuel == 0)
                fuel += this.cloakFuel();
    
            var totalMass = this.getMass(ship);
            if (ship.mission == 6 && ship.mission1target != 0) {
                var towship = vgap.getShip(ship.mission1target);
                if (towship != null)
                    totalMass += this.getMass(towship);
            }
    
            var radiation = this.getPathRadiation(ship);
            var crewDeath = this.radiationEffect(ship, radiation);
            var deathPath = this.checkForDeathPath(ship);
    
            var nextturnloc = ""
    
            var time = "Never!";
            if (ship.warp > 0 /*&& fuel <= ship.neutronium*/ && crewDeath < ship.crew && deathPath == null) {
            
                var curX = ship.x;
                var curY = ship.y;
    
                var speed = vgap.getSpeed(ship.warp, ship.hullid);
                var turns = 0;
                var totalLength = 0;
                
                //Helmet HYP
    			if (vgap.isHyping(ship)) speed=359.55;
                //
    
                //if (path.length > 0 && turns == 0) {
                //    turns = 1;
                //}
                
                for (var i = 0; i < path.length; i++) {
                   // totalLength += path[i].dist;
                    while (curX != path[i].x2 || curY != path[i].y2) {
                        
                        console.log("T:" + turns + " P:" + curX + ", " + curY);
                        
                        turns += 1;
                        if ( vgap.map.getDist(curX, curY, path[i].x2, path[i].y2) <= speed + 0.5 ) {
                            curX = path[i].x2;
                            curY = path[i].y2;
                        }
                        else {
                            var diffX = path[i].x2 - curX;
                            var diffY = path[i].y2 - curY;
                            if ( Math.abs(diffX) > Math.abs(diffY) ) {
                                var moveX = Math.floor( (speed * diffX) / Math.sqrt((diffX * diffX) + (diffY * diffY)) + 0.5 );
                                console.log(moveX);
                                curX = curX + moveX;
                                curY = curY + Math.floor( moveX * (diffY / diffX) + 0.5);
                            }
                            else {
                                var moveY = Math.floor( (speed * diffY) / Math.sqrt((diffX * diffX) + (diffY * diffY)) + 0.5 );
                                curY = curY + moveY;
                                curX = curX + Math.floor( moveY * (diffX / diffY) + 0.5);
                            } 
                        }
                        if (ship.warp > 1 || (vgap.isHyping(ship) && ship.warp == 1)) {
                            // Copy of vgap.warpWell code, would be better to have the function return planet object instead of bool
                            for (var p = 0; p < vgap.planets.length; p++) {
                                var planet = vgap.planets[p];
                                var dist = vgap.map.getDist(curX, curY, planet.x, planet.y);
                                var hypThreeAway = vgap.isHyping(ship) && ( (Math.abs(planet.x - curX) == 3) || (Math.abs(planet.y - curY) == 3) );
                                if (dist <= 3 && planet.debrisdisk == 0 && !hypThreeAway) {
                                    //alert(planet.name);
                                    curX = planet.x;
                                    curY = planet.y;
                                    dist = vgap.map.getDist(path[i].x2, path[i].y2, planet.x, planet.y);
                                    if (dist <= 3 && planet.debrisdisk == 0) {
                                        //alert(planet.name);
                                        path[i].x2 = planet.x;
                                        path[i].y2 = planet.y;
                                    }
                                    break;
                                }
                            }
                            //vgap.map.special.push(vgap.map.paper.circle(vgap.map.screenX(curX), vgap.map.screenY(curY), 1).attr({ stroke: "yellow", "stroke-width": 1, "stroke-opacity": "1" }));
                            //vgap.map.drawCircle(curX, curY,  3, { stroke: "yellow", "stroke-width": 1, "stroke-opacity": "1" });
                        }
                        if (nextturnloc == "") {
                            nextturnloc = "Deep Space";
                            target = vgap.getTarget(curX, curY);
                            if (target != null)
                                nextturnloc = target.name.substr(0, 20);
                            else if (vgap.warpWell(curX, curY))
                                nextturnloc = "Warp Well";                            
                            nextturnloc += " (" + curX + ", " + curY + ")";
                            
                            if (vgap.isIndirectHyping(ship)) {
                                var last = vgap.getPath(ship)[0];
                                var hx = last.x1 + (last.x2-last.x1) * 350 / last.dist;
                                var hy = last.y1 + (last.y2-last.y1) * 350 / last.dist;
                                nextturnloc = "HYP: Approx. (" + Math.round(hx) + ", " + Math.round(hy) + ")";
                            }
                        }
                    
                            
                            
                        //totalLength = totalLength - speed;
                        //alert("totalLength is" + totalLength);
                    }
                    
                    //turns += Math.ceil((path[i].dist) / speed);
                    /*
                    if (i == path.length - 1) {
    
                        var pa = vgap.planetAt(path[i].x2, path[i].y2);
    
                        if (pa != null && pa.debrisdisk == 0) {
                            // warpwell
                            if ((path[i].dist % speed) < 3) { turns--; }
                        }
                    }
                    */
                }
                 
    
        /*
                for (var i = 0; i < path.length; i++) {
    
                    totalLength += path[i].dist;
                    while (totalLength.toFixed(1) > speed) {
                        turns += 1;
                        totalLength = totalLength - speed;
                        //alert("totalLength is" + totalLength);
                    }
                    //turns += Math.ceil((path[i].dist) / speed);
                    if (i == path.length - 1) {
    
                        var pa = vgap.planetAt(path[i].x2, path[i].y2);
    
                        if (pa != null && pa.debrisdisk == 0) {
                            // warpwell
                            if ((path[i].dist % speed) < 3) { turns--; }
                        }
                    }
                }
        */
                // alert("speed is" + speed + "\n path[0].dist =" + path[0].dist);
    
                time = turns + (turns==1?" <span>turn</span>":" <span>turns</span>"); //Helmet Typo!
                //Helmet Hyp, more or less
                if (vgap.isHyping(ship))
    		      fuel = 50 * turns;
    		    //            
            }
    
            if (ship.x == ship.targetx && ship.y == ship.targety)
                time = "";
    
            var html = "<table width='100%'>";
            html += "<tr><td class='widehead'>Location:</td><td class='textval'>" + loc + "</td></tr>";
            html += "<tr><td>Waypoint:</td><td class='textval" + wpCls + "'>" + waypoint + "</td></tr>";
            html += "<tr><td>Next Turn:</td><td class='textval" + wpCls + "'>" + nextturnloc + "</td></tr>";
            html += "<tr><td>Distance:</td><td class='textval'>" + (vgap.isIndirectHyping(ship) ? "HYP: Approx. 350 (Wpt. " + distance.toFixed(1) + ")" : distance.toFixed(1)) + " light years</td></tr>";
            html += "<tr><td>Total Mass: </td><td class='textval'>" + totalMass + " kt</td></tr>";
    
            if (deathPath != null) {
                html += "<tr><td colspan='2'><span class='BadText'><b>" + deathPath + "</b></span></td></tr>";
            }
            else if (crewDeath > 0) {
                var radCls = "WarnText";
                if (crewDeath >= ship.crew)
                    radCls = "BadText";
                html += "<tr><td>Radiation:</td><td class='textval'><span class='" + radCls + "'>" + crewDeath + " crew deaths</span></td></tr>";
            }
            html += "</table>";
    
            var cls = "GreenBox";
            if (ship.neutronium < 25)
                cls = "OrangeBox";
            if (ship.neutronium == 0)
                cls = "RedBox";
    
            html += "<div id='Movement'>";
            html += "<div id='FuelStatus' class='" + cls + "'>";
            html += "<div class='BoxStatus'>Neutronium Fuel</div>";
            html += "<div class='BoxVal'>" + ship.neutronium + "<span> / " + this.hull.fueltank + "</span></div>";
            html += "</div>";
    
            cls = "GreenBox";
            var maxWarp = Math.ceil((100 - ship.damage) / 10);
            if (vgap.player.raceid == 2)
                maxWarp += 5;
    
            if (ship.warp > ship.engineid)
                cls = "OrangeBox";
            if ((ship.warp > maxWarp) || (ship.warp == 0 && (ship.x != ship.targetx || ship.y != ship.targety)))
                cls = "RedBox";
    
            html += "<div id='WarpStatus' class='" + cls + "'>";
            html += "<div class='BoxStatus'>Warp</div>";
            html += "<div class='BoxVal'>" + ship.warp + "</div>";
            html += "</div>";
    
            var cls = "GreenBox";
            if (fuel > ship.neutronium)
                cls = "RedBox";
            if (fuel == ship.neutronium && fuel > 0)
                cls = "OrangeBox";
    
            html += "<div id='FuelNeeded' class='" + cls + "'>";
            html += "<div class='BoxStatus'>Fuel Needed</div>";
            html += "<div class='BoxVal'>" + fuel + "</div>";
            html += "</div>";
    
            //cls = "GreenBox";
            //if (time == "Never!")
            //    cls = "RedBox";
    
            html += "<div id='ArrivalStatus' class='" + cls + "'>";
            html += "<div class='BoxStatus'>Arrival</div>";
            html += "<div class='BoxVal'>" + time + "</div>";
            html += "</div>";
    
            html += "</div>";
    
            $(html).appendTo("#ShipMovement");
    
            // vgap.action added for the assistant (Alex):
    //        vgap.action();
        };
        
    vgapMap.prototype.drawShipSelector = function (ship) {
    
            var rad = 8;
            if (this.zoom < 1)
                rad = Math.ceil(rad * this.zoom);
            if (this.zoom > 10)
                rad = Math.ceil(rad * this.zoom / 10);
    
            var tower = vgap.isTowTarget(ship.id);
            this.drawCircle(ship.x, ship.y, rad, { stroke: (tower == null) ? "yellow" : "magenta", "stroke-width": "2", "stroke-opacity": "1" });
    
            //        if (vgap.isHyping(ship))
            //            this.drawSelector(ship.x, ship.y, ship.targetx, ship.targety, ship.target, "yellow", "yellow", speed, ".");
            //        else if (tower != null) {
            //            this.drawSelector(ship.x, ship.y, ship.targetx, ship.targety, ship.target, "cyan", "yellow", speed, ".");
            //            this.drawLine(ship.x, ship.y, tower.targetx, tower.targety, { stroke: "cyan", "stroke-width": "1", "stroke-opacity": "1" });
            //        }
            //        else
            //            this.drawSelector(ship.x, ship.y, ship.targetx, ship.targety, ship.target, "yellow", "yellow", speed);
    
            var params = { stroke: "yellow", "stroke-width": "1", "stroke-opacity": "1" };
            if (vgap.isHyping(ship))
                params = { stroke: "yellow", "stroke-width": "1", "stroke-opacity": "1", "stroke-dasharray": "." };
            else if (tower != null) {
                params = { stroke: "magenta", "stroke-width": "1", "stroke-opacity": "1" };
                var path = vgap.getPath(tower);
                for (var j = 0; j < path.length; j++) {
                    this.waypoints.push(this.paper.path("M" + this.screenX(path[j].x1) + " " + this.screenY(path[j].y1) + "L" + this.screenX(path[j].x2) + " " + this.screenY(path[j].y2)).attr(params));
                }
                params = { stroke: "yellow", "stroke-width": "1", "stroke-opacity": "1" };
            }
    
            var curX = ship.x;
            var curY = ship.y;
            var speed = vgap.getSpeed(ship.warp, ship.hullid);
            
            //Helmet HYP
    		if (vgap.isHyping(ship))
    		  speed=359.55;
            //
            
            var path = vgap.getPath(ship);
            if (path.length > 0) {
    
                var dist = 0;
                var last = null;
                for (var i = 0; i < path.length; i++) {
                    last = path[i];
                    dist += last.dist;
                    if ( vgap.isIndirectHyping(ship) ) {
                        var hx = last.x1 + (last.x2-last.x1) * 350 / last.dist;
                        var hy = last.y1 + (last.y2-last.y1) * 350 / last.dist;
                        this.drawLine(last.x1, last.y1, hx, hy, params);
                    }
                    else {                
                        this.drawLine(last.x1, last.y1, last.x2, last.y2, params);
                    }
                    if (speed > 0) {
                        while (curX != path[i].x2 || curY != path[i].y2) {
                            if ( vgap.map.getDist(curX, curY, path[i].x2, path[i].y2) <= speed + 0.5 ) {
                                curX = path[i].x2;
                                curY = path[i].y2;
                            }
                            else {
                                var diffX = path[i].x2 - curX;
                                var diffY = path[i].y2 - curY;
                                if ( Math.abs(diffX) > Math.abs(diffY) ) {
                                    var moveX = Math.floor( (speed * diffX) / Math.sqrt((diffX * diffX) + (diffY * diffY)) + 0.5 );
                                    curX = curX + moveX;
                                    curY = curY + Math.floor( moveX * (diffY / diffX) + 0.5);
                                }
                                else {
                                    var moveY = Math.floor( (speed * diffY) / Math.sqrt((diffX * diffX) + (diffY * diffY)) + 0.5 );
                                    curY = curY + moveY;
                                    curX = curX + Math.floor( moveY * (diffX / diffY) + 0.5);
                                } 
                            }
                            if (ship.warp > 1 || (vgap.isHyping(ship) && ship.warp == 1)) {
                                // Copy of vgap.warpWell code, would be better to have the function return planet object instead of bool
                                for (var p = 0; p < vgap.planets.length; p++) {
                                    var planet = vgap.planets[p];
                                    var d = vgap.map.getDist(curX, curY, planet.x, planet.y);
                                    var hypThreeAway = vgap.isHyping(ship) && ( (Math.abs(planet.x - curX) == 3) || (Math.abs(planet.y - curY) == 3) );
                                    if (d <= 3 && planet.debrisdisk == 0 && !hypThreeAway) {
                                        //alert(planet.name);
                                        curX = planet.x;
                                        curY = planet.y;
                                        d = vgap.map.getDist(path[i].x2, path[i].y2, planet.x, planet.y);
                                        if (d <= 3 && planet.debrisdisk == 0) {
                                            //alert(planet.name);
                                            path[i].x2 = planet.x;
                                            path[i].y2 = planet.y;
                                        }
                                        break;
                                    }
                                }
                                if (vgap.isIndirectHyping(ship))
                                    vgap.map.waypoints.push(vgap.map.paper.circle(vgap.map.screenX(hx), vgap.map.screenY(hy), 10).attr({ stroke: "yellow", "stroke-width": 1, "stroke-opacity": "1" }));
                                else
                                    vgap.map.waypoints.push(vgap.map.paper.circle(vgap.map.screenX(curX), vgap.map.screenY(curY), 3).attr({ stroke: "yellow", "stroke-width": 1, "stroke-opacity": "1" }));
                                //vgap.map.drawCircle(curX, curY,  3, { stroke: "yellow", "stroke-width": 1, "stroke-opacity": "1" });
                            }
                        }
                    }                
                    
                }
    
                //hover text and target circle
                var txt = dist.toFixed(1);
                if (ship.target && !vgap.isIndirectHyping(ship)) {
                    this.drawCircle(last.x2, last.y2, rad, { stroke: "yellow", "stroke-width": "1", "stroke-opacity": "1" });
                    txt += " to " + ship.target.name;
                }
    
                var txtY = last.y2 + Math.ceil(15 / this.zoom);
                if (last.y1 < last.y2)
                    txtY = last.y2 - Math.ceil(15 / this.zoom);
                this.drawText(last.x2, txtY, txt);
            }
    
            //travel range circle
            var speed = vgap.getSpeed(ship.warp, ship.hullid);
            if (speed > 0 && this.rangeCircles) {
                var dest = vgap.getDest(ship);
                this.drawCircle(dest.x, dest.y, speed * this.zoom, { stroke: "cyan", "stroke-width": "2", "stroke-opacity": "0.2" });
            }
    
    
            // vgap.action added for the assistant (Alex):
           // vgap.action();
    
        };
} 

// NEW VERSION
else {

    vgapShipScreen.prototype.adjustMovementFields = function () {
        if (this.nextturnloc) {
            var nextturnloc = this.nextturnloc;
            var html = "<tr id=NextTurn><td>Next Turn:</td><td class='textval'>" + nextturnloc + "</td></tr>";
            var ntrow = $("#NextTurn");
            if (ntrow.length > 0)
                ntrow.remove();
            $("#ShipMovement > table > tbody > tr").eq(1).after(html);
            //console.log( turns + nextturnloc);
            $("#ArrivalStatus > div.BoxVal").html(this.turns + " <span>turn" + (this.turns == 1 ? "" : "s") + "</span>")
        }
    }
    
    var old_shipSelectorClick = vgapMap.prototype.shipSelectorClick;
    vgapMap.prototype.shipSelectorClick = function (shift) {
    
        old_shipSelectorClick.apply(this, arguments);
        
        vgap.shipScreen.adjustMovementFields();
    }

    var old_drawUserChangeable = vgapMap.prototype.drawUserChangeable;
    vgapMap.prototype.drawUserChangeable = function (ctx) {
    
        old_drawUserChangeable.apply(this, arguments);
        
        if (this.activeShip) {
            var ship = this.activeShip;
            vgap.shipScreen.nextturnloc = null;
            if (vgap.isHyping(ship)) return;
            
            var curX = ship.x;
            var curY = ship.y;
            var speed = vgap.getSpeed(ship.warp, ship.hullid);
            
            var nextturnloc = "";
            var turns = 0;
            
            //Helmet HYP
    		//if (vgap.isHyping(ship))
    		//  speed=359.55;
            //
            
            var path = vgap.getPath(ship);
            if (path.length > 0) {
    
                var dist = 0;
                var last = null;
                for (var i = 0; i < path.length; i++) {
                    last = path[i];
                    dist += last.dist;
                    /*if ( vgap.isIndirectHyping(ship) ) {
                        var hx = last.x1 + (last.x2-last.x1) * 350 / last.dist;
                        var hy = last.y1 + (last.y2-last.y1) * 350 / last.dist;
                        this.drawLine(last.x1, last.y1, hx, hy, params);
                    }
                    else {                
                        this.drawLine(last.x1, last.y1, last.x2, last.y2, params);
                    }*/
                    if (speed > 0) {
                        while (curX != path[i].x2 || curY != path[i].y2) {
                        
                            turns += 1;
                        
                            if ( Math.dist(curX, curY, path[i].x2, path[i].y2) <= speed + 0.5 ) {
                                curX = path[i].x2;
                                curY = path[i].y2;
                            }
                            else {
                                var diffX = path[i].x2 - curX;
                                var diffY = path[i].y2 - curY;
                                if ( Math.abs(diffX) > Math.abs(diffY) ) {
                                    var moveX = Math.floor( (speed * diffX) / Math.sqrt((diffX * diffX) + (diffY * diffY)) + 0.5 );
                                    curX = curX + moveX;
                                    curY = curY + Math.floor( moveX * (diffY / diffX) + 0.5);
                                }
                                else {
                                    var moveY = Math.floor( (speed * diffY) / Math.sqrt((diffX * diffX) + (diffY * diffY)) + 0.5 );
                                    curY = curY + moveY;
                                    curX = curX + Math.floor( moveY * (diffX / diffY) + 0.5);
                                } 
                            }
                            if (ship.warp > 1 || (vgap.isHyping(ship) && ship.warp == 1)) {
                                // Copy of vgap.warpWell code, would be better to have the function return planet object instead of bool
                                for (var p = 0; p < vgap.planets.length; p++) {
                                    var planet = vgap.planets[p];
                                    var d = Math.dist(curX, curY, planet.x, planet.y);
                                    var hypThreeAway = vgap.isHyping(ship) && ( (Math.abs(planet.x - curX) == 3) || (Math.abs(planet.y - curY) == 3) );
                                    if (d <= 3 && planet.debrisdisk == 0 && !hypThreeAway) {
                                        //alert(planet.name);
                                        curX = planet.x;
                                        curY = planet.y;
                                        d = Math.dist(path[i].x2, path[i].y2, planet.x, planet.y);
                                        if (d <= 3 && planet.debrisdisk == 0) {
                                            //alert(planet.name);
                                            path[i].x2 = planet.x;
                                            path[i].y2 = planet.y;
                                        }
                                        break;
                                    }
                                }
/*                                if (vgap.isIndirectHyping(ship))
                                    vgap.map.waypoints.push(vgap.map.paper.circle(vgap.map.screenX(hx), vgap.map.screenY(hy), 10).attr({ stroke: "yellow", "stroke-width": 1, "stroke-opacity": "1" }));
                                else*/ {
                                    ctx.strokeStyle = "yellow";
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.arc(this.screenX(curX), this.screenY(curY), 3, 0, Math.PI * 2, false);
                                    ctx.closePath();
                                    ctx.stroke();
                                
                                    
                                }
                                    //vgap.map.waypoints.push(vgap.map.paper.circle(vgap.map.screenX(curX), vgap.map.screenY(curY), 3).attr({ stroke: "yellow", "stroke-width": 1, "stroke-opacity": "1" }));
                                    //vgap.map.drawCircle(curX, curY,  3, { stroke: "yellow", "stroke-width": 1, "stroke-opacity": "1" });
                            }
                            if (nextturnloc == "") {
                                nextturnloc = "Deep Space";
                                target = vgap.getTarget(curX, curY);
                                if (target != null)
                                    nextturnloc = target.name.substr(0, 20);
                                else if (vgap.warpWell(curX, curY))
                                    nextturnloc = "Warp Well";                            
                                nextturnloc += " (" + curX + ", " + curY + ")";
                                vgap.shipScreen.nextturnloc = nextturnloc;
/*                                if (vgap.isIndirectHyping(ship)) {
                                    var last = vgap.getPath(ship)[0];
                                    var hx = last.x1 + (last.x2-last.x1) * 350 / last.dist;
                                    var hy = last.y1 + (last.y2-last.y1) * 350 / last.dist;
                                    nextturnloc = "HYP: Approx. (" + Math.round(hx) + ", " + Math.round(hy) + ")";
                                }*/
                            }                            
                        }
                    }                
                    
                }
            }
            vgap.shipScreen.turns = turns;
            vgap.shipScreen.adjustMovementFields();
        }
    }

}    
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);    
document.body.removeChild(script);    
