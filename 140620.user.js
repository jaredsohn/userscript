// ==UserScript==
// @name          Planets.nu ally information sharing
// @description   Adds ability to update allies with current turn data
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://play.planets.nu/*
// @include       http://*.planets.nu/*
// @version 0.12
// ==/UserScript==

/*------------------------------------------------------------------------------
1. Adds "Update Allies" to diplomacy menu. When clicked, script packages all
current ship/planet/base data into a diplomatic message and sends it to any
FULL alliance members.

2. When turn is loaded, checks to see if such a message has been received from
any allies for the current turn. If so, uses that information instead of the
info from the turn file. The resulr is essentially that you get to see all
the orders your allies are submitting this turn (including actual ship
waypoints, ship builds, cloak states, current FCs, etc).

3. Also, alters interface so that if updated info is available, ally
ships/planets/bases display using the same left side screen as your own.
This allows you to see more detailed info such as mission, primary enemy,
ship building, etc. Screen should be locked (to editing) if object does not
belong to you, but server wouldn't save changes anyway, so it's not critical
that things not be edited.
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
        vgaPlanets.prototype.addOns[addOnName].current = {};
    };
vgaPlanets.prototype.setupAddOn("vgapShareWithAllies");

// Set to -USERSCRIPT_ID to try and prevent note type collisions
vgaPlanets.prototype.addOns.vgapShareWithAllies.notetype = -140620;

// END Add-On Header

// Note Storage/Retrieval functions
vgaPlanets.prototype.saveObjectAsNote = function (id, type, obj) {
        var note = this.getNote(id, type);
        if (note == null)
            note = this.addNote(id, type);
        note.changed = 1;
        note.body = JSON.stringify(obj);
    };
    
vgaPlanets.prototype.getObjectFromNote = function (id, type) {
        var note = this.getNote(id, type);
        if (note != null)
            return JSON.parse(note.body);
        else
            return null;
    };

// End Note Storage/Retrieval functions


vgaPlanets.prototype.POSTrequest = function (target, data, callback, timeout) {
        if (!timeout)
            timeout = 30000;
        $.ajax({
            type: 'POST',
            url: "/_ui/plugins" + "?method=" + target + "&type=get&assembly=" + "PlanetsNu.dll" + "&object=" + "PlanetsNu.GameFunctions",
            dataType: 'json',
            jsonp: false, // to prevent ?? interepretation errors.
            cache: false,
            data: data.serialize(),
            success: callback,
            timeout: timeout,
            error: function (jqXHR, textStatus, errorThrown) { vgap.ajaxError(jqXHR, textStatus, errorThrown); }
        });
    }
    
vgaPlanets.prototype.POSTsendMessage = function (to, body) {
        if (this.sendingMessage)
            return;

        this.sendingMessage = true;
        this.indicator.text("Sending...");
        this.indicateOn();

    
        var data = new dataObject();
        data.add("gameId", this.gameId, false);
        data.add("playerId", this.player.id, false);
        data.add("to", to, false);
        data.add("body", body, false);
        //console.log(data.serialize());
        
        this.POSTrequest("SendMessage", data, function (result) { vgap.processSendMessage(result); });
    }
    
vgaPlanets.prototype.cleanMessage = function (m) {
        var n = "";
        var a = -1;
        var b = m.indexOf(" ");
        while (b > -1) {
            if (b - a == 81) {
                n += m.substr(a + 1, 80);
            }
            else {
                n += m.substring(a + 1, b + 1);
            }
            a = b;
            var b = m.indexOf(" ", b+1);
        }
        n += m.substring(a + 1);
        return n;
    };

//compress a JSON.stringify(ed) object
// s CANNOT contain chars "=" or "&"
vgaPlanets.prototype.compressbeef = function (s) {
        var dict = [];
        var keys = jQuery.extend( {}, vgap.myships[0], vgap.myplanets[0], vgap.mystarbases[0] );
        var pre = s.length;
        if (keys != null) {
            for (var key in keys) {
                dict.push('"' + key + '":');
            }
        }
        dict.push('"http://library.vgaplanets.nu/');
        console.log(dict);
        console.log(dict.length);
        
        for (var i = 0; i < dict.length; i++) {
            //console.log(dict[i]);
            var index = i.toString(36);
            if (index.length == 1)
                index = "0" + index;
            s = s.replace(new RegExp(dict[i], "g"), "=" + index);
           
        }
        s = s.replace(/0,=/g, "&");
        console.log(s);
        post = s.length;
        
        return s;
        
        for (var i = 0; i < dict.length; i++) {
            //console.log(dict[i]);
            s = s.replace(new RegExp("=" + i.toString(36) + "=", "g"), dict[i]);
           
        }
        console.log(s);
        console.log(JSON.parse(s));
        console.log("PRE " + pre + " POST " + post);
        
    };

// takes an "info" onject and spits out a compressed JSON.stringified version
vgaPlanets.prototype.compressinfo = function (info) {
        var out = {};
        
        var ship_d = info.ships[0];
        if (ship_d != null ) {
            var keys = [];
            for (var key in ship_d) {
                keys.push(key);
            }
            console.log(keys);
            out.ship = keys;
            out.ships = [];
            for (var i = 0; i < info.ships.length; i++) {
                var ship = info.ships[i];
                var vals = [];
                for (var j = 0; j < keys.length; j++) {
                    vals[j] = ship[keys[j]];
                }
                //console.log(vals);
                out.ships.push(vals);
            }
        }

        var planet_d = info.planets[0];
        if (planet_d != null ) {
            var keys = [];
            for (var key in planet_d) {
                keys.push(key);
            }
            console.log(keys);
            out.planet = keys;
            out.planets = [];
            for (var i = 0; i < info.planets.length; i++) {
                var planet = info.planets[i];
                var vals = [];
                for (var j = 0; j < keys.length; j++) {
                    vals[j] = planet[keys[j]];
                }
                //console.log(vals);
                out.planets.push(vals);
            }
        }
        
        var starbase_d = info.starbases[0];
        if (starbase_d != null ) {
            var keys = [];
            for (var key in starbase_d) {
                keys.push(key);
            }
            console.log(keys);
            out.starbase = keys;
            out.starbases = [];
            for (var i = 0; i < info.starbases.length; i++) {
                var starbase = info.starbases[i];
                var vals = [];
                for (var j = 0; j < keys.length; j++) {
                    vals[j] = starbase[keys[j]];
                }
                //console.log(vals);
                out.starbases.push(vals);
            }
        }
        
        var postcompress = JSON.stringify(out);
        
        for (var i = 35; i > 0; i--) {
            var t = "";
            for (var j = i; j > 0; j--) {
                t += ",0";
            }
            postcompress = postcompress.replace(new RegExp(t, "g"), "=" + i.toString(36));
        }
        
        return postcompress;   

    };
    
// undoes compressinfo
vgaPlanets.prototype.decompressinfo = function (info) {
        var out = {};
        
        for (var i = 35; i > 0; i--) {
            var t = "";
            for (var j = i; j > 0; j--) {
                t += ",0";
            }
            info = info.replace(new RegExp("=" + i.toString(36), "g"), t);
        }
        
        info = JSON.parse(info);
        
        if (info.ship != null ) {
            var keys = info.ship;
            console.log(keys);
            out.ships = [];
            for (var i = 0; i < info.ships.length; i++) {
                var shipin = info.ships[i];
                var shipout = {};
                for (var j = 0; j < keys.length; j++) {
                    shipout[keys[j]] = shipin[j];
                }
                //console.log(vals);
                out.ships.push(shipout);
            }
        }

        if (info.planet != null ) {
            var keys = info.planet;
            console.log(keys);
            out.planets = [];
            for (var i = 0; i < info.planets.length; i++) {
                var planetin = info.planets[i];
                var planetout = {};
                for (var j = 0; j < keys.length; j++) {
                    planetout[keys[j]] = planetin[j];
                }
                //console.log(vals);
                out.planets.push(planetout);
            }
        }
        
        if (info.starbase != null ) {
            var keys = info.starbase;
            console.log(keys);
            out.starbases = [];
            for (var i = 0; i < info.starbases.length; i++) {
                var starbasein = info.starbases[i];
                var starbaseout = {};
                for (var j = 0; j < keys.length; j++) {
                    starbaseout[keys[j]] = starbasein[j];
                }
                //console.log(vals);
                out.starbases.push(starbaseout);
            }
        }

        
        return out;   

    };
    
    
vgaPlanets.prototype.addOns.vgapShareWithAllies.sendAllyUpdate = function() {
        info = {};
        info.turn       = vgap.game.turn;
        info.ships      = [];
        info.planets    = [];
        info.starbases  = vgap.mystarbases;
        //info.stock      = vgap.stock;
        
        for (var i=0; i<vgap.myships.length; i++) {
            ship = jQuery.extend({}, vgap.myships[i]);
            delete ship.target;
            delete ship.history;
            delete ship.x;
            delete ship.y;
            delete ship.infoturn;
            delete ship.changed;
            delete ship.ownerid;
            delete ship.hullid;
            delete ship.beams;
            delete ship.bays;
            delete ship.torps;
            delete ship.beamid;
            delete ship.engineid;
            delete ship.torpedoid;
            delete ship.isPlanet;
            delete ship.heading;
            delete ship.turnkilled;
            
            
            info.ships[i] = ship;
        }
        
        for (var i=0; i<vgap.myplanets.length; i++) {
            planet = jQuery.extend({}, vgap.myplanets[i]);
            delete planet.name;
            delete planet.img;
            delete planet.changed;
            delete planet.nativeracename;
            delete planet.nativegovernmentname;
            delete planet.x;
            delete planet.y;
            delete planet.checkduranium;
            delete planet.checktritanium;
            delete planet.checkmolybdenum;
            delete planet.checkneutronium;
            delete planet.checksupplies;
            delete planet.checkmegacredits;
            delete planet.ownerid;
            delete planet.temp;
            delete planet.totalneutronium;
            delete planet.totaltritanium;
            delete planet.totalduranium;
            delete planet.totalmolybdenum;
            delete planet.infoturn;
            delete planet.isPlanet;
            
            delete planet.nativetype;
            delete planet.nativegovernment;
            
            info.planets[i] = planet;
        }        
        
        //console.log(info);
        var precompress = JSON.stringify(info);
        var postcompress = vgap.compressinfo(info);
        console.log ( postcompress );
        console.log ( vgap.decompressinfo( postcompress ));
        //console.log ( lzw_decode(postcompress) );
        console.log ("PRE " + precompress.length + " POST " + postcompress.length);
        
        var body = "<span>Updated turn info: Turn " + info.turn + " <span id='MESSID_vgapShareWithAllies' hidden>" + postcompress + "</span></span>";
    
        var toIds = "";
        for (var i = 0; i < vgap.players.length; i++) {
            var id = vgap.players[i].id;
            if (vgap.fullallied(id) && id != vgap.player.id)
                toIds += id + ",";
        }
        
        vgap.POSTsendMessage(toIds, body);
    };
    
old_dipMenu = vgapDashboard.prototype.dipMenu;
vgapDashboard.prototype.dipMenu = function() {
    
        old_dipMenu.apply(this, arguments);
        $("#SecondMenu").append("<li onclick='vgap.addOns.vgapShareWithAllies.sendAllyUpdate();'>Update Allies</li>");
    };
    
var old_processLoad = vgaPlanets.prototype.processLoad;
vgaPlanets.prototype.processLoad = function(result) {
        old_processLoad.apply(this, arguments);
        if (!result.success) return;
    
        for (var i = 0; i < vgap.players.length; i++) {
            var id = vgap.players[i].id;
            if (vgap.fullallied(id) && id != vgap.player.id) {
            console.log("Ally:" + id);
                var found = false;
                for (var m = 0; m < vgap.mymessages.length && vgap.mymessages[m].turn == vgap.game.turn && !found; m++) {
                    console.log(vgap.cleanMessage(vgap.mymessages[m].body));
                    if (vgap.mymessages[m].target == id && vgap.mymessages[m].body.indexOf("MESSID_vgapShareWithAllies") >= 0) {
                        console.log(m);
                        messSpan = $(vgap.cleanMessage(vgap.mymessages[m].body)).find("#MESSID_vgapShareWithAllies");
                        console.log( messSpan );
                        if (messSpan.length > 0) {
                        
                            var decompressed = vgap.decompressinfo(messSpan.text());
                            console.log( decompressed );
                            var info = decompressed;
                            console.log( info );
                            found = true;
                            
                            //Assumes sorted lists
                            var info_i = 0;
                            for (vgap_i = 0; vgap_i < vgap.ships.length && info_i < info.ships.length; vgap_i++) {
                                if (vgap.ships[vgap_i].id == info.ships[info_i].id) {
                                    jQuery.extend(vgap.ships[vgap_i], info.ships[info_i]);
                                    vgap.ships[vgap_i].allyupdate = true;
                                    var dest = vgap.getDest(vgap.ships[vgap_i]);
                                    vgap.ships[vgap_i].target = vgap.getTarget(dest.x, dest.y);
                                    info_i++;
                                }
                            }
                            
                            var info_i = 0;
                            for (vgap_i = 0; vgap_i < vgap.planets.length && info_i < info.planets.length; vgap_i++) {
                                if (vgap.planets[vgap_i].id == info.planets[info_i].id) {
                                    jQuery.extend(vgap.planets[vgap_i], info.planets[info_i]);
                                    vgap.planets[vgap_i].allyupdate = true;
                                    info_i++;
                                }
                            }
                            
                            var info_i = 0;
                            for (vgap_i = 0; vgap_i < vgap.starbases.length && info_i < info.starbases.length; vgap_i++) {
                                if (vgap.starbases[vgap_i].id == info.starbases[info_i].id) {
                                    jQuery.extend(vgap.starbases[vgap_i], info.starbases[info_i]);
                                    vgap.starbases[vgap_i].allyupdate = true;
                                    info_i++;
                                }
                            }
                            
                            //vgap.stock.concat(info.stock);
                            
                        }
                    }
                }
            }
        }
        vgap.createLookups();
        vgap.map.createAssociativeHitMap();
        vgap.map.drawWaypoints();
    };
    
vgapMap.prototype.drawWaypoints = function () {
        var sets = vgap.accountsettings;
        this.waypoints.remove();
        this.waypoints = this.paper.set();
        for (var i = 0; i < vgap.ships.length; i++) {
            //waypoint
            var ship = vgap.ships[i];
            if (ship.ownerid != vgap.player.id && !ship.allyupdate) {
                if (ship.heading != -1 && ship.warp != 0) {

                    var relation = vgap.getRelation(ship.ownerid);
                    var color = sets.enemyshipto;
                    if (vgap.allied(ship.ownerid))
                        color = sets.allyshipto;
                    if (relation.color && relation.color != "")
                        color = "#" + relation.color;

                    var speed = vgap.getSpeed(ship.warp, ship.hullid);

                    var x2 = ship.x + Math.round(Math.sin(Math.toRad(ship.heading)) * speed);
                    var y2 = ship.y + Math.round(Math.cos(Math.toRad(ship.heading)) * speed);
                    ship.targetx = x2;
                    ship.targety = y2;
                    this.waypoints.push(this.paper.path("M" + this.screenX(ship.x) + " " + this.screenY(ship.y) + "L" + this.screenX(x2) + " " + this.screenY(y2)).attr({ stroke: color, "stroke-width": "2", "stroke-opacity": 0.5 }));
                }
            }
            else {

                if (vgap.isChunnelling(ship)) {
                    var targetId = parseInt(ship.friendlycode, 10);
                    var target = vgap.getShip(targetId);
                    this.waypoints.push(this.paper.path("M" + this.screenX(ship.x) + " " + this.screenY(ship.y) + "L" + this.screenX(target.x) + " " + this.screenY(target.y)).attr({ stroke: "cyan", "stroke-width": "2", "stroke-dasharray": "-", "stroke-opacity": 0.5 }));
                }
                else {
                    if (ship.ownerid == vgap.player.id) {
                        var params = { stroke: sets.myshipto, "stroke-width": "2", "stroke-opacity": 0.5 };
                    }
                    else {
                        var relation = vgap.getRelation(ship.ownerid);
                        var color = sets.enemyshipto;
                        if (vgap.allied(ship.ownerid))
                            color = sets.allyshipto;
                        if (relation.color && relation.color != "")
                            color = "#" + relation.color;                
                        var params = { stroke: color, "stroke-width": "2", "stroke-opacity": 0.5 };
                    }
                    if (vgap.isHyping(ship))
                        params = { stroke: "beige", "stroke-dasharray": ".", "stroke-width": "2", "stroke-opacity": 0.5 };

                    var path = vgap.getPath(ship);
                    for (var j = 0; j < path.length; j++) {
                        this.waypoints.push(this.paper.path("M" + this.screenX(path[j].x1) + " " + this.screenY(path[j].y1) + "L" + this.screenX(path[j].x2) + " " + this.screenY(path[j].y2)).attr(params));
                    }
                }
            }
        }
    };

old_ShipScreen_load = vgapShipScreen.prototype.load;
vgapShipScreen.prototype.load = function(ship) {
        old_ShipScreen_load.apply(this, arguments);
        if (ship.ownerid != vgap.player.id) {
            $("#ShipScreen *").not(".TitleBar *").not("#FleetContainer *").removeAttr("onclick");
            this.islocked = true;
        } else {
            this.islocked = false;
        }
        
        $("#FleetContainer").empty();
        var cls = "FleetPic";
        var numItems = 0;
        if (this.planet != null) {
            var onclick = "vgap.map.selectPlanet(" + this.planet.id + ");";
            if (this.planet.ownerid != vgap.player.id && !this.planet.allyupdate)
                onclick = "vgap.map.planetSurvey(" + this.planet.id + ");";

            if (this.planet.ownerid == 0)
                cls += " FleetNeutral";
            else if (this.planet.ownerid != vgap.player.id)
                cls += " FleetBad";
            numItems++;
            $("<img class='" + cls + "' src='" + this.planet.img + "' onclick='" + onclick + "' />").appendTo("#FleetContainer");
        }
        if (this.starbase != null) {
            numItems++;
            var onclick = "vgap.map.selectStarbase(" + this.planet.id + ");";
            if (this.planet.ownerid != vgap.player.id && !this.starbase.allyupdate)
                onclick = "";

            $("<img class='" + cls + "' src='" + vgap.getStarbaseIcon(this.starbase.starbasetype) + "' onclick='" + onclick + "' />").appendTo("#FleetContainer");
        }
        
        var ships = this.ships;
        if (ships.length > 1) {
            for (var i = 0; i < ships.length; i++) {
                cls = "FleetPic";
                var onclick = "vgap.map.selectShip(" + ships[i].id + ");";
                if (ships[i].ownerid != vgap.player.id && !ships[i].allyupdate) {
                    cls += " FleetBad";
                    onclick = "vgap.map.shipSurvey(" + ships[i].id + ");";
                }
                if (ships[i].id == ship.id)
                    cls += " FleetCurrent";

                $("<img class='" + cls + "' src='" + hullImg(ships[i].hullid) + "' onclick='" + onclick + "'  onmouseover='vgap.showHover(" + ships[i].id + ");' onmouseout='vgap.hideHover();' />").appendTo("#FleetContainer");
            }
            numItems += ships.length;
        }
        else
            numItems += ships.length - 1;
        vgap.picSize(this.mainPic, numItems);
        
        //this.loadOrders();
        
    };

//old_getMissionArray = vgapShipScreen.prototype.getMissionArray;
vgapShipScreen.prototype.getMissionArray = function (ship) {

        var missions = new Array();

        //explore
        missions.push({ id: 0, name: "Exploration", desc: "Return information about planets you visit." });

        //minesweep
        missions.push({ id: 1, name: "Mine Sweep", desc: "Sweep or detect enemy minefields." });

        //laymines
        if (ship.torps > 0)
            missions.push({ id: 2, name: "Lay Mines", desc: "Convert your torpedos to deep space mines." });

        //kill
        missions.push({ id: 3, name: "Kill!!", desc: "Attack any enemy ship or planet you encounter." });

        //sensor sweep/bioscan
        if (ship.hullid == 84 || ship.hullid == 96 || ship.hullid == 9)
            missions.push({ id: 4, name: "Bio Scan", desc: "Search for native life on nearby planets." });
        else
            missions.push({ id: 4, name: "Sensor Sweep", desc: "Search for enemy colonies on nearby planets." });

        //colonize
        missions.push({ id: 5, name: "Land and Disassemble", desc: "Dismantle this ship on an owned or unowned planet." });

        //tow
        if (this.ships.length > 1 && this.hull.engines > 1)
            missions.push({ id: 6, name: "Try to Tow", desc: "Try to tow another ship at this location." });

        //intercept
        missions.push({ id: 7, name: "Try to Intercept", desc: "Try to intercept the ship you have selected." });

        var raceid = vgap.getPlayer(ship.ownerid).raceid;
        //special race missions
        if      (raceid == 1)
            missions.push({ id: 8, name: "Super Refit", desc: "Upgrade this ship to the best available parts. Must be at a starbase to work." });
        else if (raceid == 2 && ship.beams > 0)
            missions.push({ id: 8, name: "Hisssss!", desc: "Increase the happiness on the planet you orbit." });
        else if (raceid == 3)
            missions.push({ id: 8, name: "Super Spy", desc: "Cloak and spy on an enemy planet for info or to change its friendly code." });
        else if (raceid == 4 && ship.beams > 0)
            missions.push({ id: 8, name: "Pillage Planet", desc: "Pillage a planet for supplies and money." });
        else if (raceid == 5)
            missions.push({ id: 8, name: "Rob Ship", desc: "Rob an enemy ship of its fuel or cargo." });
        else if (raceid == 6)
            missions.push({ id: 8, name: "Self Repair", desc: "Repair this ship by 10% / turn." });
        else if (raceid == 7 && ship.torps > 0)
            missions.push({ id: 8, name: "Lay Web Mines", desc: "Convert your torpedos to special fuel sucking mines." });
        else if (raceid == 8)
            missions.push({ id: 8, name: "Dark Sense", desc: "Sense enemy colonies and starbases on nearby planets." });
        else if ((raceid == 9 || raceid == 11) && ship.bays > 0)
            missions.push({ id: 8, name: "Build Fighters", desc: "Build fighters on your ship for 3 tritanium, 2 molybdenum and 5 supplies each." });
        else if (raceid == 10)
            missions.push({ id: 8, name: "Rebel Ground Attack", desc: "Sabotage the planet to destroy buildings and kill colonists." });

        //cloak
        if (this.hull.cancloak)
            missions.push({ id: 9, name: "Cloak", desc: "Make this ship invisible to enemies." });

        //repair ships
        if (ship.hullid == 1090)
            missions.push({ id: 15, name: "Repair Ship", desc: "Repair a ship at this location." });

        //repair ships
        if (ship.hullid == 70 && vgap.advActive(44))
            missions.push({ id: 16, name: "Destroy Planet", desc: "Destroy a planet. Requires full fuel tank and 4-10ly from planet." });

        //gather missions
        var planetFrom = "";
        if (this.planet != null)
            planetFrom = " from " + this.planet.name;

        missions.push({ id: 10, name: "Beam up Fuel" + planetFrom, desc: "" });
        missions.push({ id: 11, name: "Beam up Duranium" + planetFrom, desc: "" });
        missions.push({ id: 12, name: "Beam up Tritanium" + planetFrom, desc: "" });
        missions.push({ id: 13, name: "Beam up Molybdenum" + planetFrom, desc: "" });
        missions.push({ id: 14, name: "Beam up Supplies" + planetFrom, desc: "" });

        return missions;
    };
    
old_PlanetScreen_load = vgapPlanetScreen.prototype.load;
vgapPlanetScreen.prototype.load = function(planet) {
        old_PlanetScreen_load.apply(this, arguments);
        if (planet.ownerid != vgap.player.id) {
            $("#PlanetScreen *").not(".TitleBar *").not("#FleetContainer *").removeAttr("onclick");
            this.islocked = true;
        } else {
            this.islocked = false;
        }
        
        $("#FleetContainer").empty();
        var cls = "FleetPic";
        if (this.starbase != null) {
            $("<img class='FleetPic' src='" + vgap.getStarbaseIcon(this.starbase.starbasetype) + "' onclick='vgap.map.selectStarbase(" + this.planet.id + ");' />").appendTo("#FleetContainer");
        }

        ships = this.ships;
        for (var i = 0; i < ships.length; i++) {
            cls = "FleetPic";
            var onclick = "vgap.map.selectShip(" + ships[i].id + ");";
            if (ships[i].ownerid != vgap.player.id && !ships[i].allyupdate) {
                cls += " FleetBad";
                onclick = "vgap.map.shipSurvey(" + ships[i].id + ");";
            }
            $("<img class='" + cls + "' src='" + hullImg(this.ships[i].hullid) + "' onclick='" + onclick + "' onmouseover='vgap.showHover(" + ships[i].id + ");' onmouseout='vgap.hideHover();' />").appendTo("#FleetContainer");
        }
        
        var numItems = ships.length;
        if (this.starbase != null)
            numItems++;

        vgap.picSize(this.mainPic, numItems);
        
        
    };
    
old_StarbaseScreen_load = vgapStarbaseScreen.prototype.load;
vgapStarbaseScreen.prototype.load = function(starbase) {
        old_StarbaseScreen_load.apply(this, arguments);
        if (this.planet.ownerid != vgap.player.id) {
            $("#StarbaseScreen *").not(".TitleBar *").not("#FleetContainer *").removeAttr("onclick");
            this.islocked = true;
        } else {
            this.islocked = false;
        }
        
        $("#FleetContainer").empty();
        $("<img class='FleetPic' src='" + this.planet.img + "' onclick='vgap.map.selectPlanet(" + this.planet.id + ");' />").appendTo("#FleetContainer");
        for (var i = 0; i < this.ships.length; i++) {
            cls = "FleetPic";
            var onclick = "vgap.map.selectShip(" + this.ships[i].id + ");";
            if (this.ships[i].ownerid != vgap.player.id && !this.ships[i].allyupdate) {
                cls += " FleetBad";
                onclick = "vgap.map.shipSurvey(" + this.ships[i].id + ");";
            }
            $("<img class='" + cls + "' src='" + hullImg(this.ships[i].hullid) + "' onclick='" + onclick + "'  onmouseover='vgap.showHover(" + this.ships[i].id + ");' onmouseout='vgap.hideHover();' />").appendTo("#FleetContainer");
        }
        
        vgap.picSize(this.mainPic, this.ships.length + 1);
        
    };
    
old_renderBuildShipScreen = vgapStarbaseScreen.prototype.renderBuildShipScreen;
vgapStarbaseScreen.prototype.renderBuildShipScreen = function() {
        if (this.planet.ownerid != vgap.player.id) return;
        old_renderBuildShipScreen.apply(this, arguments);
    };
    
old_ShipScreen_setShipReadyCheckBox = vgapShipScreen.prototype.setShipReadyCheckBox;
vgapShipScreen.prototype.setShipReadyCheckBox = function() {
        if (this.ship.ownerid != vgap.player.id) return;
        old_ShipScreen_setShipReadyCheckBox.apply(this, arguments);
    };
    
old_PlanetScreen_setPlanetsReadyCheckBox = vgapPlanetScreen.prototype.setPlanetsReadyCheckBox;
vgapPlanetScreen.prototype.setPlanetsReadyCheckBox = function() {
        if (this.planet.ownerid != vgap.player.id) return;
        old_PlanetScreen_setPlanetsReadyCheckBox.apply(this, arguments);
    };
    
old_StarbaseScreen_setStarbaseReadyCheckBox = vgapStarbaseScreen.prototype.setStarbaseReadyCheckBox;
vgapStarbaseScreen.prototype.setStarbaseReadyCheckBox = function() {
        if (this.planet.ownerid != vgap.player.id) return;
        old_StarbaseScreen_setStarbaseReadyCheckBox.apply(this, arguments);
    };
    
old_shipSelectorClick = vgapMap.prototype.shipSelectorClick;
vgapMap.prototype.shipSelectorClick = function(shift) {
        if (vgap.shipScreen.islocked) return;
        old_shipSelectorClick.apply(this, arguments);
    };

old_hotkey = vgaPlanets.prototype.hotkey;
vgaPlanets.prototype.hotkey = function (ev) {


        if (!this.hotkeysOn)
            return;

        //f
        if (ev.keyCode == 70) {
            ev.preventDefault();
            if (vgap.planetScreenOpen && vgap.planetScreen.islocked)
                return;
            else if (vgap.shipScreenOpen && vgap.shipScreen.islocked)
                return;
            else if (vgap.starbaseScreenOpen && vgap.starbaseScreen.islocked)
                return;
        }

        //left arrow
        if (ev.keyCode == 37 && ((this.shipScreenOpen && vgap.shipScreen.islocked) || (this.planetScreenOpen && vgapPlanetScreen.islocked))) {
            return;
        }
        //up arrow
        if (ev.keyCode == 38 && ((this.shipScreenOpen && vgap.shipScreen.islocked) || (this.planetScreenOpen && vgapPlanetScreen.islocked))) {
            return;
        }
        //right arrow
        if (ev.keyCode == 39 && ((this.shipScreenOpen && vgap.shipScreen.islocked) || (this.planetScreenOpen && vgapPlanetScreen.islocked))) {
            return;
        }
        //down arrow
        if (ev.keyCode == 40 && ((this.shipScreenOpen && vgap.shipScreen.islocked) || (this.planetScreenOpen && vgapPlanetScreen.islocked))) {
            return;
        }
        //c and t
        if (ev.keyCode == 67 || ev.keyCode == 84) {
            if (this.shipScreenOpen && vgap.shipScreen.islocked)
                return;
            else if (this.planetScreenOpen && vgap.planetScreen.islocked)
                return;
            else if (this.starbaseScreenOpen && vgap.starbaseScreen.islocked)
                return;
        }
        //w 
        if (ev.keyCode == 87 && this.shipScreenOpen && vgap.shipScreen.islocked) {
            return;
        }
        //n 
        if (ev.keyCode == 78 && this.shipScreenOpen && vgap.shipScreen.islocked) {
            return;
        }
        //e
        if (ev.keyCode == 69 && this.shipScreenOpen && vgap.shipScreen.islocked) {
            return;
        }
        //m
        if (ev.keyCode == 77) {
            if (this.shipScreenOpen && vgap.shipScreen.islocked)
                return;
        }
        //b
        if (ev.keyCode == 66 && this.planetScreenOpen && vgap.planetScreen.islocked) {
            return;
        }
        //a
        if (ev.keyCode == 65) {
            if (this.planetScreenOpen && vgap.planetScreen.islocked)
                return;
        }

        //l
        if (ev.keyCode == 76 && this.starbaseScreenOpen && vgap.starbaseScreen.islocked) {
            return;
        }
        //d
        if (ev.keyCode == 68 && this.starbaseScreenOpen && vgap.starbaseScreen.islocked) {
            return;
        }
        //b
        if (ev.keyCode == 66 && this.starbaseScreenOpen && vgap.starbaseScreen.islocked) {
            return;
        }
        
    
    old_hotkey.apply(this, arguments);
    
    };
    
vgapMap.prototype.loadOver = function () {

        //if there are multiple things at this location, or only an enemy ship we need to show a scan selection list
        var ships = vgap.shipsAt(this.over.x, this.over.y);
        var showScan = false;
        if (ships.length == 1 && ships[0].ownerid != vgap.player.id && !ships[0].allyupdate  )
            showScan = true;

        //if (this.over.isPlanet && ships.length == 0 && this.over.infoturn == 0)
        //    return;

        if (ships.length > 1)
            showScan = true;

        if (this.over.isPlanet && this.over.ownerid != vgap.player.id)
            showScan = true;

        if (this.over.isPlanet && this.over.ownerid == vgap.player.id)
            showScan = false;
            
        console.log(showScan);

        if (showScan) {
            var inMore = vgap.planetScreenOpen || vgap.shipScreenOpen || vgap.starbaseScreenOpen;
            this.showScan(this.over.x, this.over.y, inMore);
            return;
        }

        if (this.over.isPlanet) {
            //planet
            if (this.over.ownerid == vgap.player.id)
                this.selectPlanet(this.over.id);
        }
        else {
            //ship
            if (this.over.ownerid == vgap.player.id || this.over.allyupdate)
                this.selectShip(this.over.id);
        }
    };
    
vgapMap.prototype.showScan = function (x, y, inMore) {
        var ships = vgap.shipsAt(x, y);

        var title = "";
        var html = "<div id='SelectLocation'>";

        if (this.over.isPlanet) {
            title += "1 Planet";
            if (this.over.debrisdisk > 0)
                title += "oid";

            if (this.over.ownerid == vgap.player.id || this.over.allyupdate)
                html += vgap.planetScan(this.over, "vgap.map.selectPlanet(" + this.over.id + ");");
            else
                html += vgap.planetScan(this.over, "vgap.map.planetSurvey(" + this.over.id + ");");

            var starbase = vgap.getStarbase(this.over.id);
            if (starbase != null) {
                if (this.over.ownerid == vgap.player.id || this.over.allyupdate)
                    html += vgap.starbaseScan(starbase, "vgap.map.selectStarbase(" + this.over.id + ");");
                else
                    html += vgap.starbaseScan(starbase, "");

                title += ", 1 Starbase";
            }
        }
        for (var i = 0; i < ships.length; i++) {
            if (ships[i].ownerid == vgap.player.id || ships[i].allyupdate)
                html += vgap.shipScan(ships[i], "vgap.map.selectShip(" + ships[i].id + ");");
            else
                html += vgap.shipScan(ships[i], "vgap.map.shipSurvey(" + ships[i].id + ");");
        }
        if (ships.length > 0) {
            if (title != "")
                title += ", ";
            title += ships.length + " ships";
        }

        html += "</div>";

        if (inMore) {
            html = "<h1>Scan: " + title + "</h1>" + html;
            html += "<a class='MoreBack' onclick='vgap.closeMore();return false;'>OK</a>";
            vgap.more.empty();
            $(html).appendTo(vgap.more);

            $("#SelectLocation").height($(window).height() - 100);
            vgap.showMore(300);
        }
        else {
            html = "<div class='TitleBar'><div class='CloseScreen' onclick='vgap.closeLeft();'></div><div class='TopTitle'>Scan:" + title + "</div></div>" + html;
            vgap.map.centerMap(this.over.x, this.over.y);
            vgap.lc.empty();
            $(html).appendTo(vgap.lc);
            vgap.openLeft();
            $("#SelectLocation").height($(window).height() - 40);
            $("#SelectLocation").width(380);
        }
        $("#SelectLocation").jScrollPane();


        // vgap.action added for the assistant (Alex):
        // vgap.action();
    };
    
vgaPlanets.prototype.isTowTarget = function (shipId) {
        for (var i = 0; i < vgap.ships.length; i++) {
            var ship = vgap.ships[i];
            if (ship.ownerid == vgap.player.id || ship.allyupdate) {
                if (ship.mission == 6 && ship.mission1target == shipId)
                    return ship;
            }
        }
        return null;
    };
    
vgapShipScreen.prototype.draw = function () {
        //draw any special functionality.
        vgap.map.special.remove();
        vgap.map.special = vgap.map.paper.set();

        if (this.ship.mission == 2 || (this.ship.mission == 8 && vgap.getPlayer(this.ship.ownerid).raceid == 7) || this.ship.mission == 1 || vgap.minepreview) {
            var minefields = new Array();

            //create array of proposed minefields
            for (var j = 0; j < vgap.minefields.length; j++) {
                var mf = vgap.minefields[j];
                minefields.push({ ownerid: mf.ownerid, x: mf.x, y: mf.y, radius: mf.radius, isweb: mf.isweb, units: mf.units, radiusPresweep: mf.radius });
            }

            //draw mine laying minefields preview
            for (var i = 0; i < vgap.ships.length; i++) {
                var ship = vgap.ships[i];
                if ( !(ship.ownerid == vgap.player.id || ship.allyupdate) ) continue;
                if (ship.neutronium > 0 && ship.ammo > 0 && ship.torps > 0) {
                    if (ship.mission == 2 || (ship.mission == 8 && vgap.getPlayer(ship.ownerid).raceid == 7)) {
                        var isWeb = (ship.mission == 8);

                        var fieldOwnerId = ship.ownerid;

                        //miX friendlycode
                        if (ship.friendlycode.toLowerCase().indexOf("mi") === 0) {
                            fieldOwnerId = vgap.getPlayerIdVal(ship.friendlycode.toLowerCase().replace("mi", ""));
                            if (fieldOwnerId == 0 || fieldOwnerId > vgap.game.slots)
                                fieldOwnerId = ship.ownerid;
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
                }
            }

            //draw mine sweep minefields preview
            for (var i = 0; i < vgap.ships.length; i++) {
                var ship = vgap.ships[i];
                if ( !(ship.ownerid == vgap.player.id || ship.allyupdate) ) continue;
                if (ship.neutronium > 0 && ship.mission == 1) {

                    var sweepUnits = ship.beams * ship.beamid * ship.beamid;
                    var fighterUnits = 0;
                    if (ship.ownerid == 11 && ship.bays > 0)
                        fighterUnits = ship.ammo * 20;

                    if (sweepUnits > 0 || fighterUnits > 0)
                        this.sweepMines(minefields, ship.x, ship.y, sweepUnits, fighterUnits);

                    if (ship.friendlycode.toLowerCase() == "msc" && ship.torps > 0)
                        this.mineScoop(minefields, ship);
                }
            }

            for (var i = 0; i < vgap.mystarbases.length; i++) {
                var starbase = vgap.mystarbases[i];
                if (starbase.mission == 11) {

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

                    var attr = { stroke: sets.mymines, "stroke-width": "2", "stroke-opacity": 0, fill: sets.mymines, "fill-opacity": 0.1 };
                    if (mf.isweb)
                        attr = { stroke: sets.webmines, "stroke-width": "2", "stroke-opacity": 0, fill: sets.webmines, "fill-opacity": 0.1 };
                    else if (vgap.allied(mf.ownerid))
                        attr = { stroke: sets.allymines, "stroke-width": "2", "stroke-opacity": 0, fill: sets.allymines, "fill-opacity": 0.1 };
                    else if (mf.ownerid != vgap.player.id)
                        attr = { stroke: sets.enemymines, "stroke-width": "2", "stroke-opacity": 0, fill: sets.enemymines, "fill-opacity": 0.1 };

                    if (radius > 0)
                        vgap.map.special.push(vgap.map.paper.circle(vgap.map.screenX(mf.x), vgap.map.screenY(mf.y), (radius * vgap.map.zoom) - 1).attr(attr));

                    if (mf.radiusPresweep > 0) {
                        attr = { stroke: "black", "stroke-width": "2", "stroke-opacity": 0, fill: "black", "fill-opacity": 0.1 };
                        vgap.map.special.push(vgap.map.paper.circle(vgap.map.screenX(mf.x), vgap.map.screenY(mf.y), (mf.radiusPresweep * vgap.map.zoom) - 1).attr(attr));
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
                var attr = { stroke: "lightblue", "stroke-width": "1", "stroke-dasharray": "- ", "stroke-opacity": opacity };
                vgap.map.special.push(vgap.map.paper.path("M" + vgap.map.screenX(x1) + " " + vgap.map.screenY(y1) + "L" + vgap.map.screenX(x2) + " " + vgap.map.screenY(y2)).attr(attr));
                x1 = x2;
                y1 = y2;
            }
        }

        vgap.map.paper.safari();
    };

vgapShipScreen.prototype.mineScoop = function (minefields, ship) {

        var hull = vgap.getHull(ship.hullid);
        var torp = vgap.getTorpedo(ship.torpedoid);
        var openCargo = hull.cargo - this.getTotalCargo(ship);

        for (var j = 0; j < minefields.length; j++) {
            var minefield = minefields[j];

            var dist = parseFloat(vgap.map.getDist(ship.x, ship.y, minefield.x, minefield.y));

            if (minefield.ownerid == ship.ownerid && (dist - minefield.radius) <= 0) {

                //Mine scoop
                var unitsScooped = openCargo * ship.torpedoid * ship.torpedoid;
                if (vgap.getPlayer(ship.ownerid).raceid == 9)
                    unitsScooped *= 4;

                if (unitsScooped > minefield.units)
                    unitsScooped = minefield.units;

                if (unitsScooped > 0) {
                    minefield.units -= unitsScooped;
                    minefield.radius = Math.sqrt(minefield.units);
                    minefield.swept = 1;
                    if (minefield.units < 0)
                        minefield.units = 0;

                    if (vgap.getPlayer(ship.ownerid).raceid == 9)
                        unitsScooped /= 4;

                    var ammo = Math.floor(unitsScooped / ship.torpedoid / ship.torpedoid);

                    openCargo -= ammo;
                }
            }
        }

    };
    
vgapShipScreen.prototype.getMineUnits = function (ship) {
        //calculate # of torps to lay
        //var ship = this.ship;
        var torps = ship.ammo;
        var fc = ship.friendlycode.toLowerCase();
        if (fc.substr(0, 2) == "md") {
            if (fc == "mdh")
                torps = Math.floor(ship.ammo / 2);
            else if (fc == "mdq")
                torps = Math.floor(ship.ammo / 4);
            else {
                var mdVal = fc.replace("md", "");
                try {
                    //md1 - md0
                    var amt = parseInt(mdVal);
                    if (amt == 0)
                        amt = 10;
                    amt = amt * 10;
                    if (amt < torps)
                        torps = amt;
                }
                catch (err) { }
            }
        }
        ship.minelaytorps = torps;
        var units = torps * ship.torpedoid * ship.torpedoid;

        //robots lay 4 times more
        if (vgap.getPlayer(ship.ownerid).raceid == 9)
            units = units * 4;

        //max minefield size
        if (units > 22500)
            units = 22500;

        return units;
    };



    
//
}
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);

