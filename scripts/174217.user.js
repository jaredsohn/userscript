// ==UserScript==
// @name          Planets.nu - Sensor Range Plugin
// @description   Plugin for Planets.nu which allows to visualize the sensor range of ships and planets on the starmap
// @version       0.21
// @date          2014-04-09
// @author        kedalion
// @include       http://planets.nu/*
// @include       http://play.planets.nu/*
// @include       http://test.planets.nu/*
// @resource      userscript https://userscripts.org/scripts/source/174217.meta.js
// @updateURL     https://userscripts.org/scripts/source/174217.meta.js
// @downloadURL   https://userscripts.org/scripts/source/174217.user.js
// @homepage      http://planets.nu/discussion/utility-script-sensor-range-plugin

// ==/UserScript==

/*
Changelog
0.21    Added support for Dark Sense (created by Arcanix) [2014-04-09] 
0.20 	Fixed a bug which made sensor range include all planets [2013-08-11]
0.19    Change sensor range to ignore Safe Passage [2013-08-02]
0.18    Removed bug causing Firefox to show everything washed out [2013-08-01]
0.17    Added additional enemy sensor range view [2013-07-30]
0.15    Changed the sensor range display to joint area instead of individual circles [2013-07-29]
0.14    Added hotkey 'x' support [2013-07-25]
0.13    Fixed button behavior (time machine) [2013-07-25]
0.12    Minor fixes, ensure settings stay through turn changes (time machine) [2013-07-25]
0.11    Initial release [2013-07-25]
*/

function wrapper () { // wrapper for injection
    
	if (vgap.version < 3.0) {
		console.log("Sensor Range plugin requires at least NU version 3.0. Plugin disabled." );
		return;	
	}
	
	var plugin_version = 0.21;
   
    console.log("Sensor Range plugin version: v" + plugin_version );
	
	
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
	var sensorRangePlugin = {
			
			/*
			 * processload: executed whenever a turn is loaded: either the current turn or
			 * an older turn through time machine 
			 */
			processload: function() {
				//console.log("ProcessLoad: plugin called.");
				
				//check if plugin data is for current game
				if (vgap.plugins["sensorRangePlugin"].gameid != vgap.gameId) {
					vgap.plugins["sensorRangePlugin"].reset();
				}
			},	
			
			/*
			 * loaddashboard: executed to rebuild the dashboard content after a turn is loaded
			 */
			loaddashboard: function() {
				//console.log("LoadDashboard: plugin called.");
			},

			/*
			 * showdashboard: executed when switching from starmap to dashboard
			 */
			showdashboard: function() {
				//console.log("ShowDashboard: plugin called.");
			},
			
			/*
			 * showsummary: executed when returning to the main screen of the dashboard
			 */
			showsummary: function() {
				//console.log("ShowSummary: plugin called.");
			},
			
			/*
			 * loadmap: executed after the first turn has been loaded to create the map
			 * as far as I can tell not executed again when using time machine
			 */
			loadmap: function() {
				//console.log("LoadMap: plugin called.");
				vgap.plugins["sensorRangePlugin"].reset();
				
				vgap.plugins["sensorRangePlugin"].addMapTool("Sensor Range", "ShowMinerals", "sensorrange", function () { 
					
					if (vgap.plugins["sensorRangePlugin"].enabled) {
						if (vgap.plugins["sensorRangePlugin"].mode == 0) {
							vgap.plugins["sensorRangePlugin"].enabled = false;									
						}
					} else {
						vgap.plugins["sensorRangePlugin"].enabled = true;
					}
					vgap.plugins["sensorRangePlugin"].mode = 0;
					
					vgap.plugins["sensorRangePlugin"].syncButtons();
					vgap.map.draw();	
					
				});
				vgap.plugins["sensorRangePlugin"].addMapTool("MineDetectRange", "ShowMinerals", "minedetectrange", function () {  
					if (vgap.plugins["sensorRangePlugin"].enabled) {
						if (vgap.plugins["sensorRangePlugin"].mode == 1) {
							vgap.plugins["sensorRangePlugin"].enabled = false;							
						}
					} else {
						vgap.plugins["sensorRangePlugin"].enabled = true;
					}
					vgap.plugins["sensorRangePlugin"].mode = 1;
						
					vgap.plugins["sensorRangePlugin"].syncButtons();
					vgap.map.draw();	
					
				});
				
				vgap.plugins["sensorRangePlugin"].addMapTool("EnemySense", "ShowMinerals", "enemysensorrange", function () {  
					if (vgap.plugins["sensorRangePlugin"].enabled) {
						if (vgap.plugins["sensorRangePlugin"].mode == 2) {
							vgap.plugins["sensorRangePlugin"].enabled = false;
						}	
					} else {
						vgap.plugins["sensorRangePlugin"].enabled = true;
					
					}
					vgap.plugins["sensorRangePlugin"].mode = 2;							
					
					vgap.plugins["sensorRangePlugin"].syncButtons();
					vgap.map.draw();	
					
				});
				
				if (vgap.player.raceid == 8) {
                    vgap.plugins["sensorRangePlugin"].addMapTool("Dark Sense", "ShowMinerals", "darksenserange", function () {  
                        if (vgap.plugins["sensorRangePlugin"].enabled) {
                            if (vgap.plugins["sensorRangePlugin"].mode == 3) {
                                vgap.plugins["sensorRangePlugin"].enabled = false;
                            }	
                        } else {
                            vgap.plugins["sensorRangePlugin"].enabled = true;
                        
                        }
                        vgap.plugins["sensorRangePlugin"].mode = 3;							
                        
                        vgap.plugins["sensorRangePlugin"].syncButtons();
                        vgap.map.draw();	
                        
                    });
                }
	
			},
			
			/*
			 * showmap: executed when switching from dashboard to starmap
			 */
			showmap: function() {
				//console.log("ShowMap: plugin called.");
			},
			
			/*
			 * draw: executed on any click or drag on the starmap
			 */			
			draw: function() {
				//console.log("Draw: plugin called.");
								
				if (vgap.plugins["sensorRangePlugin"].enabled) {
								
					if (vgap.plugins["sensorRangePlugin"].mode == 0) {
						var ctx = vgap.map.ctx;
							
						//ctx.clearRect(0, 0, vgap.map.canvas.width, vgap.map.canvas.height);	
						//ctx.globalAlpha = 0.2;
						vgap.plugins["sensorRangePlugin"].showSensorRange();
						//ctx.globalAlpha = 1.0;
						//vgap.plugins["sensorRangePlugin"].drawEssentials(false, ctx, false);					
						
					} else if (vgap.plugins["sensorRangePlugin"].mode == 2) {
						var ctx = vgap.map.ctx;
												
						vgap.plugins["sensorRangePlugin"].showEnemySensorRange();
					} else if (vgap.plugins["sensorRangePlugin"].mode == 3) { 
                        vgap.plugins["sensorRangePlugin"].showDarkSenseRange();
					} else {
						vgap.plugins["sensorRangePlugin"].showMineDetectRange();
					}			
				}
				
			},		
			
			/*
			 * loadplanet: executed a planet is selected on dashboard or starmap
			 */
			loadplanet: function() {
				//console.log("LoadPlanet: plugin called.");
			},
			
			/*
			 * loadstarbase: executed a planet is selected on dashboard or starmap
			 */
			loadstarbase: function() {
				//console.log("LoadStarbase: plugin called.");
			},
			
			/*
			 * loadship: executed a planet is selected on dashboard or starmap
			 */
			loadship: function() {
				//console.log("LoadShip: plugin called.");
			},
			
			version: plugin_version,			
			enabled: false,
			mode: 0,  //0: range to detect ships and planets, 1: range of minefield detection, 2: Enemy Sensor Range, 3: Dark Sense
			gameid: -1,
			oldClearTools: null,
			canvas_shipscan: null,
			canvas_planetscan: null,

			
			reset: function () {	
				
				//reset plugin settings 			
				this.enabled = false;
				this.mode = 0;
				this.gameid = vgap.gameId;			
								
				//make sure the buttons represent the actual plugin state				
				this.syncButtons();
				
			},
			
			syncButtons: function () {
		
				//make sure the buttons represent the actual plugin state
				if (document.getElementById("sensorrange") != null) {
					var sensor_on = (document.getElementById("sensorrange").className.indexOf("selectedmaptool") != -1);
				
					if ((sensor_on && !this.enabled) || (!sensor_on && this.enabled && this.mode == 0) || (sensor_on && this.enabled && this.mode != 0)) {
						$('#sensorrange').toggleClass("selectedmaptool");
					}				
				}
				
				
				if (document.getElementById("minedetectrange") != null) {
					var mine_on = (document.getElementById("minedetectrange").className.indexOf("selectedmaptool") != -1);
					
					if ((mine_on && !this.enabled) || (!mine_on && this.enabled && this.mode == 1) || (mine_on && this.enabled && this.mode != 1)) {
						$('#minedetectrange').toggleClass("selectedmaptool");
					}	
				}
				
				if (document.getElementById("enemysensorrange") != null) {
					var enemy_on = (document.getElementById("enemysensorrange").className.indexOf("selectedmaptool") != -1);
					
					if ((enemy_on && !this.enabled) || (!enemy_on && this.enabled && this.mode == 2) || (enemy_on && this.enabled && this.mode != 2)) {
						$('#enemysensorrange').toggleClass("selectedmaptool");
					}	
				}
               
                if (document.getElementById("darksenserange") != null) {
					var dark_on = (document.getElementById("darksenserange").className.indexOf("selectedmaptool") != -1);
					
					if ((dark_on && !this.enabled) || (!dark_on && this.enabled && this.mode == 3) || (dark_on && this.enabled && this.mode != 3)) {
						$('#darksenserange').toggleClass("selectedmaptool");
					}	
				}
				
			},
			
			
			
			
			addMapTool: function (text, cls, id, onclick) {
		        
		        $("<li class='" + cls + "' id='" + id + "'>" + text + "</li>").tclick(onclick).appendTo("#MapTools");
		    },

			/**
			 * Determine if the player has an agreement with another player which will give him information.
			 * Requires at least 'share intel' from the other player.
			 * @param 	int id of target player
			 * @return  bool true if player is delivering information
			 */
		 	receiveInfoFrom: function (fromId) {
				var relation = vgap.getRelation(fromId);
				if (relation == null)
					return false;
				return relation.relationfrom >= 3;
			},

		    
			/**
			 * Draw the sensor range circles around own and allied ships and planets. Two different colors are used for
			 * ship and planet scan range. Planetscanrange is omitted if set to infinity (not explore map setting)			 
			 */
			showEnemySensorRange: function () {
				
				if (this.canvas_planetscan == null) {
					this.canvas_planetscan = document.createElement("canvas");
				}
		        this.canvas_planetscan.width = vgap.map.canvas.width;
        		this.canvas_planetscan.height = vgap.map.canvas.height;
		        var ctx_planetscan = this.canvas_planetscan.getContext("2d");
				ctx_planetscan.clearRect(0, 0, vgap.map.canvas.width, vgap.map.canvas.height);	
				
				var color_planetscan = "#FF8000";	
				var alpha_planetscan = 1.0;
				
				if (this.canvas_shipscan == null) {
					this.canvas_shipscan = document.createElement("canvas");
				}
		        this.canvas_shipscan.width = vgap.map.canvas.width;
        		this.canvas_shipscan.height = vgap.map.canvas.height;
		        var ctx_shipscan = this.canvas_shipscan.getContext("2d");
				ctx_shipscan.clearRect(0, 0, vgap.map.canvas.width, vgap.map.canvas.height);
					    		
				var color_shipscan = "#F5D0A9";								
				var alpha_shipscan = 1.0;
									   
				//var ctx = vgap.map.ctx; 
				//ctx.globalAlpha = 0.1;
				
				for (var i = 0; i < vgap.ships.length; i++) {
					var ship = vgap.ships[i];
												        
					//skip ship if owned by player or ally/neutral -> we want enemies
					if (ship.ownerid == vgap.player.id || (vgap.allied(ship.ownerid) && vgap.alliedTo(ship.ownerid))) {
						continue;	
					}

					//draw a circle for planet visibility around each ship
					if (vgap.settings.planetscanrange < 10000) {

						//console.log("ship #" + ship.id + " planet range");
						
						//check if area is visible
						if (vgap.map.isVisible(ship.x, ship.y, vgap.settings.planetscanrange)) {							
													
							//ctx_planetscan.strokeStyle = colorToRGBA(color_planetscan, alpha_planetscan);
							//ctx_planetscan.lineWidth = 2;
							ctx_planetscan.fillStyle = colorToRGBA(color_planetscan, alpha_planetscan);
							ctx_planetscan.beginPath();
							ctx_planetscan.arc(vgap.map.screenX(ship.x), vgap.map.screenY(ship.y), vgap.settings.planetscanrange * vgap.map.zoom, 0, Math.PI * 2, false);
							ctx_planetscan.closePath();
							ctx_planetscan.fill();
							//ctx_planetscan.stroke();									
						}					
					}
					
					//draw a circle for ship visibility around each ship
					
					//check if area is visible
					if (vgap.map.isVisible(ship.x, ship.y, vgap.settings.shipscanrange)) {						
						
						//console.log("ship #" + ship.id + " ship range");
															
						//ctx_shipscan.strokeStyle = colorToRGBA(color_shipscan, alpha_shipscan);
						//ctx_shipscan.lineWidth = 2;
						ctx_shipscan.fillStyle = colorToRGBA(color_shipscan, alpha_shipscan);
						ctx_shipscan.beginPath();
						ctx_shipscan.arc(vgap.map.screenX(ship.x), vgap.map.screenY(ship.y), vgap.settings.shipscanrange * vgap.map.zoom, 0, Math.PI * 2, false);
						ctx_shipscan.closePath();
						ctx_shipscan.fill();
						//ctx_shipscan.stroke();							
					}					
				}
				
				
				for (var i = 0; i < vgap.planets.length; i++) {
					var planet = vgap.planets[i];
												        
					//skip planet if not owned by player or ally/neutral 
					if (planet.ownerid == vgap.player.id || (vgap.allied(planet.ownerid) && vgap.alliedTo(planet.ownerid))) {
						continue;	
					}

					//skip unowned planets
					if (planet.ownerid == 0 ) {
						continue;	
					}
					
					//draw a circle for planet visibility around each ship
					if (vgap.settings.planetscanrange < 10000) {

						//console.log("planet #" + planet.id + " planet range");
						
						//check if area is visible
						if (vgap.map.isVisible(planet.x, planet.y, vgap.settings.planetscanrange)) {							
													
							//ctx_planetscan.strokeStyle = colorToRGBA(color_planetscan, alpha_planetscan);
							//ctx_planetscan.lineWidth = 3;
							ctx_planetscan.fillStyle = colorToRGBA(color_planetscan, alpha_planetscan);
							ctx_planetscan.beginPath();
							ctx_planetscan.arc(vgap.map.screenX(planet.x), vgap.map.screenY(planet.y), vgap.settings.planetscanrange * vgap.map.zoom, 0, Math.PI * 2, false);
							ctx_planetscan.closePath();
							ctx_planetscan.fill();
							//ctx_planetscan.stroke();									
						}					
					}
					
					//draw a circle for ship visibility around each planet
					
					//check if area is visible
					if (vgap.map.isVisible(planet.x, planet.y, vgap.settings.shipscanrange)) {						
						
						//console.log("planet #" + planet.id + " ship range");
						
						
						//ctx_shipscan.strokeStyle = colorToRGBA(color_shipscan, alpha_shipscan);
						//ctx_shipscan.lineWidth = 3;
						ctx_shipscan.fillStyle = colorToRGBA(color_shipscan, alpha_shipscan);
						ctx_shipscan.beginPath();
						ctx_shipscan.arc(vgap.map.screenX(planet.x), vgap.map.screenY(planet.y), vgap.settings.shipscanrange * vgap.map.zoom, 0, Math.PI * 2, false);
						ctx_shipscan.closePath();
						ctx_shipscan.fill();
						//ctx_shipscan.stroke();							
					}					
				}
								
				
				
				vgap.map.ctx.globalAlpha = 0.2;
				
				if ( vgap.settings.planetscanrange == 10000 ) {
					//console.log("shipscan only1");
					vgap.map.ctx.drawImage(this.canvas_shipscan, 0, 0);	
					//console.log("shipscan only2");
				} else if (vgap.settings.shipscanrange > vgap.settings.planetscanrange) {
					//console.log("shipsscan first1");
					ctx_shipscan.drawImage(this.canvas_planetscan, 0, 0);
					vgap.map.ctx.drawImage(this.canvas_shipscan, 0, 0);
					//console.log("shipsscan first2");
					
				} else {
					//console.log("shipsscan last1");
					ctx_planetscan.drawImage(this.canvas_shipscan, 0, 0);
					vgap.map.ctx.drawImage(this.canvas_planetscan, 0, 0);
					//console.log("shipsscan last2");
					
				}				
				vgap.map.ctx.globalAlpha = 1.0;
							    
			}, 
		    
		    
			/**
			 * Draw the sensor range circles around own and allied ships and planets. Two different colors are used for
			 * ship and planet scan range. Planetscanrange is omitted if set to infinity (not explore map setting)			 
			 */
			showSensorRange: function () {
				
				if (this.canvas_planetscan == null) {
					this.canvas_planetscan = document.createElement("canvas");
				}
		        this.canvas_planetscan.width = vgap.map.canvas.width;
        		this.canvas_planetscan.height = vgap.map.canvas.height;
		        var ctx_planetscan = this.canvas_planetscan.getContext("2d");
				ctx_planetscan.clearRect(0, 0, vgap.map.canvas.width, vgap.map.canvas.height);	
				
				var color_planetscan = "#FF8000";	
				var alpha_planetscan = 1.0;
				
				if (this.canvas_shipscan == null) {
					this.canvas_shipscan = document.createElement("canvas");
				}
		        this.canvas_shipscan.width = vgap.map.canvas.width;
        		this.canvas_shipscan.height = vgap.map.canvas.height;
		        var ctx_shipscan = this.canvas_shipscan.getContext("2d");
				ctx_shipscan.clearRect(0, 0, vgap.map.canvas.width, vgap.map.canvas.height);
					    		
				var color_shipscan = "#F5D0A9";								
				var alpha_shipscan = 1.0;
									   
				//var ctx = vgap.map.ctx; 
				//ctx.globalAlpha = 0.1;
				
				for (var i = 0; i < vgap.ships.length; i++) {
					var ship = vgap.ships[i];
												        
					//skip ship if not owned by player or ally
					if (ship.ownerid != vgap.player.id && !this.receiveInfoFrom(ship.ownerid)) { //   (vgap.allied(ship.ownerid) && vgap.alliedTo(ship.ownerid))) {
						continue;	
					}

					//draw a circle for planet visibility around each ship
					if (vgap.settings.planetscanrange < 10000) {

						//console.log("ship #" + ship.id + " planet range");
						
						//check if area is visible
						if (vgap.map.isVisible(ship.x, ship.y, vgap.settings.planetscanrange)) {							
													
							//ctx_planetscan.strokeStyle = colorToRGBA(color_planetscan, alpha_planetscan);
							//ctx_planetscan.lineWidth = 2;
							ctx_planetscan.fillStyle = colorToRGBA(color_planetscan, alpha_planetscan);
							ctx_planetscan.beginPath();
							ctx_planetscan.arc(vgap.map.screenX(ship.x), vgap.map.screenY(ship.y), vgap.settings.planetscanrange * vgap.map.zoom, 0, Math.PI * 2, false);
							ctx_planetscan.closePath();
							ctx_planetscan.fill();
							//ctx_planetscan.stroke();									
						}					
					}
					
					//draw a circle for ship visibility around each ship
					
					//check if area is visible
					if (vgap.map.isVisible(ship.x, ship.y, vgap.settings.shipscanrange)) {						
						
						//console.log("ship #" + ship.id + " ship range");
															
						//ctx_shipscan.strokeStyle = colorToRGBA(color_shipscan, alpha_shipscan);
						//ctx_shipscan.lineWidth = 2;
						ctx_shipscan.fillStyle = colorToRGBA(color_shipscan, alpha_shipscan);
						ctx_shipscan.beginPath();
						ctx_shipscan.arc(vgap.map.screenX(ship.x), vgap.map.screenY(ship.y), vgap.settings.shipscanrange * vgap.map.zoom, 0, Math.PI * 2, false);
						ctx_shipscan.closePath();
						ctx_shipscan.fill();
						//ctx_shipscan.stroke();							
					}					
				}
				
				
				for (var i = 0; i < vgap.planets.length; i++) {
					var planet = vgap.planets[i];
												        
					//skip planet if not owned by player or ally
					if (planet.ownerid != vgap.player.id &&  !this.receiveInfoFrom(planet.ownerid)) { //!(vgap.allied(planet.ownerid) && vgap.alliedTo(planet.ownerid))) {
						continue;	
					}

					//draw a circle for planet visibility around each ship
					if (vgap.settings.planetscanrange < 10000) {

						//console.log("planet #" + planet.id + " planet range");
						
						//check if area is visible
						if (vgap.map.isVisible(planet.x, planet.y, vgap.settings.planetscanrange)) {							
													
							//ctx_planetscan.strokeStyle = colorToRGBA(color_planetscan, alpha_planetscan);
							//ctx_planetscan.lineWidth = 3;
							ctx_planetscan.fillStyle = colorToRGBA(color_planetscan, alpha_planetscan);
							ctx_planetscan.beginPath();
							ctx_planetscan.arc(vgap.map.screenX(planet.x), vgap.map.screenY(planet.y), vgap.settings.planetscanrange * vgap.map.zoom, 0, Math.PI * 2, false);
							ctx_planetscan.closePath();
							ctx_planetscan.fill();
							//ctx_planetscan.stroke();									
						}					
					}
					
					//draw a circle for ship visibility around each planet
					
					//check if area is visible
					if (vgap.map.isVisible(planet.x, planet.y, vgap.settings.shipscanrange)) {						
						
						//console.log("planet #" + planet.id + " ship range");
						
						
						//ctx_shipscan.strokeStyle = colorToRGBA(color_shipscan, alpha_shipscan);
						//ctx_shipscan.lineWidth = 3;
						ctx_shipscan.fillStyle = colorToRGBA(color_shipscan, alpha_shipscan);
						ctx_shipscan.beginPath();
						ctx_shipscan.arc(vgap.map.screenX(planet.x), vgap.map.screenY(planet.y), vgap.settings.shipscanrange * vgap.map.zoom, 0, Math.PI * 2, false);
						ctx_shipscan.closePath();
						ctx_shipscan.fill();
						//ctx_shipscan.stroke();							
					}					
				}
								
				vgap.map.ctx.globalAlpha = 0.2;
			
				if ( vgap.settings.planetscanrange == 10000 ) {
					vgap.map.ctx.drawImage(this.canvas_shipscan, 0, 0);						
				} else if (vgap.settings.shipscanrange > vgap.settings.planetscanrange) {
					ctx_shipscan.drawImage(this.canvas_planetscan, 0, 0);
					vgap.map.ctx.drawImage(this.canvas_shipscan, 0, 0);					
				} else {
					ctx_planetscan.drawImage(this.canvas_shipscan, 0, 0);
					vgap.map.ctx.drawImage(this.canvas_planetscan, 0, 0);					
				}
						
				vgap.map.ctx.globalAlpha = 1.0;
							    
			}, 
			
			/**
			 * Draw the mine detection range circles around own ships that have mission 'mine sweep' set.
			 */
			showMineDetectRange: function () {
				//console.log("show mine detect range");
				
				var ctx = vgap.map.ctx; 
				
				var minefield_detect_range = 200;
				
				for (var i = 0; i < vgap.ships.length; i++) {
					var ship = vgap.ships[i];
												        
					//skip ship if not owned by player 
					if (ship.ownerid != vgap.player.id) { // && !(vgap.allied(ship.ownerid) && vgap.alliedTo(ship.ownerid))) {
						continue;	
					}
					
					var alpha = 0.2;
					var color = "#81F7F3";
					
					if (ship.mission != 1) {
						continue;	
						//alpha = 0.05;
						//color = "#F7FE2E";
					}
					
					//draw a circle for ship visibility around each ship
					
					//check if area is visible
					if (vgap.map.isVisible(ship.x, ship.y, minefield_detect_range)) {						
						
						//console.log("ship #" + ship.id + " mine range");
											
						ctx.strokeStyle = colorToRGBA(color, 0.4);
						ctx.lineWidth = 2;
						ctx.fillStyle = colorToRGBA(color, alpha);
						ctx.beginPath();
						ctx.arc(vgap.map.screenX(ship.x), vgap.map.screenY(ship.y), minefield_detect_range * vgap.map.zoom, 0, Math.PI * 2, false);
						ctx.closePath();
						//ctx.fill();
						ctx.stroke();							
					}					
				}				
			},
			
			/**
			 * Draw the dark sense range circles around own ships that have mission 'dark sense' set.
			 */
			showDarkSenseRange: function () {
				//console.log("show dark sense range");
				
                if (vgap.player.raceid != 8) { return; }
                
				var ctx = vgap.map.ctx; 
				
				var darksense_range = 200;
				
				for (var i = 0; i < vgap.ships.length; i++) {
					var ship = vgap.ships[i];	        
					//skip ship if not owned by player 
					if (ship.ownerid != vgap.player.id) { // && !(vgap.allied(ship.ownerid) && vgap.alliedTo(ship.ownerid))) {
						continue;	
					}
					
					var alpha = 0.2;
					var color = "#909090";
					
					if (ship.mission != 8) {
						continue;
					}
					
					//draw a circle for ship visibility around each ship
					
					//check if area is visible
					if (vgap.map.isVisible(ship.x, ship.y, darksense_range)) {						
						
						//console.log("ship #" + ship.id + " mine range");
											
						ctx.strokeStyle = colorToRGBA(color, 0.4);
						ctx.lineWidth = 2;
						ctx.fillStyle = colorToRGBA(color, alpha);
						ctx.beginPath();
						ctx.arc(vgap.map.screenX(ship.x), vgap.map.screenY(ship.y), darksense_range * vgap.map.zoom, 0, Math.PI * 2, false);
						ctx.closePath();
						//ctx.fill();
						ctx.stroke();							
					}					
				}				
			}
						
	};
	
	// register your plugin with NU
	vgap.registerPlugin(sensorRangePlugin, "sensorRangePlugin");

	
	/**
	 * Overload the clearTools function in order to be able to
	 * disable the sensor range map through hotkey 'x' 
	 */	
	vgap.plugins["sensorRangePlugin"].oldClearTools = vgapMap.prototype.clearTools;
	
	vgapMap.prototype.clearTools = function(result) {
		
		vgap.plugins["sensorRangePlugin"].enabled = false;
		vgap.plugins["sensorRangePlugin"].syncButtons();
		
		//execute the normal clearTools function
		vgap.plugins["sensorRangePlugin"].oldClearTools.apply(this,arguments);
				
	};
	
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
document.body.removeChild(script);
