// ==UserScript==
// @name          Planets.nu - Quick Keys Plugin
// @description   Adds new buttons and hotkeys to give ship orders faster
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @version 0.3
// ==/UserScript==

/*------------------------------------------------------------------------------
Planets.nu - Ship Quick Keys Plugin

Modifies the ship screen to allow quick changing of ship orders. Makes the following changes:

1. To the interface:

- Enables using the keyboard on the primary enemy selection screen. Just enter the number/letter for the player's row. 0 (zero) and space select "None".

- Adds a Quick Links section with the following clickable buttons:
+ Missions: All missions that apply to this ship are shown. Clicking any of the missions selects it.
+ mdX Frendly Codes: If the ship mission is set to lay mines (or webs), a row is shown with all of the "mdX" codes.
+ Other Friendly Codes: The usual list planets.nu gives plus possibly some more, where they are applicable:
 - StP: A ship over a planet can use StP (set Ship to Planet) to change it's FC to the match planet.
 - PtS: A ship over YOUR planet can use PtS (set Planet to Ship) to change the planet's FC to match this ship (does not change ship FC)
 - cln: If at your base and the basic cloning requirements are satisified (race and hull restrictions)
 - mi_: Ships laying mines (or webs) can use mi_ to bring up a player select screen for who's identity to lay the mines in.
 - gs_: Brings up player select screen to chose who to give the ship to.
 - x**: If you are playing birdmen and mission is Super Spy, you can select x** to give you an fc that is an "x" followed by 2 random chars.
 - msc: Not a new code, but selecting msc from the quick links section will also set your mission to mine sweep
 
 Clicking on *most* of the FC buttons, when your ship FC is already ser to it, will change it to a version with altered capitalization.
 
 
 2. To Hotkeys:
 
 - 'm' now uses a "quick select" mission selector. After pressing it, just enter the number for the mission you want.
 - 'b' a "quick select" for Beam Up XXX missions. Following by pressing the key for what you want (F, D, T, M, S). 'N' also works for fuel.
 - 'd' mdX mode - sets mission to lay mines. If crystal sets to lay webs UNLESS mission was already lay mines. Once in mdX mode, you can use the keys '0'-'9', 'q', 'h', and 'a' to set the respective mdX FC. Press 'd' to quit mdX mode.
 - 'shift-f' will shuffle the capitalization of your FC. It only works for FCs with at least 2 letters, and will never give you the all lower case version.
 - 'ctrl-f' will set a new random FC
 - 'q' now toggles connections even in base/planet screen
------------------------------------------------------------------------------*/


function wrapper () { // wrapper for injection

    if (vgap.version < 3) return;
    
    vgapShipScreen.prototype.setSpecificFC = function (fc) {    
        if (this.ship.friendlycode.toLowerCase() == fc.toLowerCase() && fc.toLowerCase().match(/[a-z].*[a-z]/) ) {
            var newfc;
            do {
                newfc = "";
                for (var i = 0; i < fc.length; i++) {
                    newfc += (Math.random() < 0.5 ? fc.charAt(i).toLowerCase() : fc.charAt(i).toUpperCase());
                }
            } while (newfc == fc.toLowerCase() || newfc == this.ship.friendlycode)
            this.ship.friendlycode = newfc;
            this.screen.refresh();            
            return; //?
        }
        else {
            this.ship.friendlycode = fc;
        }
        switch (fc) {
            case "gs_":
                this.giveShipSelect();
                break;
            case "mi_":
                this.layMinesFor();
                break;
            case "msc":
                this.selectMission(1);
                break;
            case "StP":
                if (this.planet) this.ship.friendlycode = this.planet.friendlycode;
                break;
            case "PtS":
                if (this.planet && this.planet.ownerid == vgap.player.id) {
                    this.planet.friendlycode = this.ship.friendlycode;
                    this.planet.changed = 1;
                }
                break;
            case "x**":
                this.ship.friendlycode = "x" + vgap.randomFC().substring(1);
                break;
            
        }
                
        this.screen.refresh();
        vgap.loadWaypoints();
        vgap.map.draw();
    }
    
    // Easier just to copy vgapShipScreen.primaryEnemy and make some minor changes
    vgapShipScreen.prototype.giveShipSelect = function () {
        vgap.more.empty();
        var cls = "OrdersScreen";
        if (vgap.players.length > 15)
            cls = "OrdersScreenSmall";

        var html = "<div id='" + cls + "'>";
        if (vgap.players.length <= 15)
            html += "<h1>Give Ship To</h1><p>Select the player to give this ship to. That player must have a ship in the same location with at least 1 clan on board to receive the ship.</p>";
        html += "<p id='Enemies'></p></div>";
        $(html).appendTo(vgap.more);

        $("<div>None</div>").tclick(function() { vgap.closeMore(); vgap.shipScreen.setSpecificFC("gs0"); }).appendTo("#Enemies");
        for (var i = 0; i < vgap.players.length; i++) {
            var player = vgap.players[i];
            if (true /*player.id != vgap.player.id*/ /* include self for gsX, for getting tricky*/) {
                var race = vgap.getRace(player.raceid);
                var select = function (id) { return function () { vgap.closeMore(); vgap.shipScreen.setSpecificFC("gs" + id.toString(36));} }; //closure
                $("<div>" + player.id.toString(36).toUpperCase() + ") " + race.name + " (" + player.username + ")</div>").tclick(select(player.id)).appendTo("#Enemies");
            }
        }
        shtml.moreBack();
        vgap.showMore();
    }
    
    // Easier just to copy vgapShipScreen.primaryEnemy and make some minor changes
    vgapShipScreen.prototype.layMinesFor = function () {
        vgap.more.empty();
        var cls = "OrdersScreen";
        if (vgap.players.length > 15)
            cls = "OrdersScreenSmall";

        var html = "<div id='" + cls + "'>";
        if (vgap.players.length <= 15)
            html += "<h1>Lay Mines in Identity Of</h1><p>This ship will lay mines in the identity of the selected player.</p>";
        html += "<p id='Enemies'></p></div>";
        $(html).appendTo(vgap.more);

        $("<div>None</div>").tclick(function() { vgap.closeMore(); vgap.shipScreen.setSpecificFC("mi0"); }).appendTo("#Enemies");
        for (var i = 0; i < vgap.players.length; i++) {
            var player = vgap.players[i];
            if (player.id != vgap.player.id) {
                var race = vgap.getRace(player.raceid);
                var select = function (id) { return function () { vgap.closeMore(); vgap.shipScreen.setSpecificFC("mi" + id.toString(36)); } }; //closure
                $("<div>" + player.id.toString(36).toUpperCase() + ") " + race.name + " (" + player.username + ")</div>").tclick(select(player.id)).appendTo("#Enemies");
            }
        }
        shtml.moreBack();
        vgap.showMore();
    }    
    
    var old_hotkey = vgaPlanets.prototype.hotkey;
	vgaPlanets.prototype.hotkey = function (ev) {
	
	   if (!vgap.hotkeysOn) return old_hotkey.apply(this, arguments);
	   
	   
	
	   if (this.shipScreenOpen && this.shipScreen.mdxmode) {
	       if ( (ev.keyCode >= 48 && ev.keyCode <= 57) || ev.keyCode == 81 || ev.keyCode == 72 || ev.keyCode == 65) {
	           vgap.shipScreen.setSpecificFC("md" + String.fromCharCode(ev.keyCode).toLowerCase());
	           return;
	       }
	       else {
	           vgap.shipScreen.mdxmode = false;
    	       $("#MDButtons").css("background-color", "");	
    	       if (ev.keyCode == 68) return;
	       }    
	   }
	   
	   // 0-9 if in mission quickselect mode (after pressing 'm')
	   if (ev.keyCode >= 48 && ev.keyCode <= 57 && this.shipScreenOpen && $("#MainMissions").prop("keyinput")) {
	       var mid = (ev.keyCode + 1) % 10;
	       var mission = vgap.getArray(vgap.shipScreen.missions, mid);
	       if (mission != null && mission.show)
    	       vgap.shipScreen.selectMission( mid );
    	   return;
	   }
	   
	   // if in beam up select
	   	   if (this.shipScreenOpen && $("#BeamMissions").prop("keyinput")) {
	   	       var vals = "FDTMS";
	   	       var char = String.fromCharCode(ev.keyCode).toUpperCase();
	   	       if (char == "N") char = "F";
	   	       var offset = vals.indexOf(char);
	   	       if (offset > -1) {
	   	           vgap.shipScreen.selectMission(10 + offset);
	   	           return;
	   	       }
	   	   }
	   
	   // d - quickset mdX codes
	   if (ev.keyCode == 68 && vgap.shipScreenOpen && vgap.shipScreen.ship.torps > 0) {
	       vgap.shipScreen.mdxmode = true;
	       var missionid = 2;
	       if (vgap.player.raceid == 7 && vgap.shipScreen.ship.mission != 2)
	           missionid = 8;
	       vgap.shipScreen.selectMission(missionid);
	       //var mselect = $("#MDButtons").detach();
	       //$("#QuickLinks").html(mselect);
	       $("#MDButtons").css("background-color", "#ff9933");
	       //$("#MMKeys").show();	       
	       return;
	   }
	   
	   // b - beam up missions
	   if (ev.keyCode == 66 && vgap.shipScreenOpen) {
	       //var mselect = $("#BeamMissions").detach();
	       //$("#QuickLinks").html(mselect);
	       $("#BeamMissions").css("background-color", "#ff9933").prop("keyinput", true);
	       //$("#MMKeys").show();
	       return;	   
	   }
	   
	   // Player select via keypress for PE and similar screens
	   if ( $("#Enemies").length > 0 && vgap.moreOpen ) {
	       // 0 (Zero) or space, select None
	       if (ev.keyCode == 48 || ev.keyCode == 32) {
	           $("#Enemies > div").first().click();
	           return;
	       }
	       // a-z, 1-9, selct div that starts with key)
	       if (ev.keyCode >= 49 && ev.keyCode <= 90) {
	           var selected = String.fromCharCode(ev.keyCode).toUpperCase() + ")";
	           $("#Enemies > div").filter(function () { return $(this).text().substring(0,2) == selected; }).click();
	           return;
	       }
	   }
	   
	   // redirect m for new mission select
	   if (ev.keyCode == 77 && this.shipScreenOpen) {
	       var mselect = $("#MainMissions").detach();
	       $("#QuickLinks").html(mselect);
	       $("#MainMissions").css("background-color", "#ff9933").prop("keyinput", true);
	       $("#MMKeys").show();
	       return;
	   }
	   
	   // shift-f, shuffle FC capitalization
	   if (ev.keyCode == 70 && ev.shiftKey && vgap.shipScreenOpen) {
	       vgap.shipScreen.setSpecificFC(vgap.shipScreen.ship.friendlycode);
	       return;
	   }
	   
	   // ctrl-f, random FC
	   if (ev.keyCode == 70 && ev.ctrlKey && vgap.shipScreenOpen) {
	       vgap.shipScreen.setSpecificFC(vgap.randomFC());
	       ev.preventDefault();
	       return;
	   }	   
	   
	   //q - remove check against base/planet open
	   if (ev.keyCode == 81) {
            if (!vgap.map.showconnections) {
                vgap.map.showconnections = true;
                vgap.map.draw();
            }
            else {
                vgap.map.showconnections = false;
                vgap.map.draw(); 
            }
            return;
       }
	
	   old_hotkey.apply(this, arguments);
	
	}
	/*
	 *  Specify your plugin
	 *  You need to have all those methods defined or errors will be thrown. 
	 *  I inserted the print-outs in order to demonstrate when each method is 
	 *  being called. Just comment them out once you know your way around. 
	 *  
	 *  For any access to plugin class variables and methods from inside these
	 *  reserved methods, "vgap.plugins["nameOfMyPlugin"].my_variable" has to be 
	 *  used instead of "this.my_variable". 
	 */
	var plugin = {
			
			/*
			 * processload: executed whenever a turn is loaded: either the current turn or
			 * an older turn through time machine 
			 */
			processload: function() {
//				console.log("ProcessLoad: plugin called.");
			},	
			
			/*
			 * loaddashboard: executed to rebuild the dashboard content after a turn is loaded
			 */
			loaddashboard: function() {
//				console.log("LoadDashboard: plugin called.");
			},

			/*
			 * showdashboard: executed when switching from starmap to dashboard
			 */
			showdashboard: function() {
//				console.log("ShowDashboard: plugin called.");		
			},
			
			/*
			 * showsummary: executed when returning to the main screen of the dashboard
			 */
			showsummary: function() {
//				console.log("ShowSummary: plugin called.");
			},
			
			/*
			 * loadmap: executed after the first turn has been loaded to create the map
			 * as far as I can tell not executed again when using time machine
			 */
			loadmap: function() {
//				console.log("LoadMap: plugin called.");
    
			},
			
			/*
			 * showmap: executed when switching from dashboard to starmap
			 */
			showmap: function() {
//				console.log("ShowMap: plugin called.");
			},
			
			/*
			 * draw: executed on any click or drag on the starmap
			 */			
			draw: function() {
//				console.log("Draw: plugin called.");
				//vgap.map.overlays.width = vgap.map.canvas.width;
        		//vgap.map.overlays.height = vgap.map.canvas.height;
			},		
			
			/*
			 * loadplanet: executed a planet is selected on dashboard or starmap
		 	 * loadstarbase: executed a planet is selected on dashboard or starmap
			 * Inside the function "load" of vgapPlanetScreen (vgapPlanetScreen.prototype.load) the normal planet screen 
			 * is set up. You can find the function in "nu.js" if you search for 'vgap.callPlugins("loadplanet");'.
			 * 
			 * Things accessed inside this function several variables can be accessed. Elements accessed as "this.X" 
			 * can be accessed here as "vgap.planetScreen.X".
			 */
			loadplanet: function() {
//				console.log("LoadPlanet: plugin called.");
//				console.log("Planet id: " + vgap.planetScreen.planet.id);
			},
			
			/*
			 * loadstarbase: executed a planet is selected on dashboard or starmap
			 * Inside the function "load" of vgapStarbaseScreen (vgapStarbaseScreen.prototype.load) the normal starbase screen 
			 * is set up. You can find the function in "nu.js" if you search for 'vgap.callPlugins("loadstarbase");'.
			 * 
			 * Things accessed inside this function several variables can be accessed. Elements accessed as "this.X" 
			 * can be accessed here as "vgap.starbaseScreen.X".
			 */
			loadstarbase: function() {
//				console.log("LoadStarbase: plugin called.");
//				console.log("Starbase id: " + vgap.starbaseScreen.starbase.id + " on planet id: " + vgap.starbaseScreen.planet.id);
			},
			
			/*
			 * loadship: executed a planet is selected on dashboard or starmap
			 * Inside the function "load" of vgapShipScreen (vgapShipScreen.prototype.load) the normal ship screen 
			 * is set up. You can find the function in "nu.js" if you search for 'vgap.callPlugins("loadship");'.
			 * 
			 * Things accessed inside this function several variables can be accessed. Elements accessed as "this.X" 
			 * can be accessed here as "vgap.shipScreen.X".
			 */
			loadship: function() {
//				console.log("LoadShip: plugin called.");
                this.mdxmode = false;
                var ship = vgap.shipScreen.ship;
                vgap.shipScreen.screen.addSection( "QuickLinks", "Quick Links", [], function () {
                    for (var i = 0; i < vgap.shipScreen.missions.length; i++) {
                        var mission = vgap.shipScreen.missions[i];
                        mission.show = true;
                        switch (mission.id) {
                            case 0:
                                mission.abbr = "Expl";
                                break;
                            case 1:
                                mission.abbr = "Sweep";
                                break;                            
                            case 2:
                                mission.abbr = "Mines";
                                break;    
                            case 3:
                                mission.abbr = "Kill";
                                break;
                            case 4:
                                mission.abbr = "Scan";
                                break;
                            case 5:
                                mission.abbr = "L & D";
                                break;
                            case 6:
                                mission.abbr = "Tow";
                                break;
                            case 7:
                                mission.abbr = "Int";
                                var dest = vgap.getDest(ship);
                                var ships = vgap.shipsAt(dest.x, dest.y);
                                if (ships.length == 0 || (ships.length == 1 && ships[0].id == ship.id))
                                    mission.show = false;
                                break;
                            case 8:
                                switch (vgap.getPlayer(ship.ownerid).raceid) {
                                    case 1: mission.abbr = "Refit"; break;
                                    case 2: mission.abbr = "Hiss"; break;
                                    case 3: mission.abbr = "Spy"; break;
                                    case 4: mission.abbr = "Pill"; break;                                    
                                    case 5: mission.abbr = "Rob"; break;
                                    case 6: mission.abbr = "S Rep"; break;
                                    case 7: mission.abbr = "Webs"; break;
                                    case 8: mission.abbr = "Sense"; break;
                                    case 10: mission.abbr = "RGA"; break;                                    
                                    case 9:
                                    case 11: mission.abbr = "Ftrs"; break;                                    
                                }
                                break;
                            case 9:
                                mission.abbr = "Cloak";
                                break;                                
                            case 10:
                                mission.abbr = "Bu F";
                                break;
                            case 11:
                                mission.abbr = "Bu D";                                
                                break;
                            case 12:
                                mission.abbr = "Bu T";
                                break;                            
                            case 13:
                                mission.abbr = "Bu M";
                                break;
                            case 14:
                                mission.abbr = "Bu S";
                                break;                                
                            case 15:
                                mission.abbr = "Rep";
                                break; 
                            case 14:
                                mission.abbr = "Dest";
                                break;                                 
                            default:
                                mission.abbr = mission.name;
                        }
                    }
                    var html = "<table id='MainMissions' style='table-layout: fixed; text-align: center; width: 100%;'><tr>";
                    var keys = "";
                    var buttons = "";
                    for (var c = 0; c < 10; c++) {
                        var mission = vgap.getArray(vgap.shipScreen.missions, c);                        
                        keys += "<td>";
                        var bg = "#dddddd";
                        if (mission != null && ship.mission == mission.id)
                            bg = "#bfbfbf";                            
                        buttons += "<td style='color: #002222; background-color: " + bg + "; width: 10%; padding: 4px 0px' onclick='" + ((mission != null && mission.show) ? "vgap.shipScreen.selectMission(" + mission.id + ");" : "" ) + "'>";
                        if (mission != null && mission.show) {
                            keys += ((mission.id + 1) % 10);
                            buttons += mission.abbr;
                        }
                        keys += "</td>";
                        buttons += "</td>";
                    }
                    html += buttons + "</tr><tr id='MMKeys' style='display: none;'>" + keys +"</tr></table>";

                    html += "<table id='BeamMissions' style='table-layout: fixed; text-align: center; width: 100%;'><tr>";
                    var keys = "";
                    var buttons = "";
                    for (var c = 10; c < 20; c++) {
                        var mission = vgap.getArray(vgap.shipScreen.missions, c);                        
                        keys += "<td>";
                        var bg = "#dddddd";
                        if (mission != null && ship.mission == mission.id)
                            bg = "#bfbfbf";                            
                        buttons += "<td style='color: #002222; background-color: " + bg + "; width: 10%; padding: 4px 0px' onclick='" + ((mission != null && mission.show) ? "vgap.shipScreen.selectMission(" + mission.id + ");" : "" ) + "'>";
                        if (mission != null && mission.show) {
                            keys += ((mission.id + 1) % 10);
                            buttons += mission.abbr;
                        }
                        keys += "</td>";
                        buttons += "</td>";
                    }
                    html += buttons + "</tr></table>"; //<tr id='MMKeys' style='display: none;'>" + keys +"</tr></table>";
                    
                    
                    var minelaying = ship.mission == 2 || (ship.mission == 8 && vgap.player.raceid == 7);
                    if (minelaying) {
                        html += "<table id='MDButtons' style='" + (vgap.shipScreen.mdxmode ? "background-color: #ff9933; " : "" ) + "table-layout: fixed; text-align: center; width: 100%'><tr>";
                        vals = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "h"];
//                      texts = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "quarter", "half", "all"];
                        for (var i = 0; i < vals.length; i++) {
                            var fc = "md" + vals[i];
                            var bg = "#dddddd";
                            if (ship.friendlycode.toLowerCase() == fc)
                                bg = "#bfbfbf";                            
                            html += "<td style='color: #220022; background-color: " + bg + "; font-family: monospace; padding: 4px 0px' onclick='vgap.shipScreen.setSpecificFC(\"" + fc + "\");'>" + fc + "</td>";
                        }
                        html += "</tr></table>";
                    }
                    
                    var fcodes = [];
                    for (var i = 0; i < vgap.shipScreen.fcodes.length; i++) {
                        fcodes.push(vgap.shipScreen.fcodes[i].code);
                    }
                    

                    var raceid = vgap.player.raceid;                    
                    var pa = vgap.shipScreen.planet;
                    if (pa != null) {
                        fcodes.push( "StP" );
                        if (pa.ownerid == vgap.player.id) {
                            fcodes.push( "PtS" );
                            if ( raceid != 5 && raceid != 7 && vgap.getStarbase(pa.id) != null && vgap.racehulls.indexOf(ship.hullid) == -1 ) {
                                fcodes.push("cln");
                            }
                        }
                    }
                    
                    if (minelaying) fcodes.push( "mi_" );
                    fcodes.push( "gs_" );
                    if (raceid == 3 && ship.mission == 8)
                        fcodes.push( "x**" );
                    
                    html += "<table style='table-layout: fixed; text-align: center; width: 100%'>";
                    html += "<tr>";
                    for (var i = 0; i < fcodes.length; i++) {
                        html += "<td style='color: #220022; background-color: #dddddd; font-family: monospace; padding: 4px 0px' onclick='vgap.shipScreen.setSpecificFC(\"" + fcodes[i] + "\");'>";
                        if (i < fcodes.length) {
                            html += fcodes[i];
                        }
                        html += "</td>";
                        if ((i + 1) % 12 == 0) html += "</tr><tr>";
                    }
                    html += "</tr>";
                    html += "</table>";                    
                    return html;
                } );

			},
			
			// END PLUGIN FUNCS
			
        			
			
			
	};
		
	// register your plugin with NU
	vgap.registerPlugin(plugin, "ShipQuickLinks");
	

	
	
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
document.body.removeChild(script);        