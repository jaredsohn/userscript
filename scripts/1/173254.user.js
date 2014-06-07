// ==UserScript==
// @name          Planets.nu - NU Plugin Template
// @description   Plugin template for planets.nu client version 3
// @version       1.01
// @date          2013-07-20
// @author        kedalion
// @include       http://planets.nu/#/*
// @include       http://play.planets.nu/*
// @include       http://test.planets.nu/*
// @resource      userscript https://userscripts.org/scripts/source/173254.meta.js
// @updateURL     https://userscripts.org/scripts/source/173254.meta.js
// @downloadURL   https://userscripts.org/scripts/source/173254.user.js
// @history       1.01   Added more info to the load functions for planets, starbase, ship [2013-07-20]
// @history       1.0    Initial release [2013-07-14]
// ==/UserScript==


function wrapper () { // wrapper for injection
    
	
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
	var myCustomPlugin = {
			
			/*
			 * processload: executed whenever a turn is loaded: either the current turn or
			 * an older turn through time machine 
			 */
			processload: function() {
				console.log("ProcessLoad: plugin called.");
			},	
			
			/*
			 * loaddashboard: executed to rebuild the dashboard content after a turn is loaded
			 */
			loaddashboard: function() {
				console.log("LoadDashboard: plugin called.");
			},

			/*
			 * showdashboard: executed when switching from starmap to dashboard
			 */
			showdashboard: function() {
				console.log("ShowDashboard: plugin called.");
			},
			
			/*
			 * showsummary: executed when returning to the main screen of the dashboard
			 */
			showsummary: function() {
				console.log("ShowSummary: plugin called.");
			},
			
			/*
			 * loadmap: executed after the first turn has been loaded to create the map
			 * as far as I can tell not executed again when using time machine
			 */
			loadmap: function() {
				console.log("LoadMap: plugin called.");
			},
			
			/*
			 * showmap: executed when switching from dashboard to starmap
			 */
			showmap: function() {
				console.log("ShowMap: plugin called.");
			},
			
			/*
			 * draw: executed on any click or drag on the starmap
			 */			
			draw: function() {
				console.log("Draw: plugin called.");
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
				console.log("LoadPlanet: plugin called.");
				console.log("Planet id: " + vgap.planetScreen.planet.id);
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
				console.log("LoadStarbase: plugin called.");
				console.log("Starbase id: " + vgap.starbaseScreen.starbase.id + " on planet id: " + vgap.starbaseScreen.planet.id);
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
				console.log("LoadShip: plugin called.");
				console.log("Ship id: " + vgap.shipScreen.ship.id);
				
				var buttons = new Array();
		        buttons.push({ name: "NewButton", onclick: function () { console.log("huiii"); } });
				vgap.shipScreen.screen.addSection("ShipOrders2", "Test", buttons, function () { console.log("ShipOrders2 just happened"); });
			}			
			
	};
		
	// register your plugin with NU
	vgap.registerPlugin(myCustomPlugin, "nameOfMyPlugin");
	
	
	
	
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
