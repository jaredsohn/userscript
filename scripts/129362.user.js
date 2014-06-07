// ==UserScript==
// @name          Planets.nu improved hover text
// @description   Adds Dark Sense and Super Spy info to plaent hover text. Also adds additional info for ships and bases.
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://play.planets.nu/*
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @homepage      http://planets.nu/discussion/utility-script-integrates-dark-sense-and-super-spy-to-planet-hover-text
// @version 0.14
// ==/UserScript==

/*------------------------------------------------------------------------------
 1. Shows total mineral info if available from darksene or superspy
 2. Adds FC to planet info (could make to only show if not "???" but currently
    always shows
 3. If there's a base, shows fighters as well.
 4. Moved the code to show planet owner outside of infoturn==0 test. When player
    knew ownership from a "share intel", infoturn was still 0,
    so the owner was not shown in the hover text
 5. (ver 0.4) Added FC to ships too
 6. (ver 0.5) Shorten form to 3 lines for owned ships (controlled by
    vgap.terseInfo). Add damage and cloak state if applicable.
 7. (ver 0.6) Add Warp for owned ships. Also, add ship hull being built to 
    starbase.
 8. (ver 0.7) Add Map Tools Control "Switch Info View" to switch views.
 9. (ver 0.7) Add ship owner in short form for allies
 10.(ver 0.9) Add persistent settings, remove switch view map tool
 11.(ver 0.10) Add setting to display ship mission for player's ships
 12.(ver 0.11) More information for allies displayed if ally update script is
    in use.
 13.(ver 0.11) Replaces showHover and shipTransferView to show more info when
    available
 14.(ver 0.13) Fixes show race for allied ships
 15.(ver 0.14) Update for new site

------------------------------------------------------------------------------*/


function wrapper () { // wrapper for injection

vgaPlanets.prototype.setupAddOn = function (addOnName) {
        if (vgaPlanets.prototype.addOns == null) vgaPlanets.prototype.addOns = {};
        vgaPlanets.prototype.addOns[addOnName] = {};
        var settings = localStorage.getItem(addOnName + ".settings");
        if (settings != null)
            vgaPlanets.prototype.addOns[addOnName].settings = JSON.parse(settings);
        else
            vgaPlanets.prototype.addOns[addOnName].settings = {};
        vgaPlanets.prototype.addOns[addOnName].saveSettings = function () {
            localStorage.setItem(addOnName + ".settings", JSON.stringify(vgaPlanets.prototype.addOns[addOnName].settings));
        }
    };
vgaPlanets.prototype.setupAddOn("vgapImprovedHover");

    
/*
if (vgaPlanets.prototype.addOns == null) vgaPlanets.prototype.addOns = {};
vgaPlanets.prototype.addOns.vgapImprovedHover = {};
var settings = localStorage.getItem("vgapImprovedHover.settings");
if (settings != null) 
    vgaPlanets.prototype.addOns.vgapImprovedHover.settings = JSON.parse(settings);
else
    vgaPlanets.prototype.addOns.vgapImprovedHover.settings = {}; //{terseInfo: false};
    
vgaPlanets.prototype.addOns.vgapImprovedHover.saveSettings = function () {
        localStorage.setItem("vgapImprovedHover.settings", JSON.stringify(vgaPlanets.prototype.addOns.vgapImprovedHover.settings));
    };
*/

vgapMap.prototype.hitTextBox = function (hit) {
        var settings = vgap.addOns.vgapImprovedHover.settings;
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
                //txt += this.hitText(hit, hit.isPlanet).replace("&nbsp", "");
            }
            else {
                if (hit.nativeclans > 0) {
                    if (vgap.terseInfo)
                        txt += "<tr><td colspan='8'>" + addCommas(hit.nativeclans * 100) + " " + hit.nativeracename + " - " + hit.nativegovernmentname + "</td></tr>";
                    else
                        txt += "<tr><td colspan='4'>" + addCommas(hit.nativeclans * 100) + " " + hit.nativeracename + " - " + hit.nativegovernmentname + "</td></tr>";
                }
                var nText = gsv(hit.neutronium) + " / " + gsv(hit.groundneutronium);
                var dText = gsv(hit.duranium) + " / " + gsv(hit.groundduranium);
                var tText = gsv(hit.tritanium) + " / " + gsv(hit.groundtritanium);
                var mText = gsv(hit.molybdenum) + " / " + gsv(hit.groundmolybdenum);
                if (hit.totalneutronium > 0 && hit.groundneutronium < 0) { //"total" info available, surface/ground is not, enables display of dark sense and superspy info in hover text
                    nText = hit.totalneutronium;
                    dText = hit.totalduranium;
                    tText = hit.totaltritanium;
                    mText = hit.totalmolybdenum;
                }
                if (false /*vgap.terseInfo*/) {
                    txt +=
                    "<tr> <td>Neu: </td><td>&nbsp;" + nText + "&nbsp;</td>" + "<td>Col: </td><td>&nbsp;" + addCommas(gsv(hit.clans * 100)) + "</td></tr>" +
                    "<tr> <td>Dur: </td><td>&nbsp;" + dText + "&nbsp;</td>" + "<td>Sup: </td><td>&nbsp;" + gsv(hit.supplies) + "</td></tr>" +
                    "<tr> <td>Tri: </td><td>&nbsp;" + tText + "&nbsp;</td>" + "<td>MC: </td><td>&nbsp;" + gsv(hit.megacredits) + "</td></tr>" +
                    "<tr> <td>Mol: </td><td>&nbsp;" + mText + "&nbsp;</td>" + "<td>FC: </td><td>&nbsp;" + hit.friendlycode + "</td></tr>";
                }
                else {
                    txt +=
                    "<tr> <td>Neutronium: </td><td>&nbsp;" + nText + "&nbsp;</td>" + "<td>Colonists: </td><td>&nbsp;" + addCommas(gsv(hit.clans * 100)) + "</td></tr>" +
                    "<tr> <td>Duranium: </td><td>&nbsp;" + dText + "&nbsp;</td>" + "<td>Supplies: </td><td>&nbsp;" + gsv(hit.supplies) + "</td></tr>" +
                    "<tr> <td>Tritanium: </td><td>&nbsp;" + tText + "&nbsp;</td>" + "<td>Megacredits: </td><td>&nbsp;" + gsv(hit.megacredits) + "</td></tr>" +
                    "<tr> <td>Molybdenum: </td><td>&nbsp;" + mText + "&nbsp;</td>" + "<td>Friendly Code: </td><td>&nbsp;" + hit.friendlycode + "</td></tr>";                
                }
                
                var starbase = vgap.getStarbase(hit.id);
                if (starbase != null && (hit.ownerid == vgap.player.id || hit.allyupdate)) {
                    txt += "<tr> <td>" + (false /*settings.terseInfo*/ ? "Ftr: " : "Fighters: " ) + "</td><td>&nbsp;" + starbase.fighters  + "</td></tr>";
                    if (starbase.isbuilding) {
                        txt += "<tr> <td colspan='4'>Build: " + vgap.getHull(starbase.buildhullid).name + "</td></tr>";
                    }
                    
                }
                //txt += this.hitText(hit, hit.isPlanet).replace("&nbsp", "");
            }
            //known planet                
            if (hit.ownerid != vgap.player.id && hit.ownerid != 0) {
                var player = vgap.getPlayer(hit.ownerid);
                var race = vgap.getRace(player.raceid);
                txt += "<tr><td colspan='4'>" + race.name + " (" + player.username + ")</td></tr>";
            }            
            txt += this.hitText(hit, hit.isPlanet).replace("&nbsp", "");
            txt += "</table></div>";
        } else {//ship
            var ship = hit;
            var hull = vgap.getHull(ship.hullid);
            var totalCargo = ship.ammo + ship.duranium + ship.tritanium + ship.molybdenum + ship.supplies + ship.clans;
            var html = "<div class='ItemSelectionBox minCorrection'>";
            if (ship.ownerid == vgap.player.id || vgap.fullallied(ship.ownerid)) {            
                var player = vgap.getPlayer(ship.ownerid);
                var race = vgap.getRace(player.raceid);            
                //html += "<span>" + ship.id + ": " + ship.name + "</span>";
                html += "<table class='CleanTable' style='width: 100%'>";
                if (settings.terseInfo) {
                    html += "<tr><td colspan='8'>" + ship.id + ": " + ship.name + "</td></tr>";
                    if ( (settings.showHullForAllies && vgap.fullallied(ship.ownerid)) || (settings.showHullForMine && ship.ownerid == vgap.player.id) )
                        html += "<tr><td colspan='8'>" + hull.name + "</td></tr>";                    
                    html += "<tr><td>Neu:</td><td>&nbsp;" + gsv(ship.neutronium) + " / " + hull.fueltank + " </td><td>&nbsp;&nbsp;&nbsp;Dur:</td><td>&nbsp;" + gsv(ship.duranium) + "</td><td>&nbsp;&nbsp;&nbsp;Tri:</td><td>&nbsp;" + gsv(ship.tritanium) + "</td><td>&nbsp;&nbsp;&nbsp;Mol:</td><td>&nbsp;" + gsv(ship.molybdenum) + "</td></tr>";
                    html += "<tr><td>MC:</td><td>&nbsp;" + gsv(ship.megacredits) + "</td><td>&nbsp;&nbsp;&nbspCln:</td><td>&nbsp;" + gsv(ship.clans) + "</td><td>&nbsp;&nbsp;&nbspSup:</td><td>&nbsp;" + gsv(ship.supplies) + "</td>";

                    if (ship.torps > 0 || ship.bays > 0) {
                        var ammoText = "&nbsp&nbsp&nbsp;Ftr";
                        if (ship.torps > 0)
                            ammoText = "&nbsp&nbsp&nbsp;Tor";
                        html += "<td>" + ammoText + ":</td><td>&nbsp;" + gsv(ship.ammo) + "</td></tr>";
                    }
                    if (ship.ownerid == vgap.player.id || ship.allyupdate) {
                        html += "<tr>";
                        if (settings.showShipMission)
                            html += "<td colspan='2'>" + vgap.getShipMission(ship) + ( (ship.mission == 6 || ship.mission == 7) && ship.mission1target > 0 ? " " + ship.mission1target : "") + "</td>";
                        else
                            html += "<td/><td/>";
                        if (ship.damage > 0)
                            html += "<td>&nbsp;&nbsp;&nbsp;Dmg:</td><td class='BadText'>&nbsp;" + ship.damage + "</td>";
                        else if (ship.iscloaked)
                            html += "<td colspan='2' class='GoodText'>&nbsp;&nbsp;&nbsp;Cloaked</td>";
                        else
                            html += "<td/><td/>";
                        html += "<td colspan='2'>&nbsp;&nbsp;&nbsp;Warp " + ship.warp + "</td>"
                        html += "<td>&nbsp;&nbsp;&nbsp;FC:</td><td>&nbsp;" + ship.friendlycode + "</td></tr>";
                    }
                    if (settings.showPlayerForAllies && vgap.fullallied(ship.ownerid)) {
                            html += "<tr><td colspan='8'>" + race.name + " (" + player.username + ")" + "</td></tr>";
                    }
                }
                else {
                    html += "<tr><td colspan='4'>" + ship.id + ": " + ship.name + "</td></tr>";
                    if ( (settings.showHullForAllies && vgap.fullallied(ship.ownerid)) || (settings.showHullForMine && ship.ownerid == vgap.player.id) )
                        html += "<tr><td colspan='4'>" + hull.name + "</td></tr>";                     
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
                    if (ship.ownerid == vgap.player.id || ship.allyupdate) {
                        html += "<tr><td>Friendly Code:</td><td>&nbsp;" + ship.friendlycode + "</td></tr>";
                        /*
                        if (settings.showShipMission)
                            html += "<tr><td colspan='8'>" + vgap.getShipMission(ship) + ( (ship.mission == 6 || ship.mission == 7) && ship.mission1target > 0 ? " " + ship.mission1target : "") + "</td></tr>";                        
                        */
                    }
                    if (settings.showPlayerForAllies && vgap.fullallied(ship.ownerid)) {
                            html += "<tr><td colspan='4'>" + race.name + " (" + player.username + ")" + "</td></tr>";
                    }
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
        // vgap.action added for the assistant (Alex):
     //   vgap.action();


        return txt;
    };
    
vgaPlanets.prototype.shipTransferView = function (ship, onclick) {
        var hull = vgap.getHull(ship.hullid);
        var totalCargo = ship.ammo + ship.duranium + ship.tritanium + ship.molybdenum + ship.supplies + ship.clans;
        var html = "<div class='ItemSelection' onclick='" + onclick + "'>";
        html += "<img src='" + hullImg(ship.hullid) + "'/>";
        if (ship.ownerid == vgap.player.id || vgap.fullallied(ship.ownerid)) {
            html += "<div  " + (vgap.fullallied(ship.ownerid) ? "class='AllyText'" : "") + ">";
            if (ship.ownerid != vgap.player.id) html += vgap.raceName(ship.ownerid);
            html += "<span>" + ship.id + ": " + ship.name + "</span>";
            html += "<table class='CleanTable'>";
            html += "<tr><td>Neutronium:</td><td>" + gsv(ship.neutronium) + "/" + hull.fueltank + " </td><td>Total Cargo:</td><td>" + gsv(totalCargo) + "/" + hull.cargo + "</td></tr>";
            html += "<tr><td>Duranium:</td><td>" + gsv(ship.duranium) + "</td><td>Supplies:</td><td>" + gsv(ship.supplies) + "</td></tr>";
            html += "<tr><td>Tritanium:</td><td>" + gsv(ship.tritanium) + "</td><td>Megacredits:</td><td>" + gsv(ship.megacredits) + "</td></tr>";
            html += "<tr><td>Molybdenum:</td><td>" + gsv(ship.molybdenum) + "</td><td>Clans:</td><td>" + gsv(ship.clans) + "</td></tr>";
            if (ship.torps > 0 || ship.bays > 0) {
                var ammoText = "Fighters";
                if (ship.torps > 0)
                    ammoText = "Torpedos";
                html += "<tr><td>" + ammoText + ":</td><td>" + gsv(ship.ammo) + "</td></tr>";
            } else
                html += "<tr><td/><td/></tr>";
            html += "</table></div>";
        }
        else {
            html += "<span class='BadText'>" + ship.id + ": " + ship.name + "</span>";
            html += "<div class='BadText'>" + vgap.raceName(ship.ownerid);
            html += "<table class='CleanTable'>";
            html += "<tr><td>Neutronium:</td><td>?/" + hull.fueltank + " </td><td>Total Cargo:</td><td>?/" + hull.cargo + "</td></tr>";
            html += "</table></div>";
        }
        html += "</div>";

        // vgap.action added for the assistant (Alex):
        // vgap.action();

        return html;
    };


vgaPlanets.prototype.shipFullInfoView = function (ship, onclick) {
        var view = this.shipTransferView(ship, onclick);
        console.log(view);
        var html = ""; //"<table class='CleanTable'>";
                       //html += "<tr>";
                        html += "<td>Friendly Code:</td><td>" + ship.friendlycode + "</td></tr>";
                        html += "<tr><td colspan='2'>Warp " + ship.warp + "</td>"
                        html += "<td colspan='2'>" + vgap.getShipMission(ship) + ( (ship.mission == 6 || ship.mission == 7) && ship.mission1target > 0 ? " " + ship.mission1target : "") + "</td></tr>";
                        html += "<tr>";
                        if (ship.damage > 0)
                            html += "<td>Damage:</td><td class='BadText'>" + ship.damage + "</td>";
                        else if (ship.iscloaked)
                            html += "<td colspan='2' class='GoodText'>Cloaked</td>";
                        else html += "<td/><td/>";
                        html += "</tr></table>";
        //html += "</table>"

        // vgap.action added for the assistant (Alex):
        // vgap.action();

        view = view.split("</tr></table>").join(html);
        return view;
        
    };

    
vgaPlanets.prototype.showHover = function (shipId) {
        var ship = vgap.getShip(shipId);
        var newheight = 100;
        if (ship.ownerid == vgap.player.id || ship.allyupdate) {
            this.hc.html(this.shipFullInfoView(ship, ""));
            newheight = 120;
            if (ship.allyupdate) newheight += 10;
        }
        else if (vgap.fullallied(ship.ownerid)) {
            this.hc.html(this.shipTransferView(ship, ""));
            newheight = 110
        }
        else
            this.hc.html(this.shipScan(ship, ""));
        this.hc.show();
        this.hc.height(newheight);
        

        // vgap.action added for the assistant (Alex):
        //   vgap.action();

    };
//*/
    
vgaPlanets.prototype.getShipMission = function (ship) {
        var missions = new Array();
        var mdesc = new Array();
        var raceid = vgap.getPlayer(ship.ownerid).raceid;
        missions.push("Exploration");
        mdesc.push("Return information about planets you visit.");
        missions.push("Mine Sweep");
        mdesc.push("Sweep or detect enemy minefields.");
        if (ship.torps > 0) {
            missions.push("Lay Mines");
            mdesc.push("Convert your torpedos to deep space mines.");
        }
        else {
            missions.push("");
            mdesc.push("");
        }
        missions.push("Kill!!");
        mdesc.push("Attack any enemy ship or planet you encounter.");
        if (ship.hullid == 84 || ship.hullid == 96 || ship.hullid == 9) {
            missions.push("Bio Scan");
            mdesc.push("Search for native life on nearby planets.");
        }
        else {
            missions.push("Sensor Sweep");
            mdesc.push("Search for enemy colonies on nearby planets.");
        }
        missions.push("Land and Disassemble");
        mdesc.push("Dismantle this ship on an owned or unowned planet.");
        //if (ships.length > 1 && this.hull.engines > 1) {
            missions.push("Try to Tow");
            mdesc.push("Try to tow another ship at this location.");
        /*
        }
        else {
            missions.push("");
            mdesc.push("");
        }
        */
        missions.push("Try to Intercept");
        mdesc.push("Try to intercept the ship you have selected.");
        if (raceid == 1) {
            missions.push("Super Refit");
            mdesc.push("Upgrade this ship to the best available parts. Must be at a starbase to work.");
        }
        else if (raceid == 2) {
            if (ship.beams > 0) {
                missions.push("Hisssss!");
                mdesc.push("Increase the happiness on the planet you orbit.");
            }
            else {
                missions.push("");
                mdesc.push("");
            }
        }
        else if (raceid == 3) {
            missions.push("Super Spy");
            mdesc.push("Spy on an enemy planet for info or to change its friendly code.");
        }
        else if (raceid == 4) {
            if (ship.beams > 0) {
                missions.push("Pillage Planet");
                mdesc.push("Pillage a planet for supplies and money.");
            }
            else {
                missions.push("");
                mdesc.push("");
            }
        }
        else if (raceid == 5) {
            missions.push("Rob Ship");
            mdesc.push("Rob an enemy ship of its fuel or cargo.");
        }
        else if (raceid == 6) {
            missions.push("Self Repair");
            mdesc.push("Repair this ship by 10% / turn.");
        }
        else if (raceid == 7) {
            if (ship.torps > 0) {
                missions.push("Lay Web Mines");
                mdesc.push("Convert your torpedos to special fuel sucking mines.");
            }
            else {
                missions.push("");
                mdesc.push("");
            }
        }
        else if (raceid == 8) {
            missions.push("Dark Sense");
            mdesc.push("Sense enemy colonies and starbases on nearby planets.");
        }
        else if (raceid == 9 || raceid == 11) {
            if (ship.bays > 0) {
                missions.push("Build Fighters");
                mdesc.push("Build fighters on your ship for 3 tritanium, 2 molybdenum and 5 supplies each.");
            }
            else {
                missions.push("");
                mdesc.push("");
            }
        }
        else if (raceid == 10) {
            missions.push("Rebel Ground Attack");
            mdesc.push("Sabotage the planet to destroy buildings and kill colonists.");
        }

        if (vgap.getHull(ship.hullid).cancloak) {
            missions.push("Cloak");
            mdesc.push("Make this ship invisible to enemies.");
        }
        else {
            missions.push("");
            mdesc.push("");
        }
        /*
        if (this.planet != null) {
            missions.push("Beam up Neutronium Fuel from " + this.planet.name);
            mdesc.push("");
            missions.push("Beam up Duranium from " + this.planet.name);
            mdesc.push("");
            missions.push("Beam up Tritanium from " + this.planet.name);
            mdesc.push("");
            missions.push("Beam up Molybdenum from " + this.planet.name);
            mdesc.push("");
            missions.push("Beam up Supplies from " + this.planet.name);
            mdesc.push("");
        } else {
        */
            missions.push("Beam up Fuel");
            mdesc.push("");
            missions.push("Beam up Duranium");
            mdesc.push("");
            missions.push("Beam up Tritanium");
            mdesc.push("");
            missions.push("Beam up Molybdenum");
            mdesc.push("");
            missions.push("Beam up Supplies");
            mdesc.push("");
        //}
        return missions[ship.mission];
    };
    
var old_showSettings = vgapDashboard.prototype.showSettings; 
vgapDashboard.prototype.showSettings = function () {

        old_showSettings.apply(this, arguments);
        
        var settings = vgaPlanets.prototype.addOns.vgapImprovedHover.settings;
        
        var html = "";
        html += "<div id='vgapImprovedHoverSettings'><table>";
        html += "<tr><th colspan='4'>Add-On Settings: Planets.nu improved hover text</th></tr>";
        html += "<tr>";
        html += "<td>Use short format</td><td><input type='checkbox'" + (settings.terseInfo ? "checked='true'" : "") + "onChange='vgaPlanets.prototype.addOns.vgapImprovedHover.settings.terseInfo = !vgaPlanets.prototype.addOns.vgapImprovedHover.settings.terseInfo; vgap.addOns.vgapImprovedHover.saveSettings();'/></td>";
        html += "<td>Show player for allied ships</td><td><input type='checkbox'" + (settings.showPlayerForAllies ? "checked='true'" : "") + "onChange='vgaPlanets.prototype.addOns.vgapImprovedHover.settings.showPlayerForAllies = !vgaPlanets.prototype.addOns.vgapImprovedHover.settings.showPlayerForAllies; vgap.addOns.vgapImprovedHover.saveSettings();'/></td>";
        html += "</tr><tr>";
        html += "<td>Show hull type for allied ships</td><td><input type='checkbox'" + (settings.showHullForAllies ? "checked='true'" : "") + "onChange='vgaPlanets.prototype.addOns.vgapImprovedHover.settings.showHullForAllies = !vgaPlanets.prototype.addOns.vgapImprovedHover.settings.showHullForAllies; vgap.addOns.vgapImprovedHover.saveSettings();'/></td>";
        html += "<td>Show hull type for my ships</td><td><input type='checkbox'" + (settings.showHullForMine ? "checked='true'" : "") + "onChange='vgaPlanets.prototype.addOns.vgapImprovedHover.settings.showHullForMine = !vgaPlanets.prototype.addOns.vgapImprovedHover.settings.showHullForMine; vgap.addOns.vgapImprovedHover.saveSettings();'/></td>";
        html += "</tr><tr>";
        html += "<td>Show mission for ships</td><td><input type='checkbox'" + (settings.showShipMission ? "checked='true'" : "") + "onChange='vgaPlanets.prototype.addOns.vgapImprovedHover.settings.showShipMission = !vgaPlanets.prototype.addOns.vgapImprovedHover.settings.showShipMission; vgap.addOns.vgapImprovedHover.saveSettings();'/></td>";
        html += "</tr>";
        html += "</table></div>";        
        
        $("#SoundSettings").after(html);
        this.pane.jScrollPane();
        
    };
/* //REPLACED MAP TOOL WITH PERSISTENT SETTING   
var old_loadControls = vgapMap.prototype.loadControls; 
vgapMap.prototype.loadControls = function () {

        old_loadControls.apply(this, arguments);
        
        var additem = "<li onclick='vgap.addOns.vgapImprovedHover.settings.terseInfo = !vgap.addOns.vgapImprovedHover.settings.terseInfo;'>Switch Info View</li>";
        
        //$("#MapTools").append(additem);
        $("#MapTools > li:contains('Connections (q)')").after(additem);

        var height = this.controls.height() - this.toolsMenu.height();
        this.controls.css("marginTop", "-" + this.controls.height() + "px");

    };    
*/
    
}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);