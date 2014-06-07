// ==UserScript==
// @name          Planets.nu minefield preview enhancement
// @description   Adds basic mine sweep visualization (no fighter sweep, no mine scoop). Adds "Minefield Preview" map tool.
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://play.planets.nu/*
// @include       http://*.planets.nu/*
// @homepage      http://planets.nu/discussion/utility-script-mine-sweep-visualization
// @version 0.8
// ==/UserScript==

/*------------------------------------------------------------------------------
AS OF VERSION 0.6 this script only adds quick links to ship screen.
All other functionality has been commented out since it has been added to the
client itself.

0.8 - Adds applicable FCs to main ship screen
------------------------------------------------------------------------------*/

function wrapper () { // wrapper for injection

/*
vgapShipScreen.prototype.draw = function () {
        //draw any special functionality.
        vgap.map.special.remove();
        vgap.map.special = vgap.map.paper.set(); // Fix for client 1.97

        if ( (vgap.shipScreenOpen && (this.ship.mission == 2 || (this.ship.mission == 8 && vgap.player.raceid == 7) || this.ship.mission == 1)) || vgap.minepreview) {

            //create array of proposed minefields
            var minefields = new Array();
            for (var j = 0; j < vgap.minefields.length; j++) {
                var mf = vgap.minefields[j];
                minefields.push({ ownerid: mf.ownerid, x: mf.x, y: mf.y, radius: mf.radius, isweb: mf.isweb, units: mf.units });
            }

            //draw mine laying minefields preview
            for (var i = 0; i < vgap.myships.length; i++) {
                var ship = vgap.myships[i];
                if (ship.neutronium > 0 && ship.ammo > 0 && ship.torps > 0) {
                    if (ship.mission == 2 || (ship.mission == 8 && vgap.player.raceid == 7)) {
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
                                var dist = parseFloat(vgap.map.getDist(ship.x, ship.y, closestField.x, closestField.y));
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
                            minefield = { ownerid: fieldOwnerId, x: ship.x, y: ship.y, isweb: isWeb, units: 0 };
                            minefields.push(minefield);
                        }

                        //add the units to the minefield
                        minefield.units += units;
                        minefield.changed = 1;

                        //max minefield, don't lay so many torps
                        if (minefield.units > 22500)
                            minefield.units = 22500;

                        minefield.radius = Math.sqrt(minefield.units);

                    }
                }

            }
            
            
            
            //draw mine sweep minefields preview
            for (var i = 0; i < vgap.myships.length; i++) {
                var ship = vgap.myships[i];
                if (ship.neutronium > 0) {
                    if (ship.mission == 1 && ship.beams > 0 && ship.friendlycode.toLowerCase() != "msc") {
                    
                        var sweepUnits = ship.beams * ship.beamid * ship.beamid;

                        var minefield = null;
                        for (var j = 0; j < minefields.length; j++) {
                                var minefield = minefields[j];
                                if (minefield.radiusPresweep == null)
                                    minefield.radiusPresweep = 0;
                                var dist = parseFloat(vgap.map.getDist(ship.x, ship.y, minefield.x, minefield.y));
                                
                                if ( minefield.ownerid != ship.ownerid && !vgap.allied(minefield.ownerid) ) {
                                
                                    if ( dist <= minefield.radius + (minefield.isweb ? 0 : 5) ) {
                                        minefield.units -= sweepUnits * (minefield.isweb ? 3 : 4);
                                        if ( minefield.units < 0 )
                                            minefield.units = 0;
                                        minefield.changed = 1;
                                        if ( minefield.radiusPresweep <= 0 )
                                            minefield.radiusPresweep = minefield.radius;
                                            //console.log(minefield.radiusPresweep);
                                        minefield.radius = Math.sqrt(minefield.units);
                                        //console.log(minefield.units);
                                    }
                                }
                            
                        }

                    }
                }

            }
            
            var sets = vgap.accountsettings;
            for (var j = 0; j < minefields.length; j++) {
                var mf = minefields[j];
                if (mf.changed == 1) {
                    var radius = Math.sqrt(mf.units);

                    var attr = { stroke: sets.mymines, "stroke-width": "2", "stroke-opacity": 0, fill: sets.mymines, "fill-opacity": 0.1 };
                    if (mf.isweb)
                        attr = { stroke: sets.webmines, "stroke-width": "2", "stroke-opacity": 0, fill: sets.webmines, "fill-opacity": 0.1 };
                    else if (vgap.allied(mf.ownerid))
                        attr = { stroke: sets.allymines, "stroke-width": "2", "stroke-opacity": 0, fill: sets.allymines, "fill-opacity": 0.1 };
                    else if (mf.ownerid != vgap.player.id)
                        attr = { stroke: sets.enemymines, "stroke-width": "2", "stroke-opacity": 0, fill: sets.enemymines, "fill-opacity": 0.1 };

                    vgap.map.special.push(vgap.map.paper.circle(vgap.map.screenX(mf.x), vgap.map.screenY(mf.y), (radius * vgap.map.zoom) - 1).attr(attr));
                    
                    if (mf.radiusPresweep > 0 ) {
                        //vgap.map.special.push(vgap.map.paper.circle(vgap.map.screenX(mf.x), vgap.map.screenY(mf.y), (radius * vgap.map.zoom) - 1).attr(attr));
                        attr = { stroke: "black", "stroke-width": "2", "stroke-opacity": 0, fill: "black", "fill-opacity": 0.1 };
                        vgap.map.special.push(vgap.map.paper.circle(vgap.map.screenX(mf.x), vgap.map.screenY(mf.y), (mf.radiusPresweep * vgap.map.zoom) - 1).attr(attr));
                    }
                }
            }
        }
        vgap.map.paper.safari();
    };

var old_loadControls = vgapMap.prototype.loadControls; 
vgapMap.prototype.loadControls = function () {

        old_loadControls.apply(this, arguments);
        
        var additem = "<li onclick='vgap.minepreview = !vgap.minepreview; vgap.shipScreen.draw();'>Minefield Preview</li>";
        
        //$("#MapTools").append(additem);
        $("#MapTools > li:contains('Connections (q)')").after(additem);

        var height = this.controls.height() - this.toolsMenu.height();
        this.controls.css("marginTop", "-" + this.controls.height() + "px");

    };
*/

vgapShipScreen.prototype.genRandFC = function () {
    var code = "";
    var bias = 0;
    for (i = 0; i <3; i++) {
        var c = (Math.floor(Math.random() * 26) + 10).toString(36);
        if (bias == 2) c = c.toLowerCase();
        else if (bias == -2) c = c.toUpperCase();
        else if (Math.random() < 0.5) {
            c = c.toLowerCase();
            bias--;
        }
        else {
            c = c.toUpperCase();
            bias++;
        }        
        code += c;
    }
    return code;
}

var old_loadOrders = vgapShipScreen.prototype.loadOrders;
vgapShipScreen.prototype.loadOrders = function () {

        old_loadOrders.apply(this, arguments);

        var ship = this.ship;
        
/*
        if (ship.mission == 1) {
            html = " <span class='valsup'>(" + ship.beams * ship.beamid * ship.beamid * 4 + " mines / " + ship.beams * ship.beamid * ship.beamid * 3 + " web)</span>";
            $("#ShipOrders td.textval:contains('Mine Sweep')").append(html);
        }
*/
        if (ship.mission == 2 || (ship.mission == 8 && vgap.player.raceid == 7)) {
            html = "<br />"; //"<table><tr>";
            vals = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "h", "a"];
            texts = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "quarter", "half", "all"];
            for (i=0; i<vals.length; i++) {
                html += " <a onclick='vgap.shipScreen.ship.friendlycode = \"md" + vals[i] + "\";vgap.shipScreen.loadOrders();vgap.shipScreen.loadMovement();vgap.shipScreen.draw();return false;'>" + texts[i] + "</a>";
            }
            //html += "</tr></table>";
            $("#ShipOrders td.textval:contains('Lay')").append(html);
        } 
        
        html = "<td>";
        html += " <a style='color:blue;' onclick='vgap.shipScreen.ship.friendlycode = vgap.shipScreen.genRandFC();vgap.shipScreen.loadOrders();vgap.shipScreen.loadMovement();vgap.shipScreen.draw();return false;'>RND</a>";
        for (i=0; i<this.fcodes.length; i++) {
            html += " <a style='color:blue;' onclick='vgap.shipScreen.ship.friendlycode = \"" + this.fcodes[i].code + "\";vgap.shipScreen.loadOrders();vgap.shipScreen.loadMovement();vgap.shipScreen.draw();return false;'>" + this.fcodes[i].code + "</a>";
        }
        html += "</td>";
        $("#ShipOrders .fc").before(html);
            
    };          
    
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);    