// ==UserScript==
// @name          Planets.nu cloning preview
// @description   Fills in Space Dock build info with ship cloning info when applicable.
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://*.planets.nu/*
// @homepage      
// @version 0.3
// ==/UserScript==

/*------------------------------------------------------------------------------
 1. When a starbase is not currently building a ship, this add-on scans the
    ships in orbit for the first ship belonging to the current player
    with FC "cln". If found cloning info (components and cloning cost)
    for the ship id displayed in the Space Dock area of the starbase screen.
    
 Limitations:
    Does not check if the clone will actually work, so it could fail for a
    variety of reasons, including insufficient base tech, shortage of minerals
    or megacredits, ship hull can be built normally by player race, or player
    race is not able to clone.
    
 (ver 0.2) adds marking in red requirements that aren't met
------------------------------------------------------------------------------*/


function wrapper () { // wrapper for injection



var old_loadSpaceDock = vgapStarbaseScreen.prototype.loadSpaceDock; 
vgapStarbaseScreen.prototype.loadSpaceDock = function () {

        old_loadSpaceDock.apply(this, arguments);

        //Mark Red If Over
        mrio = function (cost, avail) {
            if (cost > avail) return " style='color: red' ";
            return "";
        }
        
        
        if (this.planet.debrisdisk > 0)
            return;        
        
        var starbase = this.starbase;
        var planet = this.planet;
        var cloneship = null;
        
        if (!starbase.isbuilding) {
            for (var i = 0; i < this.ships.length && !cloneship; i++) {
            var ship = this.ships[i];
                if (ship.ownerid == planet.ownerid && ship.friendlycode.toLowerCase() == "cln") {
                    cloneship = ship;
                    var hull = vgap.getHull(cloneship.hullid);
                    var engine = vgap.getEngine(cloneship.engineid);
                    
                    var cost =   2 * (hull.cost +       hull.engines * engine.cost +       (cloneship.beams > 0 ? cloneship.beams * vgap.getBeam(cloneship.beamid).cost : 0) +       (cloneship.torps > 0 ? cloneship.torps * vgap.getTorpedo(cloneship.torpedoid).launchercost : 0) );
                    var duranium   = (hull.duranium +   hull.engines * engine.duranium +   (cloneship.beams > 0 ? cloneship.beams * vgap.getBeam(cloneship.beamid).duranium : 0) +   (cloneship.torps > 0 ? cloneship.torps * vgap.getTorpedo(cloneship.torpedoid).duranium : 0) );                 
                    var tritanium  = (hull.duranium +   hull.engines * engine.tritanium +  (cloneship.beams > 0 ? cloneship.beams * vgap.getBeam(cloneship.beamid).tritanium : 0) +  (cloneship.torps > 0 ? cloneship.torps * vgap.getTorpedo(cloneship.torpedoid).tritanium : 0) ); 
                    var molybdenum = (hull.molybdenum + hull.engines * engine.molybdenum + (cloneship.beams > 0 ? cloneship.beams * vgap.getBeam(cloneship.beamid).molybdenum : 0) + (cloneship.torps > 0 ? cloneship.torps * vgap.getTorpedo(cloneship.torpedoid).molybdenum : 0) ); 
                    
                    var html = "<img src='" + hullImg(hull.id) + "'/>";
                    html += "<h2 style='white-space: nowrap'>CLONE " + cloneship.id + ": " + cloneship.name + "</h2><div>";
                    html += "<table width='285px'><tr>";
                    html += "<td" + mrio(hull.techlevel, starbase.hulltechlevel) + ">" + hull.name + "</td><td class='headright'" + mrio(cost, planet.megacredits) + ">Megacredits:</td><td class='val'>" + cost + "</td>";
                    html += "</tr><tr>";
                    html += "<td" + mrio(engine.techlevel, starbase.enginetechlevel) + ">" + hull.engines + " " + engine.name + "</td><td class='headright'" + mrio(duranium, planet.duranium) + ">Duranium:</td><td class='val'>" + duranium + "</td>";
                    html += "</tr><tr><td>";
                    if (cloneship.beams > 0) {
                        var beam = vgap.getBeam(cloneship.beamid);
                        html += "<span" + mrio(beam.techlevel, starbase.beamtechlevel) + ">" + cloneship.beams + " " + beam.name + "</span>";
                    }
                    html += "</td><td class='headright'" + mrio(tritanium, planet.tritanium) + ">Tritanium:</td><td class='val'>" + tritanium + "</td>";
                    html += "</tr><tr><td>";
                    if (cloneship.torps > 0) {
                        var torp = vgap.getTorpedo(cloneship.torpedoid);
                        html += "<span" + mrio(torp.techlevel, starbase.torptechlevel) + ">" + cloneship.torps + " " + torp.name;
                    }
                    if (hull.fighterbays > 0) {
                        html += hull.fighterbays + " fighter bays";
                    }
                    html += "</td><td class='headright'" + mrio(molybdenum, planet.molybdenum) + ">Molybdenum:</td><td class='val'>" + molybdenum + "</td>";
                    html += "</tr></table>";                    
                    html += "</div>";
                    
                    $("#SpaceDock").html(html);
                    
                }
            }
        }
        
    };

    
}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);