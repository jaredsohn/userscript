// ==UserScript==
// @name          Planets.nu message links add-on
// @description   Adds links in messages from other players to ships/planets/bases. 
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @version 0.9
// ==/UserScript==

/*------------------------------------------------------------------------------
This add-on improves inter-player communications by adding links into the 
message to replace strings of the following formats:

s#XXX
p#XXX
b#XXX

where s, p, b are for ship, planet, base respectively, and XXX is the id 
number of the object. If the object is found, the text is replace by a link 
including the name, that when clicked selects the object on the map. 
Example, the string:

s#42

will be replaced by a link similar to "S#42: GOBRIE CLASS BATTLE CARRIER", 
which will also select that ship when clicked.

Version History:
0.3 Adds notes to bottom of ship and planet screens. Applies same link format.
0.4 Adds links to system messages too, searching for "ID#XXX". Simple mided
    implementation, will likely give strange results in some corner cases,
    such as a planet and a ship having both the same ID *and* name, or a ship
    having a name set to the name and ID of a different ship/planet.
0.5 Fixes system message links to handle ship names with special chars.
0.7 Changes link color for new version
------------------------------------------------------------------------------*/

function wrapper () { // wrapper for injection

var addLinksToText = function (index, value) {
            //console.log(index);
            return value.replace(/([spb])#([0-9]{1,3})/gi, function (match, type, textid) {
                id = parseInt(textid, 10);
                var jumpfunc = "";
                var mouseover = "";
                var target = null;
                switch (type.toUpperCase()) {
                    case "P":
                        target = vgap.getPlanet(id);
                        if (target != null) {
                            jumpfunc = ( vgap.player.id == target.ownerid ? "vgap.map.selectPlanet(" + id + ");" : "vgap.map.planetSurvey(" + id + ");" );
                        }
                        break;
                    case "S":
                        target = vgap.getShip(id);
                        if (target != null) {
                            jumpfunc = ( vgap.player.id == target.ownerid ? "vgap.map.selectShip(" + id + ");" : "vgap.map.shipSurvey(" + id + ");" );
                            mouseover = " onmouseover='vgap.showHover(" + id + ");' onmouseout='vgap.hideHover();'";
                        }
                        break;
                    case "B":
                        target = vgap.getStarbase(id);
                        if (target != null) {
                            target = vgap.getPlanet(target.planetid);
                            jumpfunc = ( vgap.player.id == target.ownerid ? "vgap.map.selectStarbase(" + id + ");" : "vgap.map.planetSurvey(" + id + ");" );
                        }
                        break;                         
                }
                if (target != null) {
                    var link = "<a style='color:cyan;' onclick='vgap.showMap();vgap.map.centerMap(" + target.x + ", " + target.y + ");" + jumpfunc + "return false;'" + mouseover + " >";
                    link += match.toUpperCase() + ": " + target.name + "</a>";
                    return link;
                }
                else
                    return match;
            });
    };
    
var addLinksToMessage = function (index, value) {
            var matches = value.match(/ID#[0-9]{1,3}/g);
            //console.log(matches);
            if (matches != null) {
                for (i=0; i<matches.length; i++) {
                    var id = parseInt(matches[i].substring(3));
                    var ship = vgap.getShip(id);
                    if (ship != null) {
                        value = value.replace( new RegExp(ship.name.replace(/[-[\]{}()*+?.,\\^$\|#\s]/g, "\\$&") + " " + matches[i], "g"), function (match) {
                            jumpfunc = ( vgap.player.id == ship.ownerid ? "vgap.map.selectShip(" + id + ");" : "vgap.map.shipSurvey(" + id + ");" );
                            mouseover = " onmouseover='vgap.showHover(" + id + ");' onmouseout='vgap.hideHover();'";
                            return "<a style='color:cyan;' onclick='vgap.showMap();vgap.map.centerMap(" + ship.x + ", " + ship.y + ");" + jumpfunc + "return false;'" + mouseover + " >" + match + "</a>"; 
                        });
                    }
                    var planet = vgap.getPlanet(id);
                    if (planet != null) {
                        value = value.replace( new RegExp(planet.name.replace(/[-[\]{}()*+?.,\\^$\|#\s]/g, "\\$&") + " " + matches[i], "g"), function (match) {
                            jumpfunc = ( vgap.player.id == planet.ownerid ? "vgap.map.selectPlanet(" + id + ");" : "vgap.map.planetSurvey(" + id + ");" );
                            mouseover = "";
                            return "<a style='color:cyan;' onclick='vgap.showMap();vgap.map.centerMap(" + planet.x + ", " + planet.y + ");" + jumpfunc + "return false;'" + mouseover + " >" + match + "</a>"; 
                        });
                    }
                }                
            }
            return value;
    };    
    
var drawNoteOnActiveScreen = function (note) {
        if (note != null) {
            $("#Notes").html(note.body.replace(/\n/g, "<br/>"));
            $("#Notes").html(addLinksToText);
        };
    };
    
var old_saveNote = vgaPlanets.prototype.saveNote;
vgaPlanets.prototype.saveNote = function (id, noteType) {

        old_saveNote.apply(this, arguments);
        
        if ( (noteType == 2 && this.shipScreenOpen && this.shipScreen.ship.id == id) || (noteType == 1 && this.planetScreenOpen && this.planetScreen.planet.id == id))
            drawNoteOnActiveScreen(vgap.getNote(id, noteType));
    
    };

var oldShowPlayerMessages = vgapDashboard.prototype.showPlayerMessages;
vgapDashboard.prototype.showPlayerMessages = function () {
        
        oldShowPlayerMessages.apply(this, arguments);
        
        $("#MessageInbox td").html(addLinksToText);
            //return "Beefer";

    };
    
var oldShowMessages = vgapDashboard.prototype.showMessages;
vgapDashboard.prototype.showMessages = function (messagetype) {
        
        oldShowMessages.apply(this, arguments);
        
        $("#MessageInbox td").html(addLinksToMessage);
            //return "Beefer";

    };
    
var oldShipScreen_load = vgapShipScreen.prototype.load;
vgapShipScreen.prototype.load = function (ship) {

        oldShipScreen_load.apply(this, arguments);
        $("#ShipOrders").after("<div class='SepContainer' id='Notes'/>");
        drawNoteOnActiveScreen(vgap.getNote(this.ship.id, 2));

    };
    
var oldPlanetScreen_load = vgapPlanetScreen.prototype.load;
vgapPlanetScreen.prototype.load = function (planet) {

        oldPlanetScreen_load.apply(this, arguments);
        $("#Colony").after("<div class='SepContainer' id='Notes'/>");
        drawNoteOnActiveScreen(vgap.getNote(this.planet.id, 1));

    };    

} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);    
document.body.removeChild(script);    