// ==UserScript==
// @name          Planets.nu ion storm prediction
// @description   Shows predicted path of ion storms
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @version 0.3
// ==/UserScript==

// 1. Draw a bunch of circles for possible ion storm locations for next 5 turns. Assumes warp and radius stay constant and +/- 10 deg. change to heading per turn.

function wrapper () { // wrapper for injection

if (vgap.version < 3) {
    
    var oldDrawIonStorms = vgapMap.prototype.drawIonStorms;
        
    vgapMap.prototype.drawIonStorms = function () {
            
            oldDrawIonStorms.apply(this, arguments);
            
            if (vgap.ionstormprediction) {
            
                for (var i = 0; i < vgap.ionstorms.length; i++) {
                    var storm = vgap.ionstorms[i];
                    this.drawIonPrediction(5, storm.x, storm.y, storm.warp, storm.radius, storm.heading, 1/Math.sqrt(storm.radius+200));  
                }
                
            }
        };
        
    vgapMap.prototype.drawIonPrediction = function(turns, x, y, warp, radius, heading, opacity) {
            var xC = x + Math.round(Math.sin(Math.toRad(heading)) * warp * warp);
            var yC = y + Math.round(Math.cos(Math.toRad(heading)) * warp * warp);
            var xL = x + Math.round(Math.sin(Math.toRad(heading-10)) * warp * warp);
            var yL = y + Math.round(Math.cos(Math.toRad(heading-10)) * warp * warp);
            var xR = x + Math.round(Math.sin(Math.toRad(heading+10)) * warp * warp);
            var yR = y + Math.round(Math.cos(Math.toRad(heading+10)) * warp * warp);        
    
            //this.ionstorms.push(this.paper.path("M" + this.screenX(x) + " " + this.screenY(y) + "L" + this.screenX(xC) + " " + this.screenY(yC)).attr({ stroke: "yellow", "stroke-width": "2", "stroke-opacity": (opacity * 2) }));
            //this.ionstorms.push(this.paper.path("M" + this.screenX(x) + " " + this.screenY(y) + "L" + this.screenX(xL) + " " + this.screenY(yL)).attr({ stroke: "yellow", "stroke-width": "2", "stroke-opacity": (opacity * 2) }));
            //this.ionstorms.push(this.paper.path("M" + this.screenX(x) + " " + this.screenY(y) + "L" + this.screenX(xR) + " " + this.screenY(yR)).attr({ stroke: "yellow", "stroke-width": "2", "stroke-opacity": (opacity * 2) }));
    
            this.ionstorms.push(this.paper.path("M" + this.screenX(xR) + " " + this.screenY(yR) + "A" + warp * warp + " " + warp * warp + " 0 0 0 " + this.screenX(xL) + " " + this.screenY(yL)).attr({ stroke: "yellow", "stroke-width": 2 * radius * this.zoom, "stroke-opacity": (opacity/2), "stroke-linecap": "round" }));
                
            if (turns <= 1)
                return;
            else {
                this.drawIonPrediction(turns-1, xC, yC, warp, radius, heading, opacity * 0.55);
                this.drawIonPrediction(turns-1, xL, yL, warp, radius, heading-10, opacity * 0.65);
                this.drawIonPrediction(turns-1, xR, yR, warp, radius, heading+10, opacity * 0.65);
            }
                
        };
        
    var oldLoadControls = vgapMap.prototype.loadControls; 
    
    vgapMap.prototype.loadControls = function () {
    
            oldLoadControls.apply(this, arguments);
            
            var additem = "<li onclick='vgap.ionstormprediction = !vgap.ionstormprediction; vgap.map.drawIonStorms();'>IS Predict</li>";
            
            //$("#MapTools").append(additem);
            $("#MapTools > li:contains('Connections (q)')").after(additem);
    
            var height = this.controls.height() - this.toolsMenu.height();
            this.controls.css("marginTop", "-" + this.controls.height() + "px");
    
        };    
}
// NEW VERSION
else {

    vgapMap.prototype.drawIonPrediction = function(turns, x, y, warp, radius, heading, opacity) {
        var xC = x + Math.round(Math.sin(Math.toRad(heading)) * warp * warp);
        var yC = y + Math.round(Math.cos(Math.toRad(heading)) * warp * warp);
        var xL = x + Math.round(Math.sin(Math.toRad(heading-10)) * warp * warp);
        var yL = y + Math.round(Math.cos(Math.toRad(heading-10)) * warp * warp);
        var xR = x + Math.round(Math.sin(Math.toRad(heading+10)) * warp * warp);
        var yR = y + Math.round(Math.cos(Math.toRad(heading+10)) * warp * warp);        

        //this.ionstorms.push(this.paper.path("M" + this.screenX(x) + " " + this.screenY(y) + "L" + this.screenX(xC) + " " + this.screenY(yC)).attr({ stroke: "yellow", "stroke-width": "2", "stroke-opacity": (opacity * 2) }));
        //this.ionstorms.push(this.paper.path("M" + this.screenX(x) + " " + this.screenY(y) + "L" + this.screenX(xL) + " " + this.screenY(yL)).attr({ stroke: "yellow", "stroke-width": "2", "stroke-opacity": (opacity * 2) }));
        //this.ionstorms.push(this.paper.path("M" + this.screenX(x) + " " + this.screenY(y) + "L" + this.screenX(xR) + " " + this.screenY(yR)).attr({ stroke: "yellow", "stroke-width": "2", "stroke-opacity": (opacity * 2) }));

        //this.ionstorms.push(this.paper.path("M" + this.screenX(xR) + " " + this.screenY(yR) + "A" + warp * warp + " " + warp * warp + " 0 0 0 " + this.screenX(xL) + " " + this.screenY(yL)).attr({ stroke: "yellow", "stroke-width": 2 * radius * this.zoom, "stroke-opacity": (opacity/2), "stroke-linecap": "round" }));
        if (vgap.map.isVisible(xC, yC, radius+30)) {
            var ctx = vgap.map.ctx;
            ctx.beginPath();
            ctx.arc(this.screenX(x), this.screenY(y), warp * warp * this.zoom, Math.toRad(heading-10-90), Math.toRad(heading+10-90));
            ctx.strokeStyle = colorToRGBA("yellow", opacity);
            ctx.lineWidth = 2 * radius * this.zoom;
            //console.log(radius * this.zoom);
            ctx.lineCap = "round";
            ctx.stroke();
        }
        
        if (turns <= 1)
            return;
        else {
            this.drawIonPrediction(turns-1, xC, yC, warp, radius, heading, opacity * 0.55);
            this.drawIonPrediction(turns-1, xL, yL, warp, radius, heading-10, opacity * 0.65);
            this.drawIonPrediction(turns-1, xR, yR, warp, radius, heading+10, opacity * 0.65);
        }
            
    }
    
    vgaPlanets.prototype.ionDrag = function (warp, heading) {
        return {
            x: Math.round(Math.sin(Math.toRad(heading)) * warp * warp * 0.75),
            y: Math.round(Math.cos(Math.toRad(heading)) * warp * warp * 0.75)
        }
    }
    
    vgaPlanets.prototype.setIonDrags = function () {
        for (var s = 0; s < this.ionstorms.length; s++) {
            var storm = this.ionstorms[s];
            storm.dragoffsets = [];
            for (var i = -10; i <= 10; i++) {
                storm.dragoffsets.push(this.ionDrag(storm.warp, storm.heading + i));
            }
        }
    }
    
	var plugin = {
			
			/*
			 * processload: executed whenever a turn is loaded: either the current turn or
			 * an older turn through time machine 
			 */
			processload: function() {
                vgap.setIonDrags();
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
                vgap.plugins.IonStormTools.clearFader();
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
				vgap.map.ionpredict = false;
				vgap.map.ionpredictalpha = 0.2;
				vgap.map.ionpredictturns = 1;
				vgap.map.addMapTool("IS Predict", "ShowMinerals", function () {
				    
				    var html = "<li id='ISPredict'>";
				    html    += "Show: <input id='ISCheck' type='checkbox' onchange='vgap.plugins.IonStormTools.fadersAdjusted();'" + (vgap.map.ionpredict ? " checked" : "") + ">";
				    html    += " Level:<input id='ISLevel' type='range' min=0 max=0.4 step=0.01 onchange='vgap.plugins.IonStormTools.fadersAdjusted();' value=" + vgap.map.ionpredictalpha + ">";
				    html    += " Turns:<input id='ISTurns' type='number' min=1 max=8 step=1 size=2 onchange='vgap.plugins.IonStormTools.fadersAdjusted();' value=" + vgap.map.ionpredictturns +">";
				    html    += "<a class='rNavRight' onclick='vgap.plugins.IonStormTools.clearFader();'></a>";
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
			    if (!vgap.map.ionpredict) return;
			    
                for (var i = 0; i < vgap.ionstorms.length; i++) {
                    var storm = vgap.ionstorms[i];
                    var opacity = storm.voltage / 400;
                    if (opacity > 1)
                        opacity = 1;
                    if (opacity < 0.1)
                        opacity = 0.1;
                    opacity *= vgap.map.ionpredictalpha;
                    
                    var xC = storm.x + Math.round(Math.sin(Math.toRad(storm.heading)) * storm.warp * storm.warp);
                    var yC = storm.y + Math.round(Math.cos(Math.toRad(storm.heading)) * storm.warp * storm.warp);
                    
                    var newradius = storm.radius;
                    var weakening = (storm.voltage % 2 == 0);
                    if (weakening) newradius += 10;
                    else newradius = Math.max(newradius - 3, 0);
                    var maxradius = Math.max(storm.radius, newradius);
                    var drag = storm.dragoffsets[10];
                    var dangerous = ((weakening && storm.voltage >= 154) || (!weakening && storm.voltage >= 140));
                    
                    var ctx = vgap.map.ctx;
                    var color = "yellow";
                    ctx.strokeStyle = colorToRGBA(color, 0.2);
                    ctx.fillStyle = colorToRGBA(color, opacity);
                    ctx.lineWidth = 1;
                    ctx.beginPath();                        
                    ctx.arc(vgap.map.screenX(xC), vgap.map.screenY(yC), storm.radius*vgap.map.zoom, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                    
                    if (newradius > 0) {
                        ctx.beginPath();
                        ctx.arc(vgap.map.screenX(xC), vgap.map.screenY(yC), newradius*vgap.map.zoom, 0, Math.PI * 2, false);
                        ctx.closePath();
                        ctx.stroke();
                        ctx.fill();                        
                    }
                    
                    var turns = vgap.map.ionpredictturns;
                    if (turns > 1) {
                        vgap.map.drawIonPrediction(turns-1, xC, yC, storm.warp, storm.radius, storm.heading, opacity);  
                    }
                    
                    if (dangerous) {
                    
                        for (var s = 0; s < vgap.ships.length; s++) {
                            var ship = vgap.ships[s];
                            var dest = vgap.getDest(ship);
                            if (Math.dist(ship.x, ship.y, xC, yC) <= maxradius) {
                              ctx.lineWidth = 1;
                              ctx.strokeStyle = colorToRGBA("orange", 0.6);
                              ctx.beginPath();
                              ctx.dashedLine(vgap.map.screenX(dest.x), vgap.map.screenY(dest.y), vgap.map.screenX(dest.x + drag.x), vgap.map.screenY(dest.y + drag.y), [3, 3]);
                              ctx.closePath();
                              ctx.stroke();
                            }
                        }
                        
                        if (vgap.shipScreenOpen && vgap.map.zoom > 2) {
                            var ship = vgap.shipScreen.ship;
                            var dest = vgap.getDest(ship);
                            var dotrad = 3;
                            if (vgap.map.zoom < 10) dotrad = 2;
                            if (vgap.map.zoom < 5) dotrad = 1;
                            
                            if (Math.dist(ship.x, ship.y, xC, yC) <= maxradius) {
                              ctx.lineWidth = 1;
                              ctx.fillStyle = colorToRGBA("orange", 0.3);
                              for (var o = 0; o < storm.dragoffsets.length; o++) {
                                var offset = storm.dragoffsets[o];
                                ctx.beginPath();
                                ctx.arc(vgap.map.screenX(dest.x + offset.x), vgap.map.screenY(dest.y + offset.y), 3, 0, Math.PI * 2);
                                ctx.closePath();
                                ctx.fill();
                              }
                            }
                        }
                        
                    }
                          
                }
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
			     vgap.map.ionpredict = $("#ISCheck").prop("checked");
			     vgap.map.ionpredictalpha = $("#ISLevel").val();
			     vgap.map.ionpredictturns = $("#ISTurns").val();
			     if (vgap.map.ionpredictturns < 1) {
			         vgap.map.ionpredictturns = 1;
			         $("#ISTurns").val(vgap.map.ionpredictturns);
			     }
			     else if (vgap.map.ionpredictturns > 8) {
			         vgap.map.ionpredictturns = 8;
			         $("#ISTurns").val(vgap.map.ionpredictturns);
			     }
			     vgap.map.draw();
			},
			
			clearFader: function() {
			     $("#ISPredict").remove();
			}
        			
			
			
	};
		
	// register your plugin with NU
	vgap.registerPlugin(plugin, "IonStormTools");
    



}
    
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);    