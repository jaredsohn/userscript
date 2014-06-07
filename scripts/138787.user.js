// ==UserScript==
// @name          Planets.nu check for ready
// @description   Circles planets, ships & starbases that are not marked ready.
// @include       http://planets.nu/*
// @include       http://*.planets.nu/*
// @homepage      http://planets.nu/discussion/utility-script-marks-objects-not-ready
// @version 1.31
// ==/UserScript==

function wrapper () { // checkready.js
	
	var oldLoadControls = vgapMap.prototype.loadControls; 
	vgapMap.prototype.loadControls = function () {

        oldLoadControls.apply(this, arguments);
        
        var b = "<li onclick='vgap.map.checkReady();'>Check Ready</li>";
        $("#MapTools li:contains('Measure')").after(b);
        
        b = "<li class='ClearMap' onclick='vgap.deselectAll();'>Clear (x)</li>";		// menu and hotkey called different functions
        $("#MapTools li:contains('Clear')").replaceWith(b);

        var height = this.controls.height() - this.toolsMenu.height();
        this.controls.css("marginTop", "-" + this.controls.height() + "px");
    };

    var oldProcessLoad = vgaPlanets.prototype.processLoad;
    vgaPlanets.prototype.processLoad = function(f) {
    	
    	oldProcessLoad.apply(this,arguments);
    	
    	if(typeof(Storage)!=="undefined") {
	    	if (localStorage.planetNotReady == null)
	    		localStorage.planetNotReady = "#80ffff";
	    	if (localStorage.starbaseNotReady == null)
	    		localStorage.starbaseNotReady = "00ff40";
	    	if (localStorage.shipNotReady == null)
	    		localStorage.shipNotReady = "ffff00";
	    	if (localStorage.hypWarning == null)
	    		localStorage.hypWarning = "ff8040";
    	}
    };
	
	var oldShowSettings = vgapDashboard.prototype.showSettings;
	vgapDashboard.prototype.showSettings = function () {

		oldShowSettings.apply(this,arguments);
   
		var b = "<br><h3>Check not ready</h3>";
		
		b += "<div id='notReadyOptions'><table>";
		b += "<tr><td><input id='planetNotReady' type='color' value=" + localStorage.planetNotReady + " /></td><td>Planet not ready        </td>";
		b += "<td><input id='starbaseNotReady' type='color' value=" + localStorage.starbaseNotReady + " /></td><td>Starbase not ready</td></tr>";
		b += "<tr><td><input id='shipNotReady' type='color' value=" + localStorage.shipNotReady + " /></td><td>Ship not ready</td>";
		b += "<td><input id='hypWarning' type='color' value=" + localStorage.hypWarning + " /></td><td>HYP warning</td></tr>";
		b += "</table></div>";
   
		$('[onclick="vgap.resetTurn();"]').after(b);

	    this.pane.jScrollPane();
	};

	var oldSaveSettings = vgapDashboard.prototype.saveSettings;
	vgapDashboard.prototype.saveSettings = function() {

		$("#notReadyOptions input[type='color']").each(function(b) {
			localStorage[$(this).attr("id")] = $(this).val();
		});

		oldSaveSettings.apply(this,arguments);
	};

	vgapMap.prototype.checkReady = function () 
	{
		if (this.explosions !== undefined)
	        this.explosions.remove();
        this.explosions = this.paper.set();
	    
		var a = { "text-anchor":"start", "fill":"white" };
		
		for (var i = 0; i < vgap.myplanets.length; i++) {	// check ready status for planets draw circle if not done
			var planet = vgap.myplanets[i];
			if (planet.readystatus == 0) {
				var b = { stroke: localStorage.planetNotReady, "stroke-width": 2, "stroke-opacity": 1 };
	            var g = vgap.map.screenX(planet.x);
	            var h = vgap.map.screenY(planet.y);
				vgap.map.explosions.push(vgap.map.paper.circle(g, h, 10 * this.zoom).attr(b));
//					this.drawCircle(planet.x, planet.y, 10 * this.zoom, { stroke: "purple", "stroke-width": 2, "stroke-opacity": 1 });
			}

			if (isNaN(planet.friendlycode)) {
				var str = planet.friendlycode;					// warn for non numeric friendly code
				str = str.toString();
				this.drawText(planet.x+20, planet.y+20, str, a);
			}
		}

		for (var i = 0; i < vgap.mystarbases.length; i++) {	// ready starbase?
			var starbase = vgap.mystarbases[i];
			var planet = vgap.getPlanet(starbase.planetid);
			if (starbase.readystatus == 0) {
				var c = { stroke: localStorage.starbaseNotReady, "stroke-width": 2, "stroke-opacity": 1 };
	            var g = vgap.map.screenX(planet.x);
	            var h = vgap.map.screenY(planet.y);
				vgap.map.explosions.push(vgap.map.paper.circle(g, h, 13 * this.zoom).attr(c));
//					this.drawCircle(planet.x, planet.y, 15 * this.zoom, { stroke: "blue", "stroke-width": 2, "stroke-opacity": 1 });
			}
		}

		for (var i = 0; i < vgap.myships.length; i++) {		// ready ship?
			var ship = vgap.myships[i];
			if (ship.readystatus == 0) {
				var d = { stroke: localStorage.shipNotReady, "stroke-width": 2, "stroke-opacity": 1 };
	            var g = vgap.map.screenX(ship.x);
	            var h = vgap.map.screenY(ship.y);
				vgap.map.explosions.push(vgap.map.paper.circle(g, h, 16 * this.zoom).attr(d));
//					this.drawCircle(ship.x, ship.y, 20 * this.zoom, { stroke: "green", "stroke-width": 2, "stroke-opacity": 1 });
			}

			var dist = vgap.map.getDist(ship.x, ship.y, ship.targetx, ship.targety);
			var str = ship.friendlycode;
			str = str.toString();

			if (isNaN(str) && !str.match(/hyp/i))	// warn on friendly code
				this.drawText(ship.x+20, ship.y+20, str, a);

			if (str == str.match(/hyp/i) && (ship.neutronium < 50 || dist < 340 || dist > 360) ||		// warn on invalid HYP
			   (str != str.match(/hyp/i) || ship.neutronium < 50) && dist >= 340 && dist <= 360) {
				var e = { stroke: localStorage.hypWarning, "stroke-width": 4 * this.zoom, "stroke-opacity": 1 };
	            var g = vgap.map.screenX(ship.x);
	            var h = vgap.map.screenY(ship.y);
				vgap.map.explosions.push(vgap.map.paper.circle(g, h, 19 * this.zoom).attr(e));
//					this.drawCircle(ship.x, ship.y, 20 * this.zoom, { stroke: "red", "stroke-width": 4 * this.zoom, "stroke-opacity": 1 });
			}
		}

	};

	var oldDeselectAll = vgaPlanets.prototype.deselectAll;
	
	vgaPlanets.prototype.deselectAll = function() {
		if (vgap.map.explosions !== undefined)
			vgap.map.explosions.remove();
		vgap.map.explosions = vgap.map.paper.set();

        oldDeselectAll.apply(this, arguments);
	};

};

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
