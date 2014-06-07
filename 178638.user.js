// ==UserScript==
// @name          Planets.nu - Sorted Lists
// @description   Allows the user to sort ships/planets/starbases 
// @version       0.1
// @date          2013-09-26
// @author        Lord Helmet
// @include       http://planets.nu/#/*
// @include       http://*.planets.nu/*
// @include       http://test.planets.nu/*
// @resource      userscript https://userscripts.org/scripts/source/178638.meta.js
// @updateURL     https://userscripts.org/scripts/source/178638.meta.js
// @downloadURL   https://userscripts.org/scripts/source/178638.user.js
// @history       0.1    Initial release
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
	var sortlist = {
			/*
			 * processload: executed whenever a turn is loaded: either the current turn or
			 * an older turn through time machine 
			 */
			processload: function() {
				$("#rNavState").tclick(function() { vgap.plugins["sortlist"].openOptions(); });
				console.log("ProcessLoad: sortlist called.");
			},	
			
			/*
			 * loaddashboard: executed to rebuild the dashboard content after a turn is loaded
			 */
			loaddashboard: function() {
				console.log("LoadDashboard: sortlist called.");
			},

			/*
			 * showdashboard: executed when switching from starmap to dashboard
			 */
			showdashboard: function() {
				console.log("ShowDashboard: sortlist called.");
			},
			
			/*
			 * showsummary: executed when returning to the main screen of the dashboard
			 */
			showsummary: function() {
				console.log("ShowSummary: sortlist called.");
			},
			
			/*
			 * loadmap: executed after the first turn has been loaded to create the map
			 * as far as I can tell not executed again when using time machine
			 */
			loadmap: function() {
				console.log("LoadMap: sortlist called.");
			},
			
			/*
			 * showmap: executed when switching from dashboard to starmap
			 */
			showmap: function() {
				console.log("ShowMap: sortlist called.");
			},
			
			/*
			 * draw: executed on any click or drag on the starmap
			 */			
			draw: function() {
				console.log("Draw: sortlist called.");
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
				console.log("LoadPlanet: sortlist called.");
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
				console.log("LoadStarbase: sortlist called.");
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
				console.log("LoadShip: sortlist called.");
				console.log("Ship id: " + vgap.shipScreen.ship.id);
				
				// var buttons = new Array();
		        // buttons.push({ name: "NewButton", onclick: function () { console.log("huiii"); } });
				// vgap.shipScreen.screen.addSection("ShipOrders2", "Test", buttons, function () { console.log("ShipOrders2 just happened"); });
			},
			openOptions: function() {
				var win = html.get("ListOptions", vgap.plugins["sortlist"].options);
				vgap.plugins["sortlist"].saveOptions=false;
				nu.modal(win, "Sort List", "300px", false);
				win.save.tclick(function() {  vgap.plugins["sortlist"].saveOptions=true; vgap.plugins["sortlist"].sort("planet", $("input:radio[name='chosenOption']:checked").val()); nu.closemodal(); });
				win.cancel.tclick(function() {  vgap.plugins["sortlist"].saveOptions=false; nu.closemodal(); });
			},
			options: {
				"ship" : new Array(),
				"planet" : new Array( 
					{ "id": 1, "name":"Native Type", "sort": function(a,b){return (a.nativetype-b.nativetype);} },
					{ "id": 2, "name":"Native Clans", "sort": function(a,b){return (a.nativeclans-b.nativeclans);} }
					),
				"starbase" : new Array()
			},
			sort: function (type, id) {
				var objId=vgap.rNavArray[vgap.rNavIndex].id;
					vgap.rNavArray.sort(vgap.getArray(vgap.plugins["sortlist"].options[type],id).sort);
				for (var i=0; i< vgap.rNavArray.length; i++) {
					if (vgap.rNavArray[i].id==objId) {
						vgap.rNavIndex=i;
						break;
					}
				}
				vgap.showRNavState();
			}
			
	};
		
	// register your plugin with NU
	vgap.registerPlugin(sortlist, "sortlist");

	
html["ListOptions"] = "<div id=\"ecleantable\">    <table class=\"ecleantable\" style=\"width:100%;\"><thead><tr><th>Select</th><th align='left'>Sort by</th></tr></thead> <tbody>{{#planet}}<tr><td align='center'><input type='radio' name='chosenOption' value='{{id}}'></td><td align='left'>{{name}}</td></tr>{{/planet}}</tbody></table><div style=\"margin: 20px 0 0 0;\">        <span id=\"esave\" class=\"elargebutton esave\">{{t.save}}</span>        <span id=\"ecancel\" class=\"elargebutton enav\">{{t.cancel}}</span></div>";	

	
/*
vgap.plugins["sortlist"].openOptions()
$("#rNavState").tclick(function() { vgap.plugins["sortlist"].openOptions() });
*/
	
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);