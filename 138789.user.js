// ==UserScript==
// @name          Planets.nu check for material to build starbase
// @description   Circles planets with enough materials to build a starbase.  Estimates how many turns off that may be.
// @include       http://planets.nu/*
// @include       http://*.planets.nu/*
// @homepage      http://planets.nu/discussion/utility-script-check-material-to-build-starbase
// @version 1.31
// ==/UserScript==

function wrapper () {	// checkstarbase.js
	
	var oldLoadControls = vgapMap.prototype.loadControls; 
	vgapMap.prototype.loadControls = function () {

        oldLoadControls.apply(this, arguments);
        
        var b = "<li onclick='vgap.map.checkStarBase();'>Check for StarBases</li>";
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
	    	if (localStorage.starbaseTurnsAway == null)
	    		localStorage.starbaseTurnsAway = "3";
    	}
    };
	
	var oldShowSettings = vgapDashboard.prototype.showSettings;
	vgapDashboard.prototype.showSettings = function () {

		oldShowSettings.apply(this,arguments);
   
		var b = "<br><h3>Check for starbases</h3>";
		
		b += "<div id='turnsAway'><table>";
		b += "<tr><td><input id='starbaseTurnsAway' type='range' value=" + localStorage.starbaseTurnsAway + " min='1' max='6' /></td>";
		b += "<td>Go how many turns into future? (colors for 1 to 6 turns are red, orange, yellow, green, blue, purple)</td></tr>";
		b += "</table></div>";
   
		$('[onclick="vgap.resetTurn();"]').after(b);

	    this.pane.jScrollPane();
	};

	var oldSaveSettings = vgapDashboard.prototype.saveSettings;
	vgapDashboard.prototype.saveSettings = function() {
		
		$("#turnsAway input[type='range']").each(function(b) {
			localStorage[$(this).attr("id")] = $(this).val();
		});
	    
		oldSaveSettings.apply(this,arguments);
	};

    vgapMap.prototype.checkStarBase = function () 		// figure out how fast we can build a starbase based on current mining rates
	{
		var colors = ["red", "orange", "yellow", "green", "blue", "purple"];

//		if (this.explosions !== undefined)
//	        this.explosions.remove();
//        this.explosions = this.paper.set();
	    
	    for (var i = 0; i < vgap.myplanets.length; i++) {
			var planet = vgap.myplanets[i];

			var starbase = vgap.getStarbase(planet.id);
			if (!starbase) {

				var dur = planet.duranium;
				var tri = planet.tritanium;
				var mol = planet.molybdenum;
				var sup = planet.supplies + planet.megacredits;

				for (var j = 0; j < localStorage.starbaseTurnsAway; ++j) {
					if (dur >= 120 && tri >= 402 && mol >= 340 && sup >= 900) {
						var a = { stroke: colors[j], "stroke-width": 8 * this.zoom, "stroke-opacity": 1 };
			            var g = vgap.map.screenX(planet.x);
			            var h = vgap.map.screenY(planet.y);
						vgap.map.explosions.push(vgap.map.paper.circle(g, h, 18 * this.zoom).attr(a));
//						this.drawCircle(planet.x, planet.y, 18 * this.zoom, a);
						break;
					}

					dur += vgap.map.mining(planet, planet.densityduranium, planet.groundduranium);
					tri += vgap.map.mining(planet, planet.densitytritanium, planet.groundtritanium);
					mol += vgap.map.mining(planet, planet.densitymolybdenum, planet.groundmolybdenum);

					sup += planet.factories + planet.nativetaxvalue + planet.clans * planet.colonisttaxrate / 1000;
				}
			}
		}
	};

    
	vgapMap.prototype.mining = function(planet, percent, inground) {
		var rate = vgap.miningRate(planet, percent);
	    return Math.min(inground, rate);
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
