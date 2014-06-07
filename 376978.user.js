// ==UserScript==
// @name          Planets.nu - Idle Object Visualizer Plugin
// @namespace     Planets.nu
// @version       0.58
// @date          2014-04-26
// @author        kedalion
// @description   NU plugin which displays all planets, starbases, and ships that are marked idle, ready, or permanently ready 
// @include       http://planets.nu/*
// @include       http://play.planets.nu/*
// @include       http://test.planets.nu/*
// @resource      userscript https://userscripts.org/scripts/source/376978.meta.js
// @updateURL     https://userscripts.org/scripts/source/376978.meta.js
// @downloadURL   https://userscripts.org/scripts/source/376978.user.js
// @homepage      http://planets.nu/discussion/utility-script-idle-object-visualizer-plugin

// ==/UserScript==

/*
 Change log:
 0.58   No fleet view for single objects [2014-04-26]
 0.57   Added filters for ship types [2014-04-24]
 0.56   Added ready markers to ship icons in detail list. Fixed issues with full allies: both own and ally ships were blue. Planet and Starbase are always displayed in mini-list to prevent ships changing position in mini-list when switching to planet or base and back.  [2014-04-24]
 0.55   Fixed small bug in planet color [2014-04-15]
 0.54   Added auto enabled after selection in map tools [2014-02-18]
 0.53   Fixed line width bug [2014-02-16]
 0.51	Added enable/disable buttons [2014-02-11]
 0.5    Initial alpha release [2014-02-11]
 */
function wrapper() { // wrapper for injection

	if (vgap.version < 3.0) {
		console.log("IdleObjectVisualizer plugin requires at least NU version 3.0. Plugin disabled.");
		return;
	}

	var plugin_version = 0.58;

	console.log("IdleObjectVisualizer plugin version: v" + plugin_version);

	objectTypeEnum = {
		PLANETS     : 0,
		BASES       : 1,
		SHIPS       : 2,
		FILTERSHIPS : 3
	};

	/**
	 *  Specify your plugin
	 *  You need to have all those methods defined or errors will be thrown. 
	 *  I inserted the print-outs in order to demonstrate when each method is 
	 *  being called. Just comment them out once you know your way around.
	 *  
	 *  For any access to plugin class variables and methods, 
	 *  "vgap.plugins["idleObjectVisualizerPlugin"].my_variable" has to be used 
	 *  instead of "this.my_variable".
	 */
	var idleObjectVisualizerPlugin = {

		/**
		 * processload: executed whenever a turn is loaded: either the current turn or
		 * an older turn through time machine 
		 */
		processload : function() {
			//console.log("ProcessLoad: plugin called.");
		},

		/**
		 * loaddashboard: executed to rebuild the dashboard content after a turn is loaded
		 */
		loaddashboard : function() {
			//console.log("LoadDashboard: plugin called.");
		},

		/**
		 * showdashboard: executed when switching from starmap to dashboard
		 */
		showdashboard : function() {
			//console.log("ShowDashboard: plugin called.");		
			vgap.plugins["idleObjectVisualizerPlugin"].resetIdleSelectorTools();
		},

		/**
		 * showsummary: executed when returning to the main screen of the dashboard
		 */
		showsummary : function() {
			//console.log("ShowSummary: plugin called.");
			vgap.plugins["idleObjectVisualizerPlugin"].resetIdleSelectorTools();
		},

		/**
		 * loadmap: executed after the first turn has been loaded to create the map
		 * as far as I can tell not executed again when using time machine
		 */
		loadmap : function() {
			//console.log("LoadMap: plugin called.");
			vgap.map.addMapTool("<span style=\"color:#FF8000\">Idle Visualizer</span>", "ShowMinerals", vgap.plugins["idleObjectVisualizerPlugin"].showIdleSelectorToolsEnabled);
			vgap.map.addMapTool("<span style=\"color:#FF8000\">Ship Type Filter</span>", "ShowMinerals", vgap.plugins["idleObjectVisualizerPlugin"].showOverlayFilter);
			vgap.plugins["idleObjectVisualizerPlugin"].enabled = false;
			vgap.plugins["idleObjectVisualizerPlugin"].drawSelection[0] = false;
			vgap.plugins["idleObjectVisualizerPlugin"].drawSelection[1] = false;
			vgap.plugins["idleObjectVisualizerPlugin"].drawSelection[2] = true;
			vgap.plugins["idleObjectVisualizerPlugin"].drawStatus = 0;
			
			for (var i=0; i<vgap.plugins["idleObjectVisualizerPlugin"].shipSelection.length; i++) {
                vgap.plugins["idleObjectVisualizerPlugin"].shipSelection[i] = false;
			}			
		},

		/**
		 * showmap: executed when switching from dashboard to starmap
		 */
		showmap : function() {
			//console.log("ShowMap: plugin called.");
		},

		/**
		 * draw: executed on any click or drag on the starmap
		 */
		draw : function() {
			//console.log("Draw: plugin called.");
			vgap.plugins["idleObjectVisualizerPlugin"].drawStatusObjects();
			vgap.plugins["idleObjectVisualizerPlugin"].drawFilteredShips();
		},

		/**
		 * loadplanet: executed a planet is selected on dashboard or starmap
		 */
		loadplanet : function() {
			//console.log("LoadPlanet: plugin called.");
		},

		/**
		 * loadstarbase: executed a planet is selected on dashboard or starmap
		 */
		loadstarbase : function() {
			//console.log("LoadStarbase: plugin called.");
		},

		/**
		 * loadship: executed a planet is selected on dashboard or starmap
		 */
		loadship : function() {
			//console.log("LoadShip: plugin called.");
		},

		/***************************************************************************************
		 * Custom plugin variables
		 ***************************************************************************************/

		//things that get saved to disk		
		version : plugin_version,
		plugin_name: "IdleObjectVisualizerPlugin",	
		//storage_path : "nuIdleObjectPlugin.",

		//other variables
		enabled : false,		
		drawSelection : [ false, false, true ],
		drawStatus : 0,
		//drawMode : true,
		colors : [ "#990099", "#3399FF", "#FFFF00" , "#FF8000"],
		//[ "#990099", "#3399FF", "#FFFF00" ],
        //[ "#FF3399", "#3399FF", "#FFFF00" ],
        //["#FFFF00","#66FF33","#009933"],
		lineWidth : 5,
		
		//ship types
		shipTypes : ["Merlins", "Refinery Ships", "Fireclouds", "HYP Ships", "Cobols", "Terraformers", "Decloakers", "Freighters"],
        shipSelection : [ false, false, false, false, false, false, false, false ],		
        shipGroupMembers : [ [105], [104,97], [56], [51,77,87,110], [96], [180,64,107,8,3], [7,41,1041,1039,39], []],
		
		oldPlanetScan: null,
		oldStarbaseScan: null,
		oldShipScan: null,

		/***************************************************************************************
		 * Custom plugin methods
		 ***************************************************************************************/

		/**
		 * Enables and disables the plugin 
		 */
		enablePlugin : function() {
			//				if (vgap.plugins["idleObjectVisualizerPlugin"].enabled) {
			//					vgap.plugins["idleObjectVisualizerPlugin"].enabled = false;					
			//				} else {
			//vgap.plugins["idleObjectVisualizerPlugin"].enabled = true;
			vgap.plugins["idleObjectVisualizerPlugin"].showIdleSelectorTools(true);
			//				}	
			//				vgap.plugins["idleObjectVisualizerPlugin"].syncButtons();
			vgap.map.draw();
		},

		/**
		 * Draw locations of object with desired status on the map 
		 */
		drawStatusObjects : function() {

			if (!this.enabled) {
				return;
			}

			if (this.drawSelection[objectTypeEnum.ALL] || this.drawSelection[objectTypeEnum.PLANETS]) {
            
				var markup = {
					attr : {
						stroke : this.colors[objectTypeEnum.PLANETS]
					}
				};

               	for ( var p = 0; p < vgap.planets.length; p++) {
					var planet = vgap.planets[p];

					if (planet.ownerid != vgap.player.id) {
						continue;
					}

					if (planet.readystatus != this.drawStatus) {
						continue;
					}
                     
					this.drawScaledCircle(planet.x, planet.y, 19, markup.attr, null, 0.5);
				}
			}

			if (this.drawSelection[objectTypeEnum.ALL] || this.drawSelection[objectTypeEnum.BASES]) {

				var markup = {
					attr : {
						stroke : this.colors[objectTypeEnum.BASES]
					}
				};

				for ( var p = 0; p < vgap.starbases.length; p++) {
					var base = vgap.starbases[p];
					var planet = vgap.getPlanet(base.planetid);

					if (planet.ownerid != vgap.player.id) {
						continue;
					}

					if (base.readystatus != this.drawStatus) {
						continue;
					}

					this.drawScaledCircle(planet.x, planet.y, 11, markup.attr, null, 0.7);
				}
			}

			if (this.drawSelection[objectTypeEnum.ALL] || this.drawSelection[objectTypeEnum.SHIPS]) {

				var markup = {
					attr : {
						stroke : this.colors[objectTypeEnum.SHIPS]
					}
				};

				for ( var p = 0; p < vgap.ships.length; p++) {
					var ship = vgap.ships[p];

					if (ship.ownerid != vgap.player.id) {
						continue;
					}

					if (ship.readystatus != this.drawStatus) {
						continue;
					}

					this.drawScaledCircle(ship.x, ship.y, 15, markup.attr, null, 0.5);
				}
			}

		},
		
		
		/**
		 * Highlight location of selected ship types on the map 
		 */
		drawFilteredShips : function() {
		
            var drawAny = false;
            
            for (var i=0; i<this.shipSelection.length; i++) {
                if (this.shipSelection[i]) {
                    drawAny = true;
                    break;
                }
            }
		
			if (drawAny) {

				var markup = {
					attr : {
						stroke : this.colors[objectTypeEnum.FILTERSHIPS]
					}
				};

				for ( var p = 0; p < vgap.ships.length; p++) {
					var ship = vgap.ships[p];

					if (ship.ownerid != vgap.player.id) {
						continue;
					}
                    
                    var drawIt = false;
                    for (var i=0; i<this.shipSelection.length; i++) {
                        if (this.shipSelection[i]) {
                            //freighters are special
                            if (i == 7) { 
                                if (ship.beams == 0 && ship.bays == 0 && ship.torps == 0) {
                                    drawIt = true;
                                } 
                            } else {                            
                                for (var t=0; t<this.shipGroupMembers[i].length; t++) {
                                    if (ship.hullid == this.shipGroupMembers[i][t]) {                                    
                                        drawIt = true;
                                        break;
                                    }
                                }
                            }
                            
                        }
                        if (drawIt) {
                            this.drawScaledCircle(ship.x, ship.y, 25, markup.attr, null, 0.8);
                            break;
                        }
                    }                    
				}
			}

		},

		/**
		 * Generate the content for the enemy ship dashboard tab
		 * @param x			x coordinate of ship
		 * @param y			y coordinate of ship			
		 * @param radius	radius of circle
		 * @param attr		color of the drawing
		 * @param paperset	where to draw
		 * @param alpha     alpha value to use
		 */
		drawScaledCircle : function(x, y, radius, attr, paperset, alpha) {
			if (!vgap.map.isVisible(x, y, radius))
				return;
			radius *= vgap.map.zoom;
			if (radius <= 1)
				radius = 1;
			if (paperset == null)
				paperset = vgap.map.ctx;
			paperset.strokeStyle = colorToRGBA(attr.stroke, alpha);
			
			//save original line width
            var org_line_width = paperset.lineWidth;
			
			paperset.lineWidth = this.lineWidth;
			//paperset.setAlpha(0.5);
			paperset.beginPath();
			paperset.arc(vgap.map.screenX(x), vgap.map.screenY(y), radius, 0, Math.PI * 2, false);
			paperset.stroke();
			
			//restore previous line width
			paperset.lineWidth = org_line_width;
			
		},

		/**
		 * Toggle the checkbox deciding which player's ships are being displayed
		 * @param id		id of player to toggle
		 */
		toggleSelection : function(id) {

			if (id < 0 || id > 2) {
				return;
			}
			//console.log("Toggling: " + id);

			vgap.plugins["idleObjectVisualizerPlugin"].drawSelection[id] = !vgap.plugins["idleObjectVisualizerPlugin"].drawSelection[id];

		},

		/**
		 * Enable the plugin and show the top menu for selecting what objects (planets/bases/ships) to visualize and for which status
		 */
		showIdleSelectorToolsEnabled : function() {
			vgap.plugins["idleObjectVisualizerPlugin"].showIdleSelectorTools(true);			
			vgap.map.draw();
		},
		
		/**
		 * Show/refresh the top menu for selecting what objects (planets/bases/ships) to visualize and for which status
		 */
		showIdleSelectorTools : function(enable) {

			$("#IdleToolsContainer").remove();
			
			if (enable != null)
				this.enabled = enable;
			
			var html = "<li id='IdleToolsContainer'><div id='ToolSelector'><table><tr>"; // style='border: 1px solid #000000;'>";

			html += "<td>Status <select id='OverlaySelect' onchange='vgap.plugins[\"idleObjectVisualizerPlugin\"].drawStatus=parseInt($(\"#OverlaySelect\").val());vgap.plugins[\"idleObjectVisualizerPlugin\"].showIdleSelectorTools(); vgap.map.draw();'>";

			html += "<option value=0 " + (vgap.plugins['idleObjectVisualizerPlugin'].drawStatus == 0 ? "selected" : "")
					+ ">Not ready</option>";
			html += "<option value=1 " + (vgap.plugins['idleObjectVisualizerPlugin'].drawStatus == 1 ? "selected" : "") + ">Ready</option>";
			html += "<option value=2 " + (vgap.plugins['idleObjectVisualizerPlugin'].drawStatus == 2 ? "selected" : "")
					+ ">Permanent Ready</option>";

			html += "</select></td>";

			html += "<td><label><input id='idle_type_planets' type='checkbox' "
					+ (vgap.plugins["idleObjectVisualizerPlugin"].drawSelection[objectTypeEnum.PLANETS] ? "checked" : "")
					+ " onchange='vgap.plugins[\"idleObjectVisualizerPlugin\"].toggleSelection(" + objectTypeEnum.PLANETS
					+ "); vgap.map.draw();'></input>Planets</label></td>";
			html += "<td><label><input id='idle_type_bases' type='checkbox' "
					+ (vgap.plugins["idleObjectVisualizerPlugin"].drawSelection[objectTypeEnum.BASES] ? "checked" : "")
					+ " onchange='vgap.plugins[\"idleObjectVisualizerPlugin\"].toggleSelection(" + objectTypeEnum.BASES
					+ "); vgap.map.draw();'></input>Bases</label></td>";
			html += "<td><label><input id='idle_type_ships' type='checkbox' "
					+ (vgap.plugins["idleObjectVisualizerPlugin"].drawSelection[objectTypeEnum.SHIPS] ? "checked" : "")
					+ " onchange='vgap.plugins[\"idleObjectVisualizerPlugin\"].toggleSelection(" + objectTypeEnum.SHIPS
					+ "); vgap.map.draw();'></input>Ships</label></td>";
			if (vgap.plugins["idleObjectVisualizerPlugin"].enabled) {

				html += "<td onclick='vgap.plugins[\"idleObjectVisualizerPlugin\"].showIdleSelectorTools(false); vgap.map.draw();'><span style='background: #33CC33; padding: 5px;'> Disable </span></td>";
				//html += "<td onclick='vgap.plugins[\"idleObjectVisualizerPlugin\"].enabled = false; vgap.plugins[\"idleObjectVisualizerPlugin\"].showIdleSelectorTools(false); vgap.map.draw();'><span style='background: #33CC33; padding: 5px;'> Disable </span></td>";
			} else {
				html += "<td onclick='vgap.plugins[\"idleObjectVisualizerPlugin\"].showIdleSelectorTools(true); vgap.map.draw();'><span style='background: #CC0000; padding: 5px;'> Enable </span></td>";
				//html += "<td onclick='vgap.plugins[\"idleObjectVisualizerPlugin\"].enabled = true; vgap.plugins[\"idleObjectVisualizerPlugin\"].showIdleSelectorTools(true); vgap.map.draw();'><span style='background: #CC0000; padding: 5px;'> Enable </span></td>";
			}

			html += "<td><a class='rNavRight' onclick='vgap.plugins[\"idleObjectVisualizerPlugin\"].resetIdleSelectorTools();'></a></td>";
			html += "</td></tr></table></div></li>";
			$("#PlanetsMenu").prepend(html);

		},

		resetIdleSelectorTools : function() {

			$("#IdleToolsContainer").remove();

		},
		
		/**
		 * Show the panel for selecting which ship types to show the ship locations for
		 */
        showOverlayFilter : function () {	        		        	
        	
            var html = "<div id='OverlayFilter'><table>";
            
            for (var i=0; i<vgap.plugins["idleObjectVisualizerPlugin"].shipTypes.length; i++) {
                
            	
                var check_text = "";
                if (vgap.plugins["idleObjectVisualizerPlugin"].shipSelection[i]) {
                	check_text = " checked";
                }
                html += "<tr><td><input type='checkbox' " + check_text + " onchange='vgap.plugins[\"idleObjectVisualizerPlugin\"].toggleFilterSelection(" + i + "); vgap.map.draw(); '></input></td><td>" + vgap.plugins["idleObjectVisualizerPlugin"].shipTypes[i] + "</td></tr>";                
            }
            html += "</table></div>";
            //$("#PlanetsMenu").append(html);
            
            var inMore = vgap.planetScreenOpen || vgap.shipScreenOpen || vgap.starbaseScreenOpen;
            if (inMore) {
                html = "<h1>Show ship locations for:</h1>" + html;
                html += "<a class='MoreBack' onclick='vgap.closeMore();vgap.more.empty();return false;'>OK</a>";
                vgap.more.empty();
                $(html).appendTo(vgap.more);
    
                $("#OverlayFilter").height($(window).height() - 100);
                vgap.showMore(300);
            }
            else {
                html = "<div class='TitleBar'><div class='CloseScreen' onclick='vgap.closeLeft();vgap.lc.empty();'></div><div class='TopTitle'>Show ship locations for:</div></div>" + html;
                vgap.lc.empty();
                $(html).appendTo(vgap.lc);
                vgap.openLeft();
                $("#OverlayFilter").height($(window).height() - 40);
                $("#OverlayFilter").width(380);
            }
            $("#OverlayFilter").jScrollPane();        
        },
        
        /**
		 * Toggle the checkbox deciding which type of ships are being displayed
		 * @param id		id of ship group to toggle
		 */
        toggleFilterSelection : function (id) {
        	
        	if (id < 0 || id >= vgap.plugins["idleObjectVisualizerPlugin"].shipSelection.length) {
        		return;
        	}
        	//console.log("Toggling: " + id);
        	
        	vgap.plugins["idleObjectVisualizerPlugin"].shipSelection[id] =! vgap.plugins["idleObjectVisualizerPlugin"].shipSelection[id];               
        	this.showOverlayFilter();
        	
        },

	}; //end idleObjectVisualizerPlugin

	// register your plugin with NU
	vgap.registerPlugin(idleObjectVisualizerPlugin, "idleObjectVisualizerPlugin");

	vgap.plugins["idleObjectVisualizerPlugin"].oldClearTools = vgapMap.prototype.clearTools;

	vgapMap.prototype.clearTools = function(result) {

		//vgap.plugins["idleObjectVisualizerPlugin"].enabled = false;
		vgap.plugins["idleObjectVisualizerPlugin"].resetIdleSelectorTools();
		
		//clear all ship filters
		for (var i=0; i<vgap.plugins["idleObjectVisualizerPlugin"].shipSelection.length; i++) {		
		  vgap.plugins["idleObjectVisualizerPlugin"].shipSelection[i] = false;
        }
		//execute the normal clearTools function
		vgap.plugins["idleObjectVisualizerPlugin"].oldClearTools.apply(this, arguments);

	};
	
	

	    
	    vgap.plugins["idleObjectVisualizerPlugin"].oldShipScan = sharedContent.prototype.shipScan;
	    sharedContent.prototype.shipScan = function (ship) {
	    	
	    	var plugin = vgap.plugins["idleObjectVisualizerPlugin"];
			
	
	        var html = "<div class='ItemSelection'>";
	        var hull = vgap.getHull(ship.hullid);
	        var html = "<div class='ItemSelection' data-id='" + ship.id + "'>";
	        
	        if (ship.ownerid == vgap.player.id && plugin.enabled && plugin.drawSelection[objectTypeEnum.SHIPS] && ship.readystatus == plugin.drawStatus) {
	        	html += "<img style='border: 1px solid " + plugin.colors[objectTypeEnum.SHIPS] + "' src='" + ship.img + "'/>";
	        } else {
	        	html += "<img style='border: 1px transparent " + plugin.colors[objectTypeEnum.SHIPS] + "' src='" + ship.img + "'/>";
	        }	    	
	        
	        var cls = "";
	        if (ship.ownerid == vgap.player.id)
	        	cls = "";
	        else if (vgap.allied(ship.ownerid))
	            cls = "AllyText";
	        else if (ship.ownerid != vgap.player.id)
	            cls = "BadText";

	        html += "<span class='" + cls + "'>" + ship.id + ": " + ship.name + "</span>";
	        html += "<span class='" + cls + "'>" + hull.name + "</span>";
	        var heading = ship.heading;
	        if (heading == -1)
	            heading = "unknown";
	        var tower = vgap.isTowTarget(ship.id);
	        if (tower != null)
	            html += "<span style='color:#990099;'>Towed by ship #" + tower.id + ": " + tower.name + "</span>";
	        else
	            html += "<span class='" + cls + "'>Heading: " + heading + " at Warp: " + ship.warp + "</span>";
	        html += "<span class='" + cls + "'>Mass: " + ship.mass + "</span>";
	        if (ship.ownerid != vgap.player.id)
	            html += "<span class='" + cls + "'>" + vgap.raceName(ship.ownerid) + "</span>";
	        html += "</div>";

	        return html;
	    };
	
	    vgap.plugins["idleObjectVisualizerPlugin"].oldAddFleetView = leftContent.prototype.addFleetView;
	    leftContent.prototype.addFleetView = function () {

	    	var plugin = vgap.plugins["idleObjectVisualizerPlugin"];
	    	
	        var obj = this.obj;

	        //Images and fleet
	        var container = $("<div id='MainFleetContainer'/>").appendTo(this.screen);
	        var mainPic = $("<img class='MainScreenPic' style='height:250px;' src='" + obj.img + "'/>").appendTo(container);
	        var fleet = $("<div id='FleetContainer' style='height: 250px;' />").appendTo(container);

	        //planet for fleet view
	        var planet = obj;
	        if (obj.planetid) { //its a starbase
	            planet = vgap.getPlanet(obj.planetid);
	            obj.x = planet.x;
	            obj.y = planet.y;
	        }
	        else if (obj.engineid) //its a ship
	            planet = vgap.planetAt(obj.x, obj.y);


            //determine if fleetview should be shown:
            //show if more than one object is present at current location, then show all objects in fleet view
            
            //get ships in location
            var showFleetView = false;
            var ships = vgap.shipsAt(obj.x, obj.y);
            var num_objects = ships.length;
            
            
            if (planet != null) { 
                num_objects++;
                
                var starbase = vgap.getStarbase(planet.id);
                if (starbase != null) {
                    num_objects++;
                }
            }
            if (num_objects > 1) {
                showFleetView = true;
            }
            
                        
            if (showFleetView) {            
                            
                //planet for fleetview
                if (planet != null) {
                	var pln;
                	//console.log("Owner: " + planet.ownerid + "==" +vgap.player.id + "," + plugin.enabled + "," + plugin.drawSelection[objectTypeEnum.PLANETS] + "," + planet.readystatus + " ==" + plugin.drawStatus);
                	if ( (planet.ownerid == vgap.player.id) && plugin.enabled && plugin.drawSelection[objectTypeEnum.PLANETS] && (planet.readystatus == plugin.drawStatus)) {
                		//pln = $("<img class='FleetPic FleetCurrent' style='border: 3px solid " + plugin.colors[objectTypeEnum.PLANETS] + "' src='" + planet.img + "'/>").appendTo(fleet); 
                        pln = $("<img class='FleetPic' style='border: 1px solid " + plugin.colors[objectTypeEnum.PLANETS] + "' src='" + planet.img + "' />").appendTo(fleet);
                        //console.log("mark planet: " + planet.img); console.log(pln);
                		
                		var border_prop = "1px solid " + plugin.colors[objectTypeEnum.PLANETS];
                		pln.css('border', border_prop);
                		//console.log("mark planet: " + planet.img); console.log(pln);
                		
        
                    } else {
                		pln = $("<img class='FleetPic' src='" + planet.img + "'/>").appendTo(fleet);
                		var border_prop = "1px transparent " + plugin.colors[objectTypeEnum.PLANETS];
                		pln.css('border', border_prop);
                    }
                    
                    if (obj.planetid || planet.ownerid == vgap.player.id) 
                        pln.tclick(function (e) { vgap.map.selectPlanet(planet.id); e.preventDefault(); });
                    else {
                        pln.tclick(function (e) { shtml.planetSurvey(planet.id); e.preventDefault(); });
                        if (vgap.allied(planet.ownerid)) 
                        	pln.addClass("FleetNeutral");	                
                        else if (planet.ownerid > 0)
                            pln.addClass("FleetBad");
                    }
                    
                    if (planet.img == obj.img)
                       pln.addClass("FleetCurrent");
                        
                }
        
                //starbase for fleet view
                if (planet != null) {
                    var starbase = vgap.getStarbase(planet.id);
                    if (starbase != null) {
                    	var img;
        	        	if (planet.ownerid == vgap.player.id && plugin.enabled && plugin.drawSelection[objectTypeEnum.BASES] && starbase.readystatus == plugin.drawStatus)
        	        		img = $("<img class='FleetPic' style='border: 1px solid "+plugin.colors[objectTypeEnum.BASES] + "' src='" + starbase.img + "' />").appendTo(fleet);
        	        	else
        	        		img = $("<img class='FleetPic' style='border: 1px transparent "+plugin.colors[objectTypeEnum.BASES] + "' src='" + starbase.img + "' />").appendTo(fleet);
        	        	
                        if (planet.ownerid == vgap.player.id)
                            img.tclick(function (e) { vgap.map.selectStarbase(planet.id); e.preventDefault();});
                            
                        if (starbase.img == obj.img)
                            img.addClass("FleetCurrent");
        
                    }
                }
        
                //ships in fleet view
                var ships = vgap.shipsAt(obj.x, obj.y);
                for (var i = 0; i < ships.length; i++) {
        
                    //don't show small ships if only one ship present
                    //if (ships.length == 1 && obj.engineid)
                    //    break;
                                      
                    var ship = ships[i];
                    
                    var img;
                	if (ship.ownerid == vgap.player.id && plugin.enabled && plugin.drawSelection[objectTypeEnum.SHIPS] && ship.readystatus == plugin.drawStatus)	        		
                		img = $("<img class='FleetPic' style='border: 1px solid "+plugin.colors[objectTypeEnum.SHIPS] + "' src='" + hullImg(ship.hullid) + "' id='" + ship.id + "' data-id='" + ship.id + "'/>").appendTo(fleet);
                	else
                		img = $("<img class='FleetPic' style='border: 1px transparent "+plugin.colors[objectTypeEnum.SHIPS] + "' src='" + hullImg(ship.hullid) + "' id='" + ship.id + "' data-id='" + ship.id + "'/>").appendTo(fleet);
                		            
                    var hover = function (id) { return function () { vgap.showHover(id); }; }; //closure
        
                    img.mouseover(hover(ship.id));
                    img.mouseout(function () { vgap.hideHover(); });
                    if (ships[i].ownerid != vgap.player.id) {
                        img.tclick(function (e) { shtml.shipSurvey($(this).data("id")); e.preventDefault(); });
                        if (vgap.allied(ships[i].ownerid))
                            img.addClass("FleetNeutral");
                        else
                            img.addClass("FleetBad");
                    }
                    else {
                        img.tclick(function (e) { vgap.map.selectShip($(this).data("id")); e.preventDefault(); });
                        if (obj.engineid && obj.id == ship.id)
                            img.addClass("FleetCurrent");	                    
                    }
                }
            }
	        this.showFleetTowing();

	        var numItems = ships.length;
	        if (starbase != null)
	            numItems++;
	        if (planet != null)
	            numItems++;

	        this.picSize(mainPic, numItems);
	        fleet.height(mainPic.height());
	    };
	
	
	

} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
document.body.removeChild(script);
