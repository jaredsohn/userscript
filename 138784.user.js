// ==UserScript==
// @name          Planets.nu better hyperjump circles
// @description   Circles planets that can be jumped to.  Gets rid of ribbon that covered up other objects.
// @include       http://planets.nu/*
// @include       http://*.planets.nu/*
// @homepage      http://planets.nu/discussion/better-hyperjump-circles
// @version 1.31
// ==/UserScript==

function wrapper () {	// hyperJump.js
	var oldLoadControls = vgapMap.prototype.loadControls; 
	vgapMap.prototype.loadControls = function () {

        oldLoadControls.apply(this, arguments);
        
        var b = "<li onclick='vgap.map.warpCircle();'>Warp Circle</li>";
        $("#MapTools li.HypCircle").after(b);

        var height = this.controls.height() - this.toolsMenu.height();
        this.controls.css("marginTop", "-" + this.controls.height() + "px");
    };

    var oldProcessLoad = vgaPlanets.prototype.processLoad;
    vgaPlanets.prototype.processLoad = function(f) {
    	
    	oldProcessLoad.apply(this,arguments);
    	
    	if(typeof(Storage)!=="undefined") {
	    	if (localStorage.hyperjumpRing == null) {
	    		localStorage.hyperjumpRing = "true";
	    		localStorage.hyperjumpPlanets = "true";
	    		localStorage.ringColor = "#80ffff";
	    		localStorage.warpCircle = [];
	    		for (var i=1; i<10; ++i)
	    			localStorage["warpCircle.r"+i] = "false";
	    		localStorage["warpCircle.r9"] = "true";
	    		localStorage.use2x = "false";
	    	}
    	}
    	
    	vgap.map.putWarpCircle = false;
    };
	
	var oldShowSettings = vgapDashboard.prototype.showSettings;
	vgapDashboard.prototype.showSettings = function () {

		oldShowSettings.apply(this,arguments);
   
		var b = "<br><h3>HyperJump Circles</h3>";
		
		b += "<div id='hyperjumpOptions'><table>";
		b += "<tr><td><input id='hyperjumpPlanets' type='checkbox'" + (localStorage.hyperjumpPlanets == "true" ? "checked='true'" : "") + "/>&nbsp;&nbsp;Mark planets in jump range</td></tr>";
		b += "<tr><td><input id='hyperjumpRing' type='checkbox'" + (localStorage.hyperjumpRing == "true" ? "checked='true'" : "") + "/>&nbsp;&nbsp;Draw double ring at jump radius</td>";
		b +=     "<td colspan=9><input id='ringColor' type='color' value=" + localStorage.ringColor + " />&nbsp;&nbsp;Ring color</td></tr>";

		b += "<tr><td>Draw warp circles at:&nbsp;</td>";
		for (var i=1; i<10; ++i) 
			b += "<td><input id='warpCircle.r"+i+"' type='checkbox'" + (localStorage['warpCircle.r'+i] == "true" ? "checked='true'" : "") + "/>&nbsp;&nbsp;"+(i*i)+"&nbsp;ly</td>";
		
		b += "</tr><tr><td><input id='use2x' type='checkbox'" + (localStorage.use2x == "true" ? "checked='true'" : "") + "/>&nbsp;&nbsp;Use 2x movement</td></tr>";
		b += "</table></div>";
   
		$('[onclick="vgap.resetTurn();"]').after(b);

	    this.pane.jScrollPane();
	};

	var oldSaveSettings = vgapDashboard.prototype.saveSettings;
	vgapDashboard.prototype.saveSettings = function() {
		
	    $("#hyperjumpOptions :checkbox").each(function(a) {
	        localStorage[$(this).attr("id")] = $(this).is(":checked");
	    });
	    
		$("#hyperjumpOptions input[type='color']").each(function(b) {
			localStorage[$(this).attr("id")] = $(this).val();
		});
	    
		oldSaveSettings.apply(this,arguments);
	};

	vgapMap.prototype.warpCircle = function() {
        $("body").css("cursor", "crosshair");
        this.closeTools();
        this.putWarpCircle = true;
	};
	
	var oldClick = vgapMap.prototype.click;
	vgapMap.prototype.click = function(b) {
	    if (this.putWarpCircle) {
	        this.warp(this.x, this.y);
	        this.putWarpCircle = false;
	        $("body").css("cursor", "");
	        return;
	    }
	    else
	    	oldClick.apply(this, arguments);
	};
	
	vgapMap.prototype.warp = function(x, y) {
		var a = { stroke:localStorage.ringColor, "stroke-width": 1, "stroke-opacity": .5 };
        var g = vgap.map.screenX(x);
        var h = vgap.map.screenY(y);
        var mult = localStorage.use2x == "true" ? 2 : 1;
        
        for (var i=1; i<10; ++i) {
        	if (localStorage['warpCircle.r'+i] == "true")
        		this.explosions.push(this.paper.circle(g, h, i * i * mult * this.zoom).attr(a));
        }
	};
	
	vgapMap.prototype.hyperjump = function(x, y) {		// replaces vgap map hyperjump function

		var a = { "stroke-width": 2, "stroke-opacity": .5 };
		if (localStorage.hyperjumpPlanets == "true")
			for (var i=0; i<vgap.planets.length; ++i) {
				var planet = vgap.planets[i];
				var dist = vgap.map.getDist(x, y, planet.x, planet.y);
				
	            var g = vgap.map.screenX(planet.x);
	            var h = vgap.map.screenY(planet.y);

				if (dist >= 340 && dist <= 360) {
					a["stroke"] = localStorage.ringColor;
					this.explosions.push(this.paper.circle(g, h, 12 * this.zoom).attr(a));	// I wanted the target planets circled
				}	
				else if (dist >= 338 && dist <= 362) {
					a["stroke"] = "yellow";
					this.explosions.push(this.paper.circle(g, h, 12 * this.zoom).attr(a));	// I wanted the target planets circled
				}
			}
		
        var g = vgap.map.screenX(x);
        var h = vgap.map.screenY(y);
		a["stroke"] = localStorage.ringColor;

		if (localStorage.hyperjumpRing == "true") {
			this.explosions.push(this.paper.circle(g, h, 340 * this.zoom).attr(a));
			this.explosions.push(this.paper.circle(g, h, 360 * this.zoom).attr(a));
		}
		else {
			this.explosions.push(this.paper.circle(g, h, 350 * this.zoom).attr(a));
			a["stroke-width"] = 20;
			a["stroke-opacity"] = .25;
			this.explosions.push(this.paper.circle(g, h, 350 * this.zoom).attr(a));
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
