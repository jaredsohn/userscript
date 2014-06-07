// ==UserScript==
// @name          Planets.nu game history
// @description   Show game history
// @include       http://planets.nu/*
// @include       http://*.planets.nu/*
// @homepage      http://planets.nu/discussion/utility-script-game-history
// @version 1.21
// ==/UserScript==

function wrapper () { // wrapper for injection

	var oldLoadControls = vgapMap.prototype.loadControls; 
	vgapMap.prototype.loadControls = function () {

		oldLoadControls.apply(this, arguments);

		var b = "";
        b += "<li onclick='vgap.loadCompleteHistory();'>Load History</li>";
        
        $("#MapTools li:contains('Measure')").after(b);
           
        vgap.map.colorsA = [];
        vgap.map.colorsA2 = [];
        vgap.map.colorsA[0]  = "hsl(0,0,128)";
        vgap.map.colorsA2[0] = "hsl(0,0,16)";
    	
        for (var i=1; i<=vgap.game.slots; ++i) {
        	vgap.map.colorsA[i]  = "hsl("+(i/vgap.game.slots*239)+",240,128)";
        	vgap.map.colorsA2[i] = "hsl("+(i/vgap.game.slots*239)+",240,32)";
        }
	};
    
	vgaPlanets.prototype.loadCompleteHistory = function () {
	    var b = "<div id='rNav'></div>";
		$("#PlanetsContainer").append(b);

		vgap.history = [];
		for (var i=0; i<=vgap.settings.turn; ++i) {
    		vgap.history[i] = {};
    		vgap.history[i].planets = [];
    		vgap.history[i].ships = [];
    		vgap.history[i].ionstorms = [];
    		vgap.history[i].starbases = [];
    		vgap.history[i].messages = [];
    		vgap.history[i].messageMap = [];
    		vgap.history[i].minefields = [];
    		vgap.history[i].notes = [];
		}
		
       vgap.loadTurns(1, 1);
	   vgap.map.drawTurn(0);
	};
	
	vgaPlanets.prototype.loadTurns = function(player, turn) {
		
        vgap.indicator.text(player+" - "+turn);
        vgap.indicateOn();
        
		var a = new dataObject();
		a.add("gameid", vgap.gameId);
		a.add("apikey", "null");
		a.add("forsave", true);
		a.add("playerid", player);
		a.add("turn", turn);

		try {
			vgap.request("/game/loadturn", a, function(b) {
				if (b != null && b.success == true) {
					vgap.cacheFromRST(b);
					delete b;
				}

				vgap.loadNextTurn(player, turn);
			});
		}
		catch (e) {
			vgap.loadNextTurn(player, turn);
		}
		
		delete a;
	};
	
    vgaPlanets.prototype.loadNextTurn = function (player, turn) {
		var p = player;
		var t = turn;
		if (++p > 11/*vgap.game.slots*/) {
			p = 1;
			if (++t > vgap.game.turn) {
				vgap.map.drawTurn(vgap.game.turn);
				return;
			}
		}
		
		vgap.loadTurns(p, t);
		
		if (t != turn)
			vgap.map.drawTurn(turn);
	};
	
    vgaPlanets.prototype.cacheFromRST = function(b) {
        var a = b.rst.settings.turn;
        var player = b.rst.player.id;
        
        for (var i = 0; i < b.rst.planets.length; ++i) {
            var planet = b.rst.planets[i];
            if (vgap.history[a].planets[planet.id] == undefined || planet.ownerid == player)
                vgap.history[a].planets[planet.id] = planet;
        }
        
        for (var i = 0; i < b.rst.ships.length; ++i) {
            var ship = b.rst.ships[i];
            for (var d = 0; d < vgap.history[a].ships.length; d++) 
                if (vgap.history[a].ships[d].id == ship.id) 
                	break;
            if (d == vgap.history[a].ships.length)
            	vgap.history[a].ships.push(ship);
            else if (ship.ownerid == player)
            	vgap.history[a].ships[d] = ship;
        }
        
        for (var i = 0; i < b.rst.starbases.length; ++i) {
            var starbase = b.rst.starbases[i];
            if (!vgap.getArray(vgap.history[a].starbases, starbase.id))
            	vgap.history[a].starbases.push(starbase);
        }
        
        for (var i = 0; i < b.rst.minefields.length; ++i) {
            var minefield = b.rst.minefields[i];
            if (!vgap.getArray(vgap.history[a].minefields, minefield.id))
            	vgap.history[a].minefields.push(minefield);
        }
        
        for (var i = 0; i < b.rst.ionstorms.length; ++i) {
            var ionstorm = b.rst.ionstorms[i];
            if (!vgap.getArray(vgap.history[a].ionstorms, ionstorm.id))
            	vgap.history[a].ionstorms.push(ionstorm);
        }

        for (var i = 0; i < b.rst.messages.length; ++i) {
            var message = b.rst.messages[i];
            if (message.messagetype == 10) {
            	if (vgap.history[a].messageMap[message.x+","+message.y] == undefined) {
            		vgap.history[a].messageMap[message.x+","+message.y] = message;
            		vgap.history[a].messages.push(message);
            	}
            }
        }
        
//        for (var i = 0; i < b.rst.notes.length; ++i) {
//            var note = b.rst.notes[i];
//            vgap.history[a].notes.push(note);
//        }
    };
    
    vgapMap.prototype.drawTurn = function(t) {
	    var b = "";
	    if (t == 1)
	    	b += "<div id='rNav'><a disabled='disabled' class='rNavLeft'>back</a>";
	    else
	    	b += "<div id='rNav'><a onclick='vgap.map.drawTurn("+(t-1)+");' class='rNavLeft'>back</a>";
    	b += "<span id='rNavState'>Turn "+t+"</span>";
    	if (t < vgap.game.turn)
		    b += "<a onclick='vgap.map.drawTurn("+(t+1)+");' class='rNavRight'>next</a></div>";
    	else
    		b += "<a disabled='disabled' class='rNavRight'>next</a></div>";
		
		$("#rNav").replaceWith(b);
		
	    if (t != vgap.historyDrawn || t == 0) {
	    	vgap.historyDrawn = t;
	
	        for (var i = 0; i < vgap.planets.length; ++i) {
	        	var planet = vgap.planets[i];
	        	if (vgap.history[t].planets[i] != undefined) {
	        		vgap.planets[i] = vgap.history[t].planets[i];
	        		planet = vgap.planets[i];
	        	}
	        	else {
	        		planet.infoturn = 0;
	        		planet.ownerid = 0;
	        	}
	        	
	        	vgap.planetMap[planet.x+","+planet.y] = planet;
	        }	
	        
	        vgap.starbases = vgap.history[t].starbases;
	        vgap.ionstorms = vgap.history[t].ionstorms;
	        vgap.messages = vgap.history[t].messages;
	        vgap.minefields = vgap.history[t].minefields;
//	        vgap.notes = vgap.history[t].notes;
	        vgap.ships = vgap.history[t].ships;
	        
	        delete vgap.shipMap;
	        vgap.shipMap = [];
	        
	        for (var i = 0; i < vgap.ships.length; ++i) {
	        	var ship = vgap.ships[i];
	        	if (vgap.shipMap[ship.x+","+ship.y] == undefined)
	        		vgap.shipMap[ship.x+","+ship.y] = [];
	        	vgap.shipMap[ship.x+","+ship.y].push(ship);
	        }	
	        
	        vgap.map.canvasRendered = false;
	        vgap.map.drawMap();
	    }
    };
   	
	vgapMap.prototype.draw = function() {
	    this.paper.safari();
	    vgap.connectionsActivated = 0;
	    vgap.planetsNamesActivated = 0;
	    this.totalDist = 0;
	    this.firstX = null;
	    this.firstY = null;
	    this.measure = false;
	    $("body").css("cursor", "");
	};
	
    vgapMap.prototype.drawMap = function() {
        if (!vgap.map.canvasRendered) {
	        vgap.map.paper.clear();
	        
	        if (this.zoom < 20) {
	        	vgap.map.drawNotes();
	        	vgap.map.drawIonStorms();
	        	vgap.map.drawMinefields();
	        }
        	vgap.map.drawWaypoints();
	        vgap.map.drawShips();
        	vgap.map.drawPlanets();
        	
	        if (this.zoom < 20) {
	        	vgap.map.drawExplosions();
	        	vgap.map.drawStarBases();
	        }
        }
	 
        vgap.map.canvasRendered = true;
    };
    
    vgapMap.prototype.highlight = function() {
//    	if (this.hlight == undefined)
//    		this.hlight = this.paper.set();
//   		this.hlight.clear();	
//        this.hlight.push(this.paper.circle(this.screenX(this.centerX), this.screenY(this.centerY), 20).attr({stroke: "#0099ff","stroke-width": "3","stroke-opacity": "1"}));
    };
    
    vgapMap.prototype.centered = function() {
//		if (this.hlight == undefined)
//			this.hlight = this.paper.set();
//		this.hlight.clear();	
	    this.centering = false;
	    if (vgap.map.onCenter) {
	        vgap.map.onCenter();
	        vgap.map.onCenter = null;
	    }
    };
            
    vgapMap.prototype.updateZoom = function() {
        var a = 4000 * this.zoom;
        this.resetBoundary(this.centerX, this.centerY);
        this.createCanvasArray();
        this.paperDiv.width(a);
        this.paperDiv.height(a);
        this.mapCover.width(a);
        this.mapCover.height(a);
        this.mapDiv.width(a);
        this.mapDiv.height(a);
        this.paper.setSize(a, a);
        this.moveMap();
        this.loc.html("<div class='ItemSelection_border'><div class='ItemSelectionBox minCorrection'>Zoom: " + this.zoom * 100 + "% </div></div>");
    };
    	
    vgapMap.prototype.drawPlanets = function() {
    	if (this.planets == undefined)
    		this.planets = this.paper.set();
   		this.planets.clear();	
        
        if (vgap.nebulas) {
        	for (var p = 0; p < vgap.nebulas.length; p++) {
                var N = vgap.nebulas[p];
                var x = this.screenX(N.x);
                var y = this.screenY(N.y);
                var G = N.radius * this.zoom;
                
                var s  = "hsl("+(N.gas/5*239)+",240,75)";
                var e  = "hsl("+(N.gas/5*239)+",240,16)";
                 
                var c = {fill:"r"+s+"-"+e, "fill-opacity":0.01, "stroke-opacity":0};
                this.planets.push(vgap.map.paper.circle(x, y, G).attr(c));
            }
        }
        if (vgap.stars) {
            for (var p = 0; p < vgap.stars.length; p++) {
                var S = vgap.stars[p];
                var x = this.screenX(S.x);
                var y = this.screenY(S.y);
                var G = S.radius * this.zoom;
                var g = G/4;
                var k = Math.sqrt(S.mass) * this.zoom;
                
                var start  = "red";
                if (S.temp > 3000 && S.temp <= 6000) 
                    start  = "yellow";
                else if (S.temp <= 10000) 
                    start  = "brown";
                else if (S.temp <= 20000) 
                    start  = "white";
                else 
                    start  = "blue";

                var a = {fill:"r "+start+"-black", "fill-opacity":.01, "stroke-opacity":0};
                this.planets.push(vgap.map.paper.circle(x, y, k).attr(a));

                a = {fill:"white", "fill-opacity":.04, "stroke-opacity":0};
                this.planets.push(vgap.map.paper.circle(x, y, G).attr(a));
                a = {fill:"white", "fill-opacity":.2, "stroke-opacity":0};
                this.planets.push(vgap.map.paper.circle(x, y, g).attr(a));
            }
        }

        for (var i = 0; i < vgap.planets.length; ++i) {                            
        	var planet = vgap.planets[i];
            var x = this.screenX(planet.x);
            var y = this.screenY(planet.y);
            var G = Math.min(30, Math.max(6 * this.zoom, 3));
            var c = {fill:"0-"+vgap.map.colorsA[planet.ownerid]+"-"+vgap.map.colorsA2[planet.ownerid]};
            
            if (planet.debrisdisk >= 1) {
            	G = planet.debrisdisk * this.zoom;
            	if (planet.debrisdisk > 1)
            		c = {fill:"r gray-black", "fill-opacity":.01, "stroke-opacity":0};
            }

            this.planets.push(vgap.map.paper.circle(x, y, G).attr(c));
        }
    };
    
    vgapMap.prototype.drawStarBases = function() {
    	if (this.starbases == undefined)
    		this.starbases = this.paper.set();
    	this.starbases.clear();

        var G =  Math.min(20, Math.max(8 * this.zoom, 6));
        var g = G / 2;
	    var a = {stroke: "white","stroke-width": "1","stroke-opacity": .75};
        
	   	for (var i=0; i<vgap.starbases.length; ++i) {
    		var starbase = vgap.starbases[i];
    		var planet = vgap.planets[starbase.planetid-1];
			var x = this.screenX(planet.x);
			var y = this.screenY(planet.y);
			if (this.zoom < 1) {
                var el = this.paper.path("M" + (x + g) + "," + y + "L" + (x - g) + "," + y).attr(a);
                this.starbases.push(el.transform("r90"));
                this.starbases.push(this.paper.path("M" + (x + g) + "," + y + "L" + (x - g) + "," + y).attr(a));
			}
			else 
				this.starbases.push(vgap.map.paper.image(STARBASE_ICON, x - g, y - g, G, G));
 	    }
	};
    
    vgapMap.prototype.drawShips = function() {
    	if (this.ships == undefined)
    		this.ships = this.paper.set();
    	this.ships.clear();

        var G =  Math.min(10, Math.max(6 * this.zoom, 5));
        
    	for (var i = 0; i < vgap.ships.length; ++i) {
    		var ship = vgap.ships[i];
			var x = this.screenX(ship.x) - G / 2;
			var y = this.screenY(ship.y) - G / 2;
			
    		var t = "t"+8*this.zoom+",0";
    		var l = vgap.shipMap[ship.x+","+ship.y];
    		
			for (var k=0; k<l.length; ++k) {
			    var s = l[k];
    			c = {fill:vgap.map.colorsA[s.ownerid]};
    			var el = vgap.map.paper.rect(x, y, G, G).attr(c);
    			this.ships.push(el.transform("r"+k*45+t));
			}
    	}
    };
    
	vgapMap.prototype.drawWaypoints = function()
	{        
		if (this.waypoints == undefined)
			this.waypoints = this.paper.set();
        this.waypoints.clear();
		var d;
		
		for (var i=0; i<vgap.ships.length; ++i) {
			var ship = vgap.ships[i];
				if (vgap.isChunnelling(ship)) {
	            	var m = Number(ship.friendlycode);
	                var to = vgap.getShip(m);
                	d = {"stroke":vgap.map.colorsA2[ship.ownerid], "stroke-width":2, "stroke-dasharray":"-", "stroke-opacity":0.5};
	                if (localStorage.waypointChunnel == "true")
	                	d = {"stroke":vgap.map.colorsA2[ship.ownerid], "stroke-width":2, "arrow-end":"classic-wide-long", "stroke-dasharray":"-", "stroke-opacity":0.5};
	                this.waypoints.push(this.paper.path("M" + this.screenX(ship.x) + " " + this.screenY(ship.y) + "L" + this.screenX(to.x) + " " + this.screenY(to.y)).attr(d));
	            	   
	            }
				else if (vgap.isHyping(ship)) {
                	d = {"stroke":vgap.map.colorsA2[ship.ownerid], "stroke-width":2, "stroke-dasharray":".", "stroke-opacity":0.5};
	                if (localStorage.waypointHYP == "true")
	                	d = {"stroke": vgap.map.colorsA2[ship.ownerid], "stroke-width": 2, "arrow-end":"classic-wide-long", "stroke-dasharray": ".", "stroke-opacity": 0.5};
		            this.waypoints.push(this.paper.path("M" + this.screenX(ship.x) + " " + this.screenY(ship.y) + "L" + this.screenX(ship.targetx) + " " + this.screenY(ship.targety)).attr(d));
	            }
				else {
		            var k = vgap.getSpeed(ship.warp, ship.hullid);
		            if (k && ship.heading != -1) {
			            var n = ship.x + Math.round(Math.sin(Math.toRad(ship.heading)) * k);
			            var o = ship.y + Math.round(Math.cos(Math.toRad(ship.heading)) * k);
		                d = {"stroke":vgap.map.colorsA2[ship.ownerid], "stroke-width": 2, "stroke-opacity": 0.5};
			            this.waypoints.push(this.paper.path("M" + this.screenX(ship.x) + " " + this.screenY(ship.y) + "L" + this.screenX(n) + " " + this.screenY(o)).attr(d));
					}
			}
        }
	};

	vgapMap.prototype.drawExplosions = function() {
    	if (this.explosions == undefined)
    		this.explosions = this.paper.set();
    	this.explosions.clear();

        var G =  Math.min(10, Math.max(8 * this.zoom, 6));
        var a = {stroke: "red","stroke-width": "1","stroke-opacity": 0.5};

        for (var b in vgap.messages) {
            var c = vgap.messages[b];
            if (c.messagetype == 10) {
                var d = this.screenX(c.x);
                var e = this.screenY(c.y);
                var el = this.paper.path("M" + (d - G) + "," + e + "L" + (d + G) + "," + e).attr(a);
                this.explosions.push(el);
                el = this.paper.path("M" + (d - G) + "," + e + "L" + (d + G) + "," + e).attr(a);
                this.explosions.push(el.transform("r120"));
                el = this.paper.path("M" + (d - G) + "," + e + "L" + (d + G) + "," + e).attr(a);
                this.explosions.push(el.transform("r240"));
            }
        }
	};
        
    vgapMap.prototype.drawIonStorms = function() {
    	if (this.ionstorms == undefined)
    		this.ionstorms = this.paper.set();
    	this.ionstorms.clear();
        
        for (var b = 0; b < vgap.ionstorms.length; b++) {
            var d = vgap.ionstorms[b];
            var a = "yellow";
            
            var c = 0.05;
            if (d.voltage >= 50) 
                c = 0.075;
            if (d.voltage >= 100) 
                c = 0.1;
            if (d.voltage >= 150) 
                c = 0.15;
            if (d.voltage >= 200) 
                c = 0.2;

            this.ionstorms.push(this.paper.circle(this.screenX(d.x), this.screenY(d.y), (d.radius * this.zoom)).attr({fill:a,"fill-opacity": c, "stroke-opacity":0}));
            
            var e = d.x + Math.round(Math.sin(Math.toRad(d.heading)) * d.warp * d.warp);
            var f = d.y + Math.round(Math.cos(Math.toRad(d.heading)) * d.warp * d.warp);
            this.ionstorms.push(this.paper.path("M" + this.screenX(d.x) + " " + this.screenY(d.y) + "L" + this.screenX(e) + " " + this.screenY(f)).attr({stroke: a,"stroke-width": "1","stroke-opacity": c * 2}));
	    }
    };
    
    vgapMap.prototype.drawMinefields = function() {
    	if (this.minefields == undefined)
    		this.minefields = this.paper.set();
    	this.minefields.clear();

    	for (var c = 0; c < vgap.minefields.length; c++) {
            var d = vgap.minefields[c];
            var b = vgap.map.colorsA[d.ownerid];
            var a = {stroke: b,"stroke-width": "1","stroke-opacity": 0.5,fill: b,"fill-opacity": 0.2};
            this.minefields.push(this.paper.circle(this.screenX(d.x), this.screenY(d.y), (d.radius * this.zoom)).attr(a));
        }
    };

}
	
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
