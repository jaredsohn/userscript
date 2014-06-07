// ==UserScript==
// @name          planets.nu display minerals
// @description   add check box to map screen to display minerals on planets and ships
// @include       http://planets.nu/*
// @include       http://*.planets.nu/*
// @homepage      http://planets.nu/discussion/utility-script-show-minerals-checkboxes
// @version 1.21
// ==/UserScript==

function wrapper () { // showMinerals.js

	var oldLoadControls = vgapMap.prototype.loadControls; 
	vgapMap.prototype.loadControls = function () {

		oldLoadControls.apply(this, arguments);

        if (vgap.map.mineralsShow === undefined) {
        	vgap.map.mineralsShow = [];
        	vgap.map.mineralsShow.neu = false;
        	vgap.map.mineralsShow.dur = false;
        	vgap.map.mineralsShow.tri = false;
        	vgap.map.mineralsShow.mol = false;
        	vgap.map.mineralsShow.sup = false;
        	vgap.map.mineralsShow.cre = false;
        	vgap.map.mineralsShow.gnd = false;
        	vgap.map.mineralsShow.col = false;
        }
        
        vgap.map.buildMineralsControl();

        $("#MapTools .ShowMinerals").remove();

        var b = "<li class='Measure' onclick='vgap.map.showMineralsCheck();'>Show Minerals</li>";
        b += '<li class="Measure" onclick="vgap.map.drawPlanetNames();">Names (p)</li>';
        b += '<li class="Measure" onclick="vgap.map.showFindObjectFeature();">Search (s)</li>';
        b += '<li class="Measure" onclick="vgap.map.showConnections();">Connections (q)</li>';
        b += '<li class="Measure" onclick="vgap.map.showRange();">Toggle Range</li>';
        $("#MapTools li:contains('Measure')").after(b);
        
        b = "<li class='ClearMap' onclick='vgap.deselectAll();'>Clear (x)</li>";		// menu and hotkey called different functions
        $("#MapTools li:contains('Clear')").replaceWith(b);
	};
    	
	var oldProcessLoad = vgaPlanets.prototype.processLoad;
    vgaPlanets.prototype.processLoad = function(f) {
    	
    	oldProcessLoad.apply(this,arguments);
    	
    	if(typeof(Storage)!=="undefined") {
	    	if (localStorage.showAlliedMinerals == undefined) {
	    		localStorage.showAlliedMinerals = "false";
	    	}
    	}
   };
	
	var oldShowSettings = vgapDashboard.prototype.showSettings;
	vgapDashboard.prototype.showSettings = function () {

		oldShowSettings.apply(this,arguments);
   
		var b = "<br><h3>Show Minerals</h3>";
		
		b += "<div id='showMineralsOptions'><table>";
		b += "<tr><td><input id='showAlliedMinerals' type='checkbox'" + (localStorage.showAlliedMinerals == "true" ? "checked='true'" : "") + "/>";
		b += 	 " Show Allied Minerals</td></tr>";

		b += "</table></div>";
   
		$('[onclick="vgap.resetTurn();"]').after(b);
		
	    this.pane.jScrollPane();
	};

	var oldSaveSettings = vgapDashboard.prototype.saveSettings;
	vgapDashboard.prototype.saveSettings = function() {
		
	    $("#showMineralsOptions :checkbox").each(function(a) {
	        localStorage[$(this).attr("id")] = $(this).is(":checked");
	    });
    	
		oldSaveSettings.apply(this,arguments);
	};

	vgapMap.prototype.hideMineralsCheck = function () {
		vgap.map.mineralsControl.hide();
        vgap.deselectAll();

        b = "<li class='Measure' onclick='vgap.map.showMineralsCheck();'>Show Minerals</li>";
        $("#MapTools li:contains('Hide Minerals')").replaceWith(b);
	};
	
	vgapMap.prototype.showMineralsCheck = function () {
		vgap.map.mineralsControl.show();
        vgap.deselectAll();

        b = "<li class='Measure' onclick='vgap.map.hideMineralsCheck();'>Hide Minerals</li>";
        $("#MapTools li:contains('Show Minerals')").replaceWith(b);
	};

	vgapMap.prototype.buildMineralsControl = function () {
		var b = "<div id='mineralsControl'><table>";
		b += "<tr><td style='color:#fe403f'><input id='neu' type='checkbox'" + (vgap.map.mineralsShow.neu ? "checked='true'" : "") + "onchange='vgap.map.displayMinerals()'/>&nbsp;&nbsp;Neutronium</td>";
		b +=     "<td style='color:#b401c9'><input id='dur' type='checkbox'" + (vgap.map.mineralsShow.dur ? "checked='true'" : "") + "onchange='vgap.map.displayMinerals()'/>&nbsp;&nbsp;Duranium</td>";
		b +=     "<td style='color:#2c55fc'><input id='tri' type='checkbox'" + (vgap.map.mineralsShow.tri ? "checked='true'" : "") + "onchange='vgap.map.displayMinerals()'/>&nbsp;&nbsp;Tritanium</td>";
		b +=     "<td style='color:#05db9d'><input id='mol' type='checkbox'" + (vgap.map.mineralsShow.mol ? "checked='true'" : "") + "onchange='vgap.map.displayMinerals()'/>&nbsp;&nbsp;Molybdenum</td></tr>";
		b += "<tr><td><input id='gnd' type='checkbox'" + (vgap.map.mineralsShow.gnd ? "checked='true'" : "") + "onchange='vgap.map.displayMinerals()'/>&nbsp;&nbsp;In Ground</td>";
		b += 	 "<td><input id='col' type='checkbox'" + (vgap.map.mineralsShow.col ? "checked='true'" : "") + "onchange='vgap.map.displayMinerals()'/>&nbsp;&nbsp;Colonist</td>";
		b += 	 "<td style='color:#6df51b'><input id='sup' type='checkbox'" + (vgap.map.mineralsShow.sup ? "checked='true'" : "") + "onchange='vgap.map.displayMinerals()'/>&nbsp;&nbsp;Supplies</td>";
		b +=     "<td style='color:#ea850e'><input id='cre' type='checkbox'" + (vgap.map.mineralsShow.cre ? "checked='true'" : "") + "onchange='vgap.map.displayMinerals()'/>&nbsp;&nbsp;Credits</td></tr></table></div>";
		
        vgap.map.mineralsControl = $(b).appendTo("#PlanetsContainer");
        vgap.map.mineralsControl.hide();
                        
        b = "<style type='text/css'>\n";
        b += "#mineralsControl{right:360px;background-color:#333;border-bottom-left-radius:10px;-moz-border-radius-bottomleft:10px 10px;-webkit-border-bottom-left-radius:10px 10px;top:0;display:none;position:absolute;color:#fff;z-index:5}\n";
        b += "</style>";

        $("head").append(b);
	};

	vgapMap.prototype.displayMinerals = function() {
	    $("#mineralsControl :checkbox").each(function(a) {
	        vgap.map.mineralsShow[$(this).attr("id")] = $(this).is(":checked");
	    });
	    
	    vgap.deselectAll();
	    
	    for (var i=0; i < vgap.planets.length; ++i) {
			var planet = vgap.planets[i];
			if (planet.infoturn > 0 && (localStorage.showAlliedMinerals == "true" || planet.ownerid == vgap.player.id || planet.ownerid == 0)) {
		        var g = vgap.map.screenX(planet.x);
		        var h = vgap.map.screenY(planet.y);
				
		        if (vgap.map.mineralsShow.neu)
		        	vgap.map.displayMin(g, h, (vgap.map.mineralsShow.gnd ? planet.groundneutronium : 0) + planet.neutronium, "#fe403f");
		        if (vgap.map.mineralsShow.dur)
		        	vgap.map.displayMin(g, h, (vgap.map.mineralsShow.gnd ? planet.groundduranium : 0) + planet.duranium, "#b401c9");
		        if (vgap.map.mineralsShow.tri)
		        	vgap.map.displayMin(g, h, (vgap.map.mineralsShow.gnd ? planet.groundtritanium : 0) + planet.tritanium, "#2c55fc");
		        if (vgap.map.mineralsShow.mol)
		        	vgap.map.displayMin(g, h, (vgap.map.mineralsShow.gnd ? planet.groundmolybdenum : 0) + planet.molybdenum, "#05db9d");
		        if (vgap.map.mineralsShow.sup)
		        	vgap.map.displayMin(g, h, planet.supplies, "#6df51b");
		        if (vgap.map.mineralsShow.cre)
		        	vgap.map.displayMin(g, h, planet.megacredits, "#ea850e");
		        if (vgap.map.mineralsShow.col) {
		        	vgap.map.displayCol(g, h, planet.clans, "#ffffff");
		        	vgap.map.displayCol(g, h, planet.nativeclans, "#808080");
		        	vgap.map.displayTemp(g, h, planet.temp);
		        }
			}
	    }
	    
	    for (var i=0; i < vgap.myships.length; ++i) {
			var ship = vgap.myships[i];
	        var g = vgap.map.screenX(ship.x);
	        var h = vgap.map.screenY(ship.y);
			
			if (localStorage.showAlliedMinerals || ship.ownerid == vgap.player.id) {
				if (vgap.map.mineralsShow.neu)
		        	vgap.map.displayMin(g, h, ship.neutronium, "#fe403f");
		        if (vgap.map.mineralsShow.dur)
		        	vgap.map.displayMin(g, h, ship.duranium, "#b401c9");
		        if (vgap.map.mineralsShow.tri)
		        	vgap.map.displayMin(g, h, ship.tritanium, "#2c55fc");
		        if (vgap.map.mineralsShow.mol)
		        	vgap.map.displayMin(g, h, ship.molybdenum, "#05db9d");
		        if (vgap.map.mineralsShow.sup)
		        	vgap.map.displayMin(g, h, ship.supplies, "#6df51b");
		        if (vgap.map.mineralsShow.cre)
		        	vgap.map.displayMin(g, h, ship.megacredits, "#ea850e");
			}
	    }
	};
	        
    vgapMap.prototype.displayMin = function(g, h, amt, col) {
		amt = Math.sqrt(amt) - 10;
		if (amt > 10) {
			var c = { "stroke-width": 2, "stroke-opacity": 1, stroke:col };
			this.special.push(this.paper.circle(g, h, amt * this.zoom).attr(c));
    	}
	};
	
    vgapMap.prototype.displayCol = function(g, h, amt, col) {
    	if (amt != 0) {
			amt = 3 * Math.log(amt) + 12;
			var c = { "stroke-width": 2, "stroke-opacity": 1, stroke:col };
			this.special.push(this.paper.circle(g, h, amt * this.zoom).attr(c));
    	}
	};
	
    vgapMap.prototype.displayTemp = function(g, h, temp) {
    	if (temp > 0) {
			var c = { "stroke-width": 3, "stroke-opacity": 1, stroke:"green" };
			if (temp > 84)
				c.stroke = "red";
			if (temp < 15)
				c.stroke = "blue";
			this.special.push(this.paper.circle(g, h, 9 * this.zoom).attr(c));
    	}
	};
	
	var oldDeselectAll = vgaPlanets.prototype.deselectAll;
	
	vgaPlanets.prototype.deselectAll = function() {
		if (vgap.map.special !== undefined)
			vgap.map.special.remove();
		vgap.map.special = vgap.map.paper.set();

        oldDeselectAll.apply(this, arguments);
	};

}
	
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
