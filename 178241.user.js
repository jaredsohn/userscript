// ==UserScript==
// @name          Planets.nu - Minefield Fader Plugin
// @description   Adds a map tool to show options for hiding/dimming minefields
// @include       http://planets.nu/*
// @version 0.1
// ==/UserScript==

/*
NOTES:
1.  Only works in planets.nu version 3+
  
2.  After changing fader settings, map may be slow to respond at first as new background tiles are cached, particularly when zomming.

3. Becuase minefield preview and ship history are drawn in the same function, the ship history will also be hidden or dimmed when minefield preview is being displayed.
*/

function wrapper () { // wrapper for injection
if (vgap.version < 3) return; 

// NEW VERSION
else {
    
    var old_draw = vgapShipScreen.prototype.draw;
    vgapShipScreen.prototype.draw = function () {
    
        if (this.ship.mission == 2 || (this.ship.mission == 8 && vgap.player.raceid == 7) || this.ship.mission == 1 || vgap.minepreview) {
            
             if (vgap.map.showminefields && vgap.map.minefieldalpha > 0) {
                
                vgap.map.ctx.globalAlpha = vgap.map.minefieldalpha;
                old_draw.apply(this, arguments);
                vgap.map.ctx.globalAlpha = 1;
            
            }
        }
        else old_draw.apply(this, arguments);
        
    }    
    
    var old_drawMinefield = vgapMap.prototype.drawMinefield;
    vgapMap.prototype.drawMinefield = function (x, y, color, rad, ctx) {
//        console.log("IN");
        if (vgap.map.showminefields && vgap.map.minefieldalpha > 0) {
//            console.log("INmore");
            ctx.globalAlpha = this.minefieldalpha;
            old_drawMinefield.apply(this, arguments);
            ctx.globalAlpha = 1;
        
        }
    }
    
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
                vgap.plugins.MinefieldFader.clearFader();
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
				vgap.map.showminefields = true;
				vgap.map.minefieldalpha = 1;
				vgap.map.addMapTool("Minefield Fader", "ShowMinerals", function () {
				    
				    var html = "<li id='MinefieldFader'>";
				    html    += "Show: <input id='MFCheck' type='checkbox' onchange='vgap.map.showminefields=$(\"#MFCheck\").prop(\"checked\");vgap.plugins.MinefieldFader.fadersAdjusted();'" + (vgap.map.showminefields ? " checked" : "") + ">";
				    html    += "<input id='MFSlider' type='range' min=0 max=100 step=1 onchange='vgap.map.minefieldalpha=$(\"#MFSlider\").val()/100;vgap.plugins.MinefieldFader.fadersAdjusted();' value=" + Math.round(vgap.map.minefieldalpha * 100) + ">";
				    html    += "<input id='MFText' type='number' min=0 max=100 step=1 size=3 onchange='vgap.map.minefieldalpha=$(\"#MFText\").val()/100;vgap.plugins.MinefieldFader.fadersAdjusted();' value=" + Math.round(vgap.map.minefieldalpha * 100) +">";
				    html    += "<a class='rNavRight' onclick='vgap.plugins.MinefieldFader.clearFader();'></a>";
				    html    += "</li>";
				    
                    $("#PlanetsMenu").prepend(html);
                
                } );
    
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
			loadship: function() {},
			
			// END PLUGIN FUNCS
			
			fadersAdjusted: function() {
			     $("#MFSlider").val(Math.round(vgap.map.minefieldalpha * 100));
			     $("#MFText").val(Math.round(vgap.map.minefieldalpha * 100));
			     vgap.map.clearcache();
			     vgap.map.draw();
			},
			
			clearFader: function() {
			     $("#MinefieldFader").remove();
			}
        			
			
			
	};
		
	// register your plugin with NU
	vgap.registerPlugin(plugin, "MinefieldFader");



}    
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);    
document.body.removeChild(script);    


