// ==UserScript==
// @name          Color Coding for Planets.nu
// @description   Color codes planets and ships by race on Planets.nu map
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @version 1.92
// ==/UserScript==

// 1. Color codes planets and ships by race on Planets.nu map
// 2. v0.5 - now activates or deactivates from Settings screen!
// 3. v0.7 - now activates or deactivates default color for user from Settings screen
// 4. v0.81 - now saves settings for the user to a cookie, when changed from the Settings Screen
// 5. v0.90 - First 11 race colors, unknown planets, and unoccupied planets now configurable from Settings Screen!
// 6. v1.0 - Fully functional! Uses color gradient for all planets. Displays color gradiant on Settings Screen (FF only, will tackle Chrome later)
// 7. v1.1 - Chrome and FF color preview. Gradient colors for standard game races, info, and unknown
// 8. v1.2 - Redraws colors on maps after any setting changes. Different sized circles around planets for Own Ships, Ally, and Enemy. Own ships will always have correct color
// 9. v1.3 - rewrote Settings changes to play nicely with other mods. 
// 10.v1.4 - added in support for users changing colors beyond race 11 (settings page does not refresh, so hit the settings button again to see the changes).
// 11.v1.5,1.51 - added support for new play.planets.nu client
// 12.v1.6 - New note colors that match the mod.
// 13.v1.61 - added support for new planets urls
// 14.v1.7 - Adds planets v3 API support
// 15.v1.81 - Now shows ship names with explosions (formerly a separate script). Fixed colors in the diplomacy screen color picker (if you ever want to use this with the mod).
// 17.v1.9.2 - Removed play.planets.nu code. This is now in a new mod.

function wrapper () { // wrapper for injection
       //var colors = ["white", "Green", "Crimson", "HotPink", "Lime", "Magenta", "Yellow", "Purple", "Gray", "Cyan", "Blue", "mediumslateblue", "sienna", "skyblue", "tomato","wheat", "lightcoral", "darkslategray", "teal", "firebrick", "olive", "mediumpurple", "lime", "indigo", "tan", "yellowgreen", "goldenrod", "aliceblue", "olivedrab", "orangered"];

       var colorsA =["#F0F8FF","#32CD32","#CD5C5C","#FFC0CB","#98FB98","#C0C0C0","#FFFF00","#EE82EE","#D3D3D3","#B0E0E6","#87CEFA","#7B68EE","#F4A460","#D2B48C","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
       var colorsA2 =["#FFFFFF","#006400","#FF0000","#FF69B4","#00FA9A","#6A5ACD","#FFD700","#9400D3","#808080","#00CED1","#4169E1","#7B68EE","#A0522D","#87CEEB","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];

	
    var modInfo="#F4A460";//chocolate
    var modInfo2="#D2691E";//chocolate

    var modUnknown="#FFF8DC"; //Tan
    var modUnknown2="#D2B48C"; //Tan
    var	modRace=12;	
	
		       

// Fed - White
// Lizard - Green
// Birds - Crimson
// Fascists - Pink
// Privateers - Lime
// Cyborg - Magenta
// Crystals - Yellow
// Empire - Purple
// Robots - Gray
// Rebels - Aqua	
// Colonies - Blue 

var activeColorMod=null;//default true
var defaultMyColor=null;//default true
var useCustomColor=false;//have we checked Cookie
var firstLoad=true;


var oldDrawMap = vgapMap.prototype.drawMap;



vgapMap.prototype.drawMap = function () {


	//check Color Mod Settings
	checkColorModSettings();
	if ((activeColorMod==false)||(vgaPlanets.prototype.version>=3))
		{
		oldDrawMap.apply(this,arguments);
		}
	else 
	//VERSION 1.19 code
		{
       //no canvas
        if (this.mapImg)
            return;

        //we've moved and need to recreate the canvas
        if ((this.canvasCenterX != this.centerX || this.canvasCenterY != this.centerY) && this.zoom >= 20)
            this.createCanvasArray();

        //grab the visible canvases
        var startLeft = Math.floor((this.left * -1) / this.canvasSize) * this.canvasSize;
        var startTop = Math.floor((this.top * -1) / this.canvasSize) * this.canvasSize;
        var maxAccross = Math.ceil($(window).width() / this.canvasSize) + 1;
        var maxDown = Math.ceil($(window).height() / this.canvasSize) + 1;
        var visible = new Array();
        var leftOffset = startLeft;
        for (var i = 0; i < maxAccross; i++) {
            var topOffset = startTop;
            for (var j = 0; j < maxDown; j++) {
                var canvas = this.canvasArray[leftOffset + "-" + topOffset];
                if (canvas)
                    visible.push(canvas);
                topOffset += this.canvasSize;
            }
            leftOffset += this.canvasSize;
        }

        var sets = vgap.accountsettings;
        for (var can = 0; can < visible.length; can++) {
            //var visible = true;
            //            if ((this.left + leftOffset + this.canvasSize) < 0)
            //                visible = false;
            //            if ((this.top + topOffset + this.canvasSize) < 0)
            //                visible = false;
            //            if ((this.left + leftOffset) > $(window).width())
            //                visible = false;
            //            if ((this.top + topOffset) > $(window).height())
            //                visible = false;

            var canvas = visible[can];
            if (!canvas.rendered) {

                var leftOffset = canvas.leftOffset;
                var topOffset = canvas.topOffset;
                canvas.rendered = true;

                var ctx = canvas.getContext("2d");

                //nebulas
                if (vgap.nebulas) {
                    for (var i = 0; i < vgap.nebulas.length; i++) {
                        var neb = vgap.nebulas[i];
                        var mapX = this.screenX(neb.x) - leftOffset;
                        var mapY = this.screenY(neb.y) - topOffset;
                        var rad = neb.radius * this.zoom;
                        var green = 200 + (neb.gas * 10);
                        var blue = 200 - (neb.gas * 10);

                        var grad = ctx.createRadialGradient(mapX, mapY, 0, mapX, mapY, rad);
                        grad.addColorStop(0, "rgba(0, " + green + ", " + blue + ", " + neb.intensity / 400 + ")");
                        grad.addColorStop(1, "rgba(0, " + green + ", " + blue + ", 0)");
                        ctx.fillStyle = grad;

                        ctx.beginPath();
                        ctx.arc(mapX, mapY, rad, 0, Math.PI * 2, false);
                        ctx.closePath();
                        ctx.fill();
                    }
                }
                //stars
                if (vgap.stars) {
                    for (var i = 0; i < vgap.stars.length; i++) {

                        var star = vgap.stars[i];
                        var mapX = this.screenX(star.x) - leftOffset;
                        var mapY = this.screenY(star.y) - topOffset;
                        var rad = star.radius * this.zoom;

                        //var color = "orange";
                        var color = "red";
                        if (star.temp > 3000 && star.temp <= 6000)
                            color = "orange";
                        if (star.temp > 6000 && star.temp <= 10000)
                            color = "brown";
                        if (star.temp > 10000 && star.temp <= 20000)
                            color = "white";
                        if (star.temp > 20000)
                            color = "powderblue";

                        //radiation
                        var radColor = "orange";
                        var opacity = Math.max(0.4 * star.temp / 65000, 0.2);

                        var effectRad = Math.sqrt(star.mass) * this.zoom;
                        var grad = ctx.createRadialGradient(mapX, mapY, 0, mapX, mapY, effectRad);
                        grad.addColorStop(0, colorToRGBA(color, opacity));
                        grad.addColorStop(1, colorToRGBA(color, 0));
                        ctx.fillStyle = grad;

                        ctx.beginPath();
                        ctx.arc(mapX, mapY, effectRad, 0, Math.PI * 2, false);
                        ctx.closePath();
                        ctx.fill();

                        //center blank
                        //                        var img = new Image();
                        //                        img.src = "/_library/theme/images/starbacking.jpg";
                        //                        var pattern = ctx.createPattern(img, "repeat");
                        //                        ctx.fillStyle = pattern;

                        //                        ctx.beginPath();
                        //                        ctx.arc(mapX, mapY, rad, 0, Math.PI * 2, false);
                        //                        ctx.closePath();
                        //                        ctx.fill();

                        //circle
                        var grad = ctx.createRadialGradient(mapX, mapY, 0, mapX, mapY, rad);
                        grad.addColorStop(0, colorToRGBA(color, 0.25));
                        grad.addColorStop(1, colorToRGBA(color, 0.05));
                        ctx.fillStyle = grad;

                        ctx.beginPath();
                        ctx.arc(mapX, mapY, rad, 0, Math.PI * 2, false);
                        ctx.closePath();
                        ctx.fill();

                        //diamond
                        var halfRad = rad / 4;
                        var grad = ctx.createRadialGradient(mapX, mapY, 0, mapX, mapY, halfRad);
                        grad.addColorStop(0, colorToRGBA(color, 1));
                        grad.addColorStop(1, colorToRGBA(color, 0));
                        ctx.fillStyle = grad;
                        ctx.beginPath();
                        ctx.moveTo(mapX - halfRad, mapY);
                        ctx.lineTo(mapX, mapY - halfRad);
                        ctx.lineTo(mapX + halfRad, mapY);
                        ctx.lineTo(mapX, mapY + halfRad);
                        ctx.closePath();
                        ctx.fill();
                    }
                }

                //minefields
                for (var i = 0; i < vgap.minefields.length; i++) {
                    var minefield = vgap.minefields[i];

                    var color;

		   if (activeColorMod==false)
			{
		    	if (minefield.isweb)
                        	color = sets.webmines;
                    	else if (minefield.ownerid == vgap.player.id)
                        	color = sets.mymines;
                    	else if (vgap.allied(minefield.ownerid))
                        	color = sets.allymines;
                    	else if (minefield.ownerid != vgap.player.id)
                        	color = sets.enemymines;
			}
		else 
		        {
			if ((defaultMyColor==true)&&(minefield.ownerid == vgap.player.id))
                        	color = sets.mymines;
 		  	else //use new colors
				color=colorsA2[minefield.ownerid-1];
			}

                    var mapX = this.screenX(minefield.x) - leftOffset;
                    var mapY = this.screenY(minefield.y) - topOffset;
                    var rad = minefield.radius * this.zoom;

                    var grad = ctx.createRadialGradient(mapX, mapY, 0, mapX, mapY, rad);

              	if ((activeColorMod==true) && (minefield.isweb==false))
			{
                    	grad.addColorStop(0, colorToRGBA(color, 0.4));
                    	grad.addColorStop(1, colorToRGBA(color, 0.2));
                	}
                if ((activeColorMod==true) && (minefield.isweb==true))
                 	{
                    	grad.addColorStop(0.9, colorToRGBA(color, 0.15));
                    	grad.addColorStop(1, colorToRGBA(color, 0.3));
                 	}
		if (activeColorMod==false)
			{
			grad.addColorStop(0, colorToRGBA(color, 0.4));
                        grad.addColorStop(1, colorToRGBA(color, 0.2));
			}

                    ctx.fillStyle = grad;

                    ctx.strokeStyle = colorToRGBA(color, 0.2);
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(mapX, mapY, rad, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                }

                //ions
                for (var i = 0; i < vgap.ionstorms.length; i++) {
                    var storm = vgap.ionstorms[i];

                    var mapX = this.screenX(storm.x) - leftOffset;
                    var mapY = this.screenY(storm.y) - topOffset;
                    var rad = storm.radius * this.zoom;

                    var opacity = storm.voltage / 400;
                    if (opacity > 1)
                        opacity = 1;
                    if (opacity < 0.1)
                        opacity = 0.1;
                    var color = vgap.accountsettings.ionstorms;

                    var grad = ctx.createRadialGradient(mapX, mapY, 0, mapX, mapY, rad);
                    grad.addColorStop(0, colorToRGBA(color, opacity));
                    if (vgap.settings.nuionstorms)
                        grad.addColorStop(1, colorToRGBA(color, 0));
                    else
                        grad.addColorStop(1, colorToRGBA(color, 0.05));
                    ctx.fillStyle = grad;

                    ctx.strokeStyle = colorToRGBA(color, 0.05);
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(mapX, mapY, rad, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.fill();
                    if (!vgap.settings.nuionstorms)
                        ctx.stroke();
                }



                //Debris Disk stroke
                if (this.zoom >= 5) {
                    for (var i = 0; i < vgap.planets.length; i++) {
                        var planet = vgap.planets[i];

                        //draw rings
                        if (planet.debrisdisk > 1) {

                            var mapX = this.screenX(planet.x) - leftOffset;
                            var mapY = this.screenY(planet.y) - topOffset;

                            var rad = planet.debrisdisk * this.zoom;
                            //var color = "#ffff00";
                            var color = "#ffffff";
                            ctx.strokeStyle = colorToRGBA(color, 0.1);
                            ctx.lineWidth = 2;

                            ctx.beginPath();
                            ctx.arc(mapX, mapY, rad, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.stroke();
                        }
                    }
                    for (var i = 0; i < vgap.planets.length; i++) {
                        var planet = vgap.planets[i];

                        //draw centers
                        if (planet.debrisdisk > 1) {

                            var mapX = this.screenX(planet.x) - leftOffset;
                            var mapY = this.screenY(planet.y) - topOffset;

                            //blank centers (for overlapping circles)
                            var rad = planet.debrisdisk * this.zoom - 2;
                            //var img = new Image();
                            //img.src = "/_library/theme/images/starbacking.jpg";
                            //var pattern = ctx.createPattern(img, "repeat");
                            //ctx.fillStyle = pattern;
                            ctx.fillStyle = "#111111";

                            ctx.beginPath();
                            ctx.arc(mapX, mapY, rad, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.fill();

                        }
                    }
                }


                //planets
                for (var i = 0; i < vgap.planets.length; i++) {

                    var planet = vgap.planets[i];

                    var mapX = this.screenX(planet.x) - leftOffset;
                    var mapY = this.screenY(planet.y) - topOffset;

                    //if on this canvas
                    if (mapX > -200 && mapX < (this.canvasSize + 200)) {

                        //draw warp well
                        if (this.zoom >= 40 && planet.debrisdisk == 0) {

                            ctx.fillStyle = "#000000";
                            ctx.strokeStyle = "#333333";
                            ctx.lineWidth = 1;
                            for (var x = (planet.x - 3); x <= planet.x + 3; x++) {
                                for (var y = (planet.y - 3); y <= planet.y + 3; y++) {
                                    if (this.getDist(x, y, planet.x, planet.y) <= 3) {
                                        var mX = this.screenX(x) - leftOffset;
                                        var mY = this.screenY(y) - topOffset;
                                        var rad = this.zoom / 2;
                                        ctx.fillRect(mX - rad, mY - rad, rad * 2, rad * 2);
                                        ctx.strokeRect(mX - rad, mY - rad, rad * 2, rad * 2);
                                    }
                                }
                            }
                        }

                        var rad = 6;
                        if (planet.debrisdisk > 0)
                            rad = 1;

                        if (this.zoom < 1)
                            rad = Math.ceil(rad * this.zoom);
                        else
                            rad = Math.ceil(rad * Math.pow(this.zoom, 0.4));

                        var grad = ctx.createLinearGradient(mapX - rad, mapY - rad, mapX + rad, mapY + rad);
	if (planet.ownerid == vgap.player.id) {
                            //mine
			    if ((activeColorMod==false) || (defaultMyColor==true))
				{
                            	grad.addColorStop(0, sets.myplanetfrom);
                            	grad.addColorStop(1, sets.myplanetto);
				}
			    else
				{
                            	grad.addColorStop(0, colorsA[planet.ownerid-1]);
                            	grad.addColorStop(1, colorsA2[planet.ownerid-1]);
				}
	
                        }
			else if (planet.ownerid == 0) {
                            if (planet.infoturn > 0) {
                                //info
			    	if (activeColorMod==false)
				{
                                grad.addColorStop(0, sets.infoplanetfrom);
                                grad.addColorStop(1, sets.infoplanetto);
				}
			    else
				{
				grad.addColorStop(0, modInfo);
                                grad.addColorStop(1, modInfo2);
				}
                            }
                            else {
                                //unknown
				if (activeColorMod==false)
				{
                                grad.addColorStop(0, sets.unknownplanetfrom);
                                grad.addColorStop(1, sets.unknownplanetto);
				}
			    else
				{
                                grad.addColorStop(0, modUnknown);
                                grad.addColorStop(1, modUnknown2);
				}
                            }
                        }
                        else {
                            //ally
                            if (vgap.allied(planet.ownerid)) {
				if (activeColorMod==false)
				{
                                grad.addColorStop(0, sets.allyplanetfrom);
                                grad.addColorStop(1, sets.allyplanetto);
				}
				else
				{
                            	grad.addColorStop(0, colorsA[planet.ownerid-1]);
                            	grad.addColorStop(1, colorsA2[planet.ownerid-1]);
				}
                            }
                            else {
                                //enemy
				if (activeColorMod==false)
				{
                                grad.addColorStop(0, sets.enemyplanetfrom);
                                grad.addColorStop(1, sets.enemyplanetto);
				}
				else
				{
                            	grad.addColorStop(0, colorsA[planet.ownerid-1]);
                            	grad.addColorStop(1, colorsA2[planet.ownerid-1]);
				}
                            }
                        }

                        ctx.fillStyle = grad;

                        var note = vgap.getNote(planet.id, 1);
                        if (note != null && note.color != "")
                            ctx.fillStyle = "#" + note.color;

                        var starbase = vgap.getStarbase(planet.id);
                        if (starbase != null) {
                            ctx.fillRect(mapX - rad, mapY - rad, rad * 2, rad * 2);
                        }
                        else {
                            ctx.beginPath();
                            ctx.arc(mapX, mapY, rad, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.fill();
                        }

                        var shipsAt = vgap.shipsAt(planet.x, planet.y);
                        var myShip = false;
                        var enemyShip = false;
                        var allyShip = false;
			var color;
			for (var j = 0; j < shipsAt.length; j++) {
			    var number=shipsAt[j].ownerid;
                            color=colorsA2[number-1];
                            if (shipsAt[j].ownerid == vgap.player.id)
                                myShip = true;
                            else if (vgap.allied(shipsAt[j].ownerid))
                               allyShip = true;
                            else
                                enemyShip = true;
                        }

                        if (myShip) {
                            if ((activeColorMod==false)||(defaultMyColor==true))
				ctx.strokeStyle = sets.myshipfrom;
                            else
				ctx.strokeStyle =colorsA2[vgap.player.id-1];
			    ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.arc(mapX, mapY, rad + 2, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.stroke();
                        }
                        if (allyShip) {
                            if (activeColorMod==false)
				ctx.strokeStyle = sets.allyshipfrom;
 			    else
				ctx.strokeStyle = color;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.arc(mapX, mapY, rad + 4, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.stroke();
                        }
                        if (enemyShip) {
                            if (activeColorMod==false)
				ctx.strokeStyle = sets.enemyshipfrom;
			    else	
			   	ctx.strokeStyle = color;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.arc(mapX, mapY, rad + 6, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.stroke();
                        }
                    }
                }


                //Debris Disk Fill
                for (var i = 0; i < vgap.planets.length; i++) {
                    var planet = vgap.planets[i];

                    //draw centers
                    if (planet.debrisdisk > 1) {

                        var mapX = this.screenX(planet.x) - leftOffset;
                        var mapY = this.screenY(planet.y) - topOffset;

                        //fill centers
                        var rad = planet.debrisdisk * this.zoom;
                        //var color = "#ffff00";
                        //var color2 = "#ff6600";
                        var color = "#ffff99";
                        var color2 = "#ffff99";

                        grad = ctx.createRadialGradient(mapX, mapY, 0, mapX, mapY, rad);
                        grad.addColorStop(0, colorToRGBA(color, 0.15));
                        grad.addColorStop(0.4, colorToRGBA(color, 0.075));
                        grad.addColorStop(0.5, colorToRGBA(color2, 0.075));
                        grad.addColorStop(1, colorToRGBA(color2, 0));
                        ctx.fillStyle = grad;

                        ctx.beginPath();
                        ctx.arc(mapX, mapY, rad, 0, Math.PI * 2, false);
                        ctx.closePath();
                        ctx.fill();

                    }
                }


                //ships in space
                for (var i = 0; i < vgap.ships.length; i++) {
                    var ship = vgap.ships[i];
                    var planet = vgap.planetAt(ship.x, ship.y);
                    if (planet == null) {
                        var mapX = this.screenX(ship.x) - leftOffset;
                        var mapY = this.screenY(ship.y) - topOffset;
                        var rad = 3;
                        if (ship.mass < 800)
                            rad = 2;
                        //                if (ship.mass < 300)
                        //                    rad = 1;

                        if (this.zoom < 1)
                            rad = Math.ceil(rad * this.zoom);
                        else
                            rad = Math.ceil(rad * Math.pow(this.zoom, 0.3));
                        ////                        if (this.zoom > 10)
                        ////                            rad = Math.ceil(rad * this.zoom / 10);

                        var grad = ctx.createLinearGradient(mapX - rad, mapY - rad, mapX + rad, mapY + rad);

                       if (ship.ownerid == vgap.player.id) {
                            //mine
			    if ((activeColorMod==false)||(defaultMyColor==true))
			    {
                            grad.addColorStop(0, sets.myshipfrom);
                            grad.addColorStop(1, sets.myshipto);
		            } 
			    else 
			    {
                            grad.addColorStop(0,colorsA[ship.ownerid-1]);
                            grad.addColorStop(1,colorsA2[ship.ownerid-1]);
			    }
                        }
                        else {
                            //ally
                            if (vgap.allied(ship.ownerid)) {

			    	if (activeColorMod==false)
			    	{
                                 	grad.addColorStop(0, sets.allyshipfrom);
                                  	grad.addColorStop(1, sets.allyshipto);
		            	} 
			       else 
			        {
                                	grad.addColorStop(0,colorsA[ship.ownerid-1]);
                            		grad.addColorStop(1,colorsA2[ship.ownerid-1]);
			    	}
                            }
                            else {
                                //enemy
			    	if (activeColorMod==false)
			    	{
                                	grad.addColorStop(0, sets.enemyshipfrom);
                                	grad.addColorStop(1, sets.enemyshipto);
		            	} 
			       else 
			        {
                                	grad.addColorStop(0,colorsA[ship.ownerid-1]);
                            		grad.addColorStop(1,colorsA2[ship.ownerid-1]);
			    	}
                            }
                        }

                        ctx.fillStyle = grad;

                        var note = vgap.getNote(ship.id, 2);
                        if (note != null && note.color != "")
                            ctx.fillStyle = "#" + note.color;

                        ctx.beginPath();
                        ctx.arc(mapX, mapY, rad, 0, Math.PI * 2, false);
                        ctx.closePath();
                        ctx.fill();
                    }
                }
            }
            //            topOffset += this.canvasSize;
            //            if (topOffset >= (4000 * this.zoom)) {
            //                topOffset = 0;
            //                leftOffset += this.canvasSize;
            //            }
        }
        this.canvasRendered = true;
 

		}
	};

var oldDrawWaypoints = vgapMap.prototype.drawWaypoints;

vgapMap.prototype.drawWaypoints = function () {
	if ((activeColorMod==false)||(vgaPlanets.prototype.version>=3))
		{
		oldDrawWaypoints.apply(this,arguments);
		}
	else 
		{
     var sets = vgap.accountsettings;
        this.waypoints.remove();
        this.waypoints = this.paper.set();
        for (var i = 0; i < vgap.ships.length; i++) {
            //waypoint
            var ship = vgap.ships[i];
            if (ship.ownerid != vgap.player.id) {
                if (ship.heading != -1 && ship.warp != 0) {
                    var color;
		    if (activeColorMod==false)
		    	color = sets.enemyshipto;
		    else
		    	color=colorsA2[ship.ownerid-1];
                    if (vgap.allied(ship.ownerid))
                        if (activeColorMod==false)
                       		color = sets.allyshipto;
		    	else
				color=colorsA2[ship.ownerid-1];	
                    var speed = vgap.getSpeed(ship.warp, ship.hullid);

                    var x2 = ship.x + Math.round(Math.sin(Math.toRad(ship.heading)) * speed);
                    var y2 = ship.y + Math.round(Math.cos(Math.toRad(ship.heading)) * speed);
                    ship.targetx = x2;
                    ship.targety = y2;
//		    if (ship.iscloaked)
//			this.waypoints.push(this.paper.path("M" + this.screenX(ship.x) + " " + this.screenY(ship.y) + "L" + this.screenX(x2) + " " + this.screenY(y2)).attr({ stroke: color, //"stroke-width": "1", "stroke-dasharray": "-", "stroke-opacity": 0.5 }));
//		    else
                    	this.waypoints.push(this.paper.path("M" + this.screenX(ship.x) + " " + this.screenY(ship.y) + "L" + this.screenX(x2) + " " + this.screenY(y2)).attr({ stroke: color, "stroke-width": "2", "stroke-opacity": 0.5 }));
                }
            }
            else {

                if (vgap.isChunnelling(ship)) {
                    var targetId = parseInt(ship.friendlycode, 10);
                    var target = vgap.getShip(targetId);
                    this.waypoints.push(this.paper.path("M" + this.screenX(ship.x) + " " + this.screenY(ship.y) + "L" + this.screenX(target.x) + " " + this.screenY(target.y)).attr({ stroke: "cyan", "stroke-width": "3", "stroke-dasharray": "-", "stroke-opacity": 0.5 }));
                }
                else {
	            var params;
			if ((activeColorMod==false) || (defaultMyColor==true))
			//	if (ship.iscloaked)
			//		params = { stroke: sets.myshipto, "stroke-width": "2","stroke-dasharray": "-", "stroke-opacity": 0.5 };
			//	else
					params = { stroke: sets.myshipto, "stroke-width": "2", "stroke-opacity": 0.5 };
			else 
			//	if (ship.iscloaked)
			//		params = { stroke: colorsA2[ship.ownerid-1], "stroke-width": "2","stroke-dasharray": "-", "stroke-opacity": 0.5 };
			//	else
					params = { stroke: colorsA2[ship.ownerid-1], "stroke-width": "2", "stroke-opacity": 0.5 };
                    if (vgap.isHyping(ship))
                        params = { stroke: "beige", "stroke-dasharray": ".", "stroke-width": "2", "stroke-opacity": 0.5 };

                    var path = vgap.getPath(ship);
                    for (var j = 0; j < path.length; j++) {
                        this.waypoints.push(this.paper.path("M" + this.screenX(path[j].x1) + " " + this.screenY(path[j].y1) + "L" + this.screenX(path[j].x2) + " " + this.screenY(path[j].y2)).attr(params));
                    }
                }
            }
        }
}
    };


var oldShow = geoSimpleColorPicker.prototype.show;


geoSimpleColorPicker.prototype.show = function (targetId, callback) {
       	if (activeColorMod==false)
		{
		oldShow.apply(this,arguments);
		}
	else 
		{
        this.picker = $("<div style='position:absolute;background-color:#000;padding:4px;z-index:999;'></div>").hide().appendTo("body");
        this.target = $("#" + targetId);
       
        this.callback = callback;
        
        //colors table
        var objX = new Array('00', '33', '66', '99', 'CC', 'FF');
        html = '<table bgcolor="#000" border="0" cellpadding="0" cellspacing="0" style="padding:2px;"><tr>';
        var br = 1;
        for (o = 0; o < 6; o++) {
            html += '</tr><tr>';
            for (y = 0; y < 6; y++) {
                if (y == 3) { html += '</tr><tr>'; }
                for (x = 0; x < 6; x++) {
                    var grid = objX[o] + objX[y] + objX[x];
                    html += '<td><div title="#' + grid + '" onclick="colorPicker.selectColor(\'' + grid + '\');" style="cursor:pointer;margin: 1px;width:20px;height:20px;background-color:#' + grid + '"></div></td>';
                }
            }
        }
        html += '</tr></table>';

        //greys table
        var objX = new Array('0', '3', '6', '9', 'C', 'F');
        html += '<table bgcolor="#000" border="0" cellpadding="0" cellspacing="0" style="padding:2px;"><tr>';
        var br = 0;
        for (y = 0; y < 6; y++) {
            for (x = 0; x < 6; x++) {
                if (br == 18) {
                    br = 0;
                    html += '</tr><tr>';
                }
                br++;
                var grid = objX[y] + objX[x] + objX[y] + objX[x] + objX[y] + objX[x];
                html += '<td><div title="#' + grid + '" onclick="colorPicker.selectColor(\'' + grid + '\');" style="cursor:pointer;margin: 1px;width:20px;height:20px;background-color:#' + grid + '"></div></td>';
            }
        }
        html += "</tr></table>";
        
        html += '<table bgcolor="#000" border="0" cellpadding="0" cellspacing="0" style="padding:2px;"><tr>';
        var br = 0;
        for (y = 0; y < 2; y++) {
            for (x = 0; x < 10; x++) {
                if (br == 10) {
                    br = 0;
                    html += '</tr><tr>';
                }
                br++;
                var grid;
                if (y==0)
                {
                    if (colorsA[x].charAt(0)=='#')
                        grid = colorsA[x].substring(1,colorsA.length);
                    else
                        grid = colorsA[x];
                }
                else
                { 
                    if (colorsA2[x].charAt(0)=='#')
                        grid = colorsA2[x].substring(1,colorsA2.length);
                    else
                        grid = colorsA2[x];
                }
                html += '<td><div title="#' + grid + '" onclick="colorPicker.selectColor(\'' + grid + '\');" style="cursor:pointer;margin: 1px;width:20px;height:20px;background-color:#' + grid + '"></div></td>';
            }
        }
        html += '<table bgcolor="#000" border="0" cellpadding="0" cellspacing="0" style="padding:2px;"><tr>';
        html += '<td><div title="clear" onclick="colorPicker.selectColor(\'clear\');" style="cursor:pointer;margin: 1px;width:80px;height:20px;text-align:center;border: solid 1px #fff;color: #fff;">CLEAR</div></td>';        
        html += "</tr></table>";
        this.picker.css("left", this.target.offset().left);
        this.picker.css("top", this.target.offset().top + this.target.height() + 10);
        this.picker.html(html);
	if (vgaPlanets.prototype.version>=3)
	$(".cpselect").tclick(function () { colorPicker.selectColor($(this).data("color")); });
        this.picker.show();
    }
    
};

var oldShowSettings = vgapDashboard.prototype.showSettings;

vgapDashboard.prototype.showSettings = function () {


var new_html="";
	new_html += "<br><h3>Custom Settings for Color Mod</h3>";
	new_html += "<div style='width:250px;'></div>";
	new_html += "<div id='Test'><table>";
	new_html += "<tr><td><div id='LaunchSim' onclick='vgapDashboard.prototype.resetColorModColors();' title='Default is: Active.'>Reset all custom color settings </div></td>";
        new_html += "<td><div id='LaunchSim' onclick='vgapDashboard.prototype.changeDefaultMyColor();' title='Default is: Active.'>Use default colors for My Race Only</div></td>";
        new_html += "<td><div id='LaunchSim' onclick='vgapDashboard.prototype.changeColorMod();' title='Default is: Active.'>Activate or Deactivate Color Mod</div></td></tr></table>";
	
	new_html += "<div id='AccountSettings2'><table>";
  	new_html += "<tr><th>Color Settings</th></tr>";

        //html += this.renderSetColorMod("Race 1", "test");
	new_html += "<tr><td>" + "Race 1" + "</td><td><input type='text' id='Race1' onchange='SaveRace();' value='" + colorsA[0] + "'/></td><td><input type='text' id='Race1A' onchange='SaveRace();' value='" + colorsA2[0] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[0] + "), color-stop(1, " + colorsA2[0] + ")); background: -moz-linear-gradient(top left," + colorsA[0] + " 0%, " + colorsA2[0] + " 100%)' type='text' id='IgnoreRace1' value='     '/></td></tr>";
	new_html  += "<tr><td>" + "Race 2" + "</td><td><input type='text' id='Race2' onchange='SaveRace();' value='" + colorsA[1] + "'/></td><td><input type='text' id='Race2A' onchange='SaveRace();' value='" + colorsA2[1] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[1] + "), color-stop(1, " + colorsA2[1] + ")); background: -moz-linear-gradient(top left," + colorsA[1] + " 0%, " + colorsA2[1] + " 100%)' type='text' id='IgnoreRace1' value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 3" + "</td><td><input type='text' id='Race3' onchange='SaveRace();' value='" + colorsA[2] + "'/></td><td><input type='text' id='Race3A' onchange='SaveRace();' value='" + colorsA2[2] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[2] + "), color-stop(1, " + colorsA2[2] + ")); background: -moz-linear-gradient(top left," + colorsA[2] + " 0%, " + colorsA2[2] + " 100%)' type='text' id='IgnoreRace3' value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 4" + "</td><td><input type='text' id='Race4' onchange='SaveRace();' value='" + colorsA[3] + "'/></td><td><input type='text' id='Race4A' onchange='SaveRace();' value='" + colorsA2[3] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[3] + "), color-stop(1, " + colorsA2[3] + ")); background: -moz-linear-gradient(top left," + colorsA[3] + " 0%, " + colorsA2[3] + " 100%)' type='text' id='IgnoreRace4 value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 5" + "</td><td><input type='text' id='Race5' onchange='SaveRace();' value='" + colorsA[4] + "'/></td><td><input type='text' id='Race5A' onchange='SaveRace();' value='" + colorsA2[4] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[4] + "), color-stop(1, " + colorsA2[4] + ")); background: -moz-linear-gradient(top left," + colorsA[4] + " 0%, " + colorsA2[4] + " 100%)' type='text' id='IgnoreRace5' value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 6" + "</td><td><input type='text' id='Race6' onchange='SaveRace();' value='" + colorsA[5] + "'/></td><td><input type='text' id='Race6A' onchange='SaveRace();' value='" + colorsA2[5] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[5] + "), color-stop(1, " + colorsA2[5] + ")); background: -moz-linear-gradient(top left," + colorsA[5] + " 0%, " + colorsA2[5] + " 100%)' type='text' id='IgnoreRace6 value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 7" + "</td><td><input type='text' id='Race7' onchange='SaveRace();' value='" + colorsA[6] + "'/></td><td><input type='text' id='Race7A' onchange='SaveRace();' value='" + colorsA2[6] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[6] + "), color-stop(1, " + colorsA2[6] + ")); background: -moz-linear-gradient(top left," + colorsA[6] + " 0%, " + colorsA2[6] + " 100%)' type='text' id='IgnoreRace7' value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 8" + "</td><td><input type='text' id='Race8' onchange='SaveRace();' value='" + colorsA[7] + "'/></td><td><input type='text' id='Race8A' onchange='SaveRace();' value='" + colorsA2[7] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[7] + "), color-stop(1, " + colorsA2[7] + ")); background: -moz-linear-gradient(top left," + colorsA[7] + " 0%, " + colorsA2[7] + " 100%)' type='text' id='IgnoreRace8 value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 9" + "</td><td><input type='text' id='Race9' onchange='SaveRace();' value='" + colorsA[8] + "'/></td><td><input type='text' id='Race9A' onchange='SaveRace();' value='" + colorsA2[8] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[8] + "), color-stop(1, " + colorsA2[8] + ")); background: -moz-linear-gradient(top left," + colorsA[8] + " 0%, " + colorsA2[8] + " 100%)' type='text' id='IgnoreRace9' value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 10" + "</td><td><input type='text' id='Race10' onchange='SaveRace();' value='" + colorsA[9] + "'/></td><td><input type='text' id='Race10A' onchange='SaveRace();' value='" + colorsA2[9] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[9] + "), color-stop(1, " + colorsA2[9] + ")); background: -moz-linear-gradient(top left, " + colorsA[9] + " 0%, " + colorsA2[9] + " 100%)' type='text' id='IgnoreRace10 value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 11" + "</td><td><input type='text' id='Race11' onchange='SaveRace();' value='" + colorsA[10] + "'/></td><td><input type='text' id='Race11A' onchange='SaveRace();' value='" + colorsA2[10] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[10] + "), color-stop(1, " + colorsA2[10] + ")); background: -moz-linear-gradient(top left, " + colorsA[10] + " 0%, " + colorsA2[10] + " 100%)' type='text' id='IgnoreRace11' value='     '/></td></tr>";
	new_html += "<tr><td>" + "Unoccupied" + "</td><td><input type='text' id='ModInfo' onchange='SaveRace();' value='" + modInfo + "'/></td><td><input type='text' id='ModInfo2' onchange='SaveRace();' value='" + modInfo2 + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + modInfo + "), color-stop(1, " + modInfo2 + ")); background: -moz-linear-gradient(top left, " + modInfo + " 0%, " + modInfo2 + " 100%)' type='text' id='IgnoreInfo value='     '/></td></tr>";
	new_html += "<tr><td>" + "Unknown" + "</td><td><input type='text' id='ModUnknown' onchange='SaveRace();' value='" + modUnknown + "'/></td><td><input type='text' id='ModUnknown2' onchange='SaveRace();' value='" + modUnknown2 + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + modUnknown + "), color-stop(1, " + modUnknown2 + ")); background: -moz-linear-gradient(top left, " + modUnknown + " 0%, " + modUnknown2 + " 100%)' type='text' id='IgnoreUnknown value='     '/></td></tr>";
	new_html += "<tr><td><input type='text' id='ModRace' onchange='SaveRaceNum();' value='" + modRace + "'/></td><td><input type='text' id='ModRace2' onchange='SaveRace();' value='" + colorsA[modRace-1] + "'/></td><td><input type='text' id='ModRace3' onchange='SaveRace();' value='" + colorsA2[modRace-1] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[modRace-1] + "), color-stop(1, " + colorsA2[modRace-1] + ")); background: -moz-linear-gradient(top left, " + colorsA[modRace-1] + " 0%, " + colorsA2[modRace-1] + " 100%)' type='text' id='IgnoreRaceMod value='     '/></td></tr>";
	
	//html += "<tr><td>Test</td>" + "<td>Test2</td>" + "<td><input style='background: -moz-linear-gradient(top left, #ccffff 0%, #00ffff 100%); background: -webkit-gradient(linear, left top, right bottom, color-stop(0, #000000), color-stop(1, #ffffff))' type='text' id='IgnoreMe2' value='     '/></tr></td>";	
	//html += "<tr><td>Test2</td>" + "<td>Test3</td>" + "<td><input style='background: -webkit-gradient(linear, left top, right bottom, color-stop(0, #000000), color-stop(1, #ffffff)) background: -moz-linear-gradient(top left, #ccffff 0%, #00ffff 100%)' type='text' id='IgnoreMe' value='     '/></tr></td>";	
	//html += "<tr><td>Test</td>" + "<td>Test2</td>" + "<td><input style='background: -webkit-gradient(linear, left top, right bottom, color-stop(0, #000000), color-stop(1, #ffffff))' type='text' id='IgnoreMe2' value='     '/></tr></td>";	
    
	 //html += "<tr><td><input style='background: -webkit-gradient(linear, left top, right bottom, from(#ccc), to(#000)); background: -moz-linear-gradient(top,  #ccc,  #000);' type='text' id='IgnoreMe' value='     '</td></tr>";
	 //html += "<tr><td><input style='background: -moz-linear-gradient(top,  #ccc,  #000); background: -webkit-gradient(linear, left top, right bottom, from(#ccc), to(#000)); ' type='text' id='IgnoreMe' value='     '</td></tr>";  

	new_html += "</table></div>";
	
	if (vgaPlanets.prototype.version>=3)
	{
		this.customSettingsContent.push(new_html);
	}
	oldShowSettings.apply(this,arguments);

	if (vgaPlanets.prototype.version<3)
	{
		$('[onclick="vgap.resetTurn();"]').after(new_html);
        	this.pane.jScrollPane();
	}
	if (vgaPlanets.prototype.version>=3)
	{
		this.customSettingsContent.pop();
	}

		
};

SaveRaceNum=function(){
modRace=$("#ModRace").val();//melee race specified
};

SaveRace=function(){

	var i;
	
	if (modRace>11)
		{
		colorsA[modRace-1]=$("#ModRace2").val();
		colorsA2[modRace-1]=$("#ModRace3").val();	
		var String3="Race"+(modRace);
		set_cookie(String3,colorsA[modRace-1],2029,1,1);
		set_cookie(String3+"A",colorsA2[modRace-1],2029,1,1);
		}
	for (i=0;i<11;i++)
	{
		var String="#Race"+(i+1);
		var String2="Race"+(i+1);
		colorsA[i]= $(String).val();
		set_cookie(String2,colorsA[i],2029,1,1);
		colorsA2[i]=$(String+"A").val();
		set_cookie(String2+"A",colorsA2[i],2029,1,1);
	}
	
	modInfo= $("#ModInfo").val();
	modUnknown= $("#ModUnknown").val();
	
	modInfo2= $("#ModInfo2").val();
	modUnknown2= $("#ModUnknown2").val();


	set_cookie("ModInfo",modInfo,2099,1,1);
	set_cookie("ModUnknown",modUnknown,2029,1,1);

	set_cookie("ModInfo2",modInfo2,2014,1,1);
	set_cookie("ModUnknown2",modUnknown2,2029,1,1);
	
if (vgaPlanets.prototype.version<3)
	vgap.map.updateZoom();
else
	{	
	vgap.loadWaypoints();
        vgap.shipScreen.screen.refresh();
	}
	vgap.map.draw();
};

set_cookie=function( name, value, exp_y, exp_m, exp_d, path, domain, secure )
//name=cookie name (required)
//value=cookie value (required)
//exp_y,M,d is expiration year, month, day (if blank cookie will delete when browser closes)
//path=path within site this applies to (can be blank)
//domain=apply only to websites in this domain (can be blank)
//secure=use SSL (leave blank)	

{
  var cookie_string = name + "=" + escape ( value );

  if ( exp_y )
  {
    var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toGMTString();
  }

  if ( path )
        cookie_string += "; path=" + escape ( path );

  if ( domain )
        cookie_string += "; domain=" + escape ( domain );
  
  if ( secure )
        cookie_string += "; secure";
  
  document.cookie = cookie_string;
};

get_cookie =function( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
};

vgapDashboard.prototype.saveToCookie = function(){
//alert("In Function save");
  // set a new cookie
if (defaultMyColor==true)
{
set_cookie("defaultMyColor",1,2029,1,1);
//alert("set to true!!");
}
else{
set_cookie("defaultMyColor",0,2029,1,1);
//alert("set to false!!");
}
    
if (activeColorMod==true)
    set_cookie("activeColorMod",1,2029,1,1);
else 
    set_cookie("activeColorMod",0,2029,1,1);

};


vgapDashboard.prototype.changeColorMod = function(){
 	if (activeColorMod==true) 
	{
	activeColorMod=false;
	alert("The Race Specific Color Mod is now Deactived.");
	}
	else 
	{
	activeColorMod=true;
	alert("The Race Specific Color Mod is now Active.");
  	}
    	vgapDashboard.prototype.saveToCookie()
	vgap.map.updateZoom();
	vgap.map.draw();
};


vgapDashboard.prototype.resetColorModColors = function(){
    alert("Resetting all colors to Mod defaults");

   colorsA =["#F0F8FF","#32CD32","#CD5C5C","#FFC0CB","#98FB98","#C0C0C0","#FFFF00","#EE82EE","#D3D3D3","#B0E0E6","#87CEFA","#7B68EE","#F4A460","#D2B48C","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
   colorsA2 =["#FFFFFF","#006400","#FF0000","#FF69B4","#00FA9A","#6A5ACD","#FFD700","#9400D3","#808080","#00CED1","#4169E1","#7B68EE","#A0522D","#87CEEB","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
   
    modInfo="#F4A460";//chocolate
    modInfo2="#D2691E";//chocolate

    modUnknown="#FFF8DC"; //Tan
    modUnknown2="#D2B48C"; //Tan	
    vgapDashboard.prototype.saveToCookie();
    vgap.map.updateZoom();
    vgap.map.draw();

};

vgapDashboard.prototype.changeDefaultMyColor = function(){
 	if (defaultMyColor==true) 
	{
 	alert("Mod is no longer using Default colors for your race.");
	defaultMyColor=false;
	}
	else 
	{
	alert("Mod will now use Default color (aqua/green) for your race.");
	defaultMyColor=true;
	}
	vgapDashboard.prototype.saveToCookie();
	vgap.map.updateZoom();
	vgap.map.draw();
};

checkColorModSettings = function(){
//Color Mod settings
//if null, then its unset - check the cookie
//if cookie doesn't exist, set to default.
	if (activeColorMod==null)
	{
		var checkActive=null;
		checkActive=get_cookie("activeColorMod");
		if (checkActive==null)
			{
			activeColorMod=true;//no cookie,  set to default
			}
		else if (checkActive==1)
			{
			activeColorMod=true;
			}
		else 
			{
			activeColorMod=false;
			}
	}

    
    if (defaultMyColor==null)
	{
		var checkColor=null;
		checkColor=get_cookie("defaultMyColor");
		if (checkColor==null)
			{
			defaultMyColor=true;//no cookie,  set to default
			}
		else if (checkColor==1)
			{
			defaultMyColor=true;
			}
		else 
			{
			defaultMyColor=false;
			}
	}

    if (useCustomColor==false)
	//have not checked cookies yet
	{
	var i;
	var checkColor=null;

	for (i=0;i<30;i++)
	{
		var String="Race"+(i+1);
		checkColor=get_cookie(String);
		if (checkColor) 
			colorsA[i]=checkColor;
		checkColor=null;
		checkColor=get_cookie(String+"A");
		if (checkColor) colorsA2[i]=checkColor;
		checkColor=null;
	}

	checkColor=get_cookie("ModInfo");
	if (checkColor) modInfo=checkColor;
	checkColor=null;
	checkColor=get_cookie("ModUnknown");
	if (checkColor) modUnknown=checkColor;
	checkColor=null;

	checkColor=get_cookie("ModInfo2");
	if (checkColor) modInfo2=checkColor;
	checkColor=null;
	checkColor=get_cookie("ModUnknown2");
	if (checkColor) modUnknown2=checkColor;	
	//set var so we know cookies have been checked
	useCustomColor=true;
	} 
};


} //wrapper for injection




var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);