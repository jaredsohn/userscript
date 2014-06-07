// ==UserScript==
// @name          Planets.nu - Mine Scoop Patch
// @description   Adds yellow circle to Minefield Preview to show pre-decay radius
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @version 0.1
// ==/UserScript==

function wrapper () { // wrapper for injection

    vgapShipScreen.prototype.draw = function (ctx) {

        if (!ctx)
            ctx = vgap.map.ctx;

        //draw any special functionality.
        //vgap.map.special.remove();
        //vgap.map.special = vgap.map.paper.set();

        if (this.ship.mission == 2 || (this.ship.mission == 8 && vgap.player.raceid == 7) || this.ship.mission == 1 || vgap.minepreview) {
            var minefields = new Array();

            //create array of proposed minefields
            for (var j = 0; j < vgap.minefields.length; j++) {
                var mf = vgap.minefields[j];
                minefields.push({ ownerid: mf.ownerid, x: mf.x, y: mf.y, radius: mf.radius, isweb: mf.isweb, units: mf.units, radiusPresweep: mf.radius });
            }
            
                    console.log(minefields);

            //draw mine laying minefields preview
            for (var i = 0; i < vgap.myships.length; i++) {
                var ship = vgap.myships[i];
                if (ship.neutronium > 0 && ship.ammo > 0 && ship.torps > 0) {
                    if (ship.mission == 2 || (ship.mission == 8 && vgap.player.raceid == 7)) {

                        var x = ship.x;
                        var y = ship.y;
                        if (vgap.atCommand(ship)) {
                            var next = vgap.getNextLoc(ship);
                            x = next.x;
                            y = next.y;
                        }

                        var isWeb = (ship.mission == 8);

                        var fieldOwnerId = ship.ownerid;

                        //miX friendlycode
                        if (ship.friendlycode.toLowerCase().indexOf("mi") === 0) {
                            fieldOwnerId = vgap.getPlayerIdVal(ship.friendlycode.toLowerCase().replace("mi", ""));
                            if (fieldOwnerId == 0 || fieldOwnerId > vgap.game.slots)
                                fieldOwnerId = ship.ownerId;
                        }
                        var units = this.getMineUnits(ship);

                        //determine if we are inside of one of our minefields
                        var minefield = null;
                        var closest = 10000.0;
                        for (var j = 0; j < minefields.length; j++) {
                            var closestField = minefields[j];
                            if (closestField.isweb == isWeb && closestField.ownerid == fieldOwnerId) {
                                var dist = parseFloat(Math.dist(x, y, closestField.x, closestField.y));
                                if (dist < closest) {
                                    minefield = closestField;
                                    closest = dist;
                                }
                                if (closest == 0)
                                    break;
                            }
                        }
                        var newField = true;
                        if (minefield != null) {
                            if (closest <= minefield.radius)
                                newField = false;
                        }
                        //new field
                        if (newField) {
                            minefield = { ownerid: fieldOwnerId, x: x, y: y, isweb: isWeb, units: 0 };
                            minefields.push(minefield);
                        }

                        //add the units to the minefield
                        minefield.units += units;
                        minefield.changed = 1;

                        //max minefield, don't lay so many torps
                        var maxUnits = 10000;
                        if (vgap.advActive(48)) //large minefields
                            maxUnits = 22500;
                        if (minefield.units > maxUnits) {

                            var unitsLayed = minefield.units - maxUnits;

                            minefield.units = maxUnits;


                        }

                        minefield.radius = Math.sqrt(minefield.units);

                    }
                }

            }
            var sets = vgap.accountsettings;
            for (var j = 0; j < minefields.length; j++) {
                var mf = minefields[j];
                if (mf.changed == 1) {

                    vgap.setMineColors(mf);

                    var radius = Math.sqrt(mf.units);

                    var screenX = vgap.map.screenX(mf.x);
                    var screenY = vgap.map.screenY(mf.y);
                    var rad = (radius * vgap.map.zoom) - 1;

                    if (ctx && rad > 0) {
                        ctx.fillStyle = colorToRGBA(mf.color, 0.1);
                        ctx.beginPath();
                        ctx.arc(screenX, screenY, rad, 0, Math.PI * 2, false);
                        ctx.closePath();
                        ctx.fill();
                    }
                    //else
                    //    vgap.map.special.push(vgap.map.paper.circle(vgap.map.screenX(mf.x), vgap.map.screenY(mf.y), (radius * vgap.map.zoom) - 1).attr(attr));
                }
            }

            //draw mine sweep minefields preview
            for (var i = 0; i < vgap.myships.length; i++) {
                var ship = vgap.myships[i];
                if (ship.neutronium > 0 && ship.mission == 1) {

                    var x = ship.x;
                    var y = ship.y;
                    if (vgap.atCommand(ship)) {
                        var next = vgap.getNextLoc(ship);
                        x = next.x;
                        y = next.y;
                    }

                    var sweepUnits = ship.beams * ship.beamid * ship.beamid;
                    var fighterUnits = 0;
                    if (vgap.player.raceid == 11 && ship.bays > 0)
                        fighterUnits = ship.ammo * 20;

                    if (sweepUnits > 0 || fighterUnits > 0)
                        this.sweepMines(minefields, x, y, sweepUnits, fighterUnits);

                    if (ship.friendlycode.toLowerCase() == "msc" && ship.torps > 0)
                        this.mineScoop(minefields, ship, x, y);
                }
            }
            
            
            //////////////////////////////////////////////////////
            for (var i = 0; i < minefields.length; i++) {
                var minefield = minefields[i];               
                if ((minefield.ownerid == vgap.player.id) && (minefield.swept == 1)) {
                    console.log(minefield);
                    var rad = (minefield.radius * vgap.map.zoom) - 1;
                    if (rad > 0) {
                        var screenX = vgap.map.screenX(minefield.x);
                        var screenY = vgap.map.screenY(minefield.y);
                        ctx.strokeStyle = colorToRGBA("#ddff00", 0.6);
                        ctx.beginPath();
                        ctx.arc(screenX, screenY, rad, 0, Math.PI * 2, false);
                        ctx.closePath();
                        ctx.stroke();     
                    }
                }
            }            

            //mine decay
            for (var i = 0; i < minefields.length; i++) {
                var minefield = minefields[i];
                var decay = 0.95;
                for (var j = 0; j < vgap.nebulas.length; j++) {
                    var neb = vgap.nebulas[j];
                    if (Math.dist(minefield.x, minefield.y, neb.x, neb.y) < (neb.radius + minefield.radius)) {
                        decay = 0.85;
                        break;
                    }
                }
                minefield.units = (minefield.units * decay) - 1;
                minefield.swept = 1;
                minefield.radius = Math.sqrt(minefield.units);
            }

            for (var i = 0; i < vgap.mystarbases.length; i++) {
                var starbase = vgap.mystarbases[i];
                if (starbase.mission == 11) {
                    var planet = vgap.getPlanet(starbase.planetid);
                    var beams = Math.min(10, Math.round(Math.sqrt((planet.defense + starbase.defense) / 3)));
                    var beamid = starbase.beamtechlevel;

                    var sweepUnits = beams * beamid * beamid;
                    var fighterUnits = 0;
                    if (vgap.advActive(41))
                        fighterUnits = starbase.fighters;

                    if (sweepUnits > 0 || fighterUnits > 0)
                        this.sweepMines(minefields, ship.x, ship.y, sweepUnits, fighterUnits);
                }

            }

            var sets = vgap.accountsettings;
            for (var j = 0; j < minefields.length; j++) {
                var mf = minefields[j];
                if (mf.swept == 1) {
                    var radius = Math.sqrt(mf.units);
                    vgap.setMineColors(mf);

                    var screenX = vgap.map.screenX(mf.x);
                    var screenY = vgap.map.screenY(mf.y);

                    if (ctx) {
                        if (radius > 0) {

                            var rad = (radius * vgap.map.zoom) - 1;
                            if (rad > 0) {
                                ctx.fillStyle = colorToRGBA(mf.color, 0.1);
                                ctx.beginPath();
                                ctx.arc(screenX, screenY, rad, 0, Math.PI * 2, false);
                                ctx.closePath();
                                ctx.fill();
                            }
                        }

                        if (mf.radiusPresweep > 0) {

                            var rad = (mf.radiusPresweep * vgap.map.zoom) - 1;
                            if (rad > 0) {
                                ctx.fillStyle = colorToRGBA("#000000", 0.1);
                                ctx.beginPath();
                                ctx.arc(screenX, screenY, rad, 0, Math.PI * 2, false);
                                ctx.closePath();
                                ctx.fill();
                            }
                        }
                    }
                    else {
                        if (radius > 0)
                            vgap.map.special.push(vgap.map.paper.circle(vgap.map.screenX(mf.x), vgap.map.screenY(mf.y), (radius * vgap.map.zoom) - 1).attr(attr));

                        if (mf.radiusPresweep > 0) {
                            attr = { stroke: "black", "stroke-width": "2", "stroke-opacity": 0, fill: "black", "fill-opacity": 0.1 };
                            vgap.map.special.push(vgap.map.paper.circle(vgap.map.screenX(mf.x), vgap.map.screenY(mf.y), (mf.radiusPresweep * vgap.map.zoom) - 1).attr(attr));
                        }
                    }
                }
            }

        }

        //draw location history for this ship.
        if (this.showShipLocHistory) {
            var x1 = this.ship.x;
            var y1 = this.ship.y;
            var opacity = 1;
            for (var i = 0; i < this.ship.history.length; i++) {
                var loc = this.ship.history[i];
                var x2 = loc.x;
                var y2 = loc.y;
                opacity *= 0.75;
                if (opacity < 0.25)
                    opacity = 0.25;
               
                if (ctx) {
                    ctx.strokeStyle = colorToRGBA("#ADD8E6", opacity);
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.dashedLine(vgap.map.screenX(x1), vgap.map.screenY(y1), vgap.map.screenX(x2), vgap.map.screenY(y2), [5, 3]);
                    ctx.closePath();
                    ctx.stroke();
                }
                else {
                    var attr = { stroke: "lightblue", "stroke-width": "1", "stroke-dasharray": "- ", "stroke-opacity": opacity };
                    vgap.map.special.push(vgap.map.paper.path("M" + vgap.map.screenX(x1) + " " + vgap.map.screenY(y1) + "L" + vgap.map.screenX(x2) + " " + vgap.map.screenY(y2)).attr(attr));
                }
                x1 = x2;
                y1 = y2;
            }
        }
        if (!ctx) 
            vgap.map.paper.safari();
    }
    
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
document.body.removeChild(script); 
