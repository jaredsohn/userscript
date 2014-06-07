// ==UserScript==
// @name          Planets.nu add chunnel dicrection arrows
// @description   add arrows to starting end of chunnel.
// @include       http://planets.nu/*
// @include       http://*.planets.nu/*
// @homepage      http://planets.nu/discussion/utility-script-add-direction-arrows-to-chunnel-waypoint
// @version 1.21
// ==/UserScript==

function wrapper () {
	var zoomTable = [25, 50, 75, 100, 125, 150, 175, 200, 300, 400, 500, 1000, 2000, 4000 ];
	
	var oldLoadControls = vgapMap.prototype.loadControls; 
	vgapMap.prototype.loadControls = function () {

		oldLoadControls.apply(this, arguments);
        
        var b = "<li onclick='vgap.map.zoomWayIn();'>Zoom Max</li>";
        $("#MapTools li:contains('Zoom In')").after(b);
        
        b = "<li class='ClearMap' onclick='vgap.deselectAll();'>Clear (x)</li>";		// menu and hotkey called different functions
        $("#MapTools li:contains('Clear')").replaceWith(b);

        var height = this.controls.height() - this.toolsMenu.height();
        this.controls.css("marginTop", "-" + this.controls.height() + "px");
        
    	vgap.map.zoom = zoomTable[localStorage.startZoom] / 100;
    	vgap.map.centerX = localStorage.startX;
    	vgap.map.centerY = localStorage.startY;
	    
    };

    vgaPlanets.prototype.deselectAll = function() {
		vgap.map.deselect();
        vgap.closeLeft();

	    vgap.map.explosions.remove();
	    vgap.map.explosions = vgap.map.paper.set();
	    
		vgap.map.draw();
	};
	
	var oldProcessLoad = vgaPlanets.prototype.processLoad;
    vgaPlanets.prototype.processLoad = function(f) {
    	
    	oldProcessLoad.apply(this,arguments);
    	
    	if(typeof(Storage)!=="undefined") {
	    	if (localStorage.waypointChunnel == null)
	    		localStorage.waypointChunnel = "true";
	    	if (localStorage.waypointHYP == null)
	    		localStorage.waypointHYP = "true";
	    	if (localStorage.filterZoom == null)
	    		localStorage.filterZoom = "true";
	    	if (localStorage.chunnelColor == null)
	    		localStorage.chunnelColor = "#8080ff";
	    	if (localStorage.hypColor == null)
	    		localStorage.hypColor = "#800040";
	    	if (localStorage.startZoom == null)
	    		localStorage.startZoom = "1";
	    	if (localStorage.startX == null)
	    		localStorage.startX = "2000";
	    	if (localStorage.startY == null)
	    		localStorage.startY = "2000";
	    	if (localStorage.shipHistoryLength == null)
	    		localStorage.shipHistoryLength = "3";
	    	if (localStorage.shipHistoryColor == null)
	    		localStorage.shipHistoryColor = "#000080";
	    	if (localStorage.warpCircle == null)
	    		localStorage.warpCircle = "true";
    	}
   };
	
	var oldShowSettings = vgapDashboard.prototype.showSettings;
	vgapDashboard.prototype.showSettings = function () {

		oldShowSettings.apply(this,arguments);
   
		var b = "<br><h3>Waypoint Arrows</h3>";
		
		b += "<div id='waypointOptions'><table>";
		b += "<tr><td><input id='warpCircle' type='checkbox'" + (localStorage.warpCircle == "true" ? "checked='true'" : "") + "/>";
		b += 	 " Draw warp circle at ships location</td>";
		b +=	 "<td>&nbsp;&nbsp;<input id='shipHistoryLength' type='range' value=" + localStorage.shipHistoryLength + " min=0 max=99 onchange='vgap.dash.updateShipHistory()'/>";
		b +=     "<div id='shipHistory'>&nbsp;&nbsp;&nbsp;" + localStorage.shipHistoryLength + " Ship History Depth</div></td>";
		b +=     "<td><input id='shipHistoryColor' type='color' value=" + localStorage.shipHistoryColor + " /> Ship history color</td></tr>";
		
		b += "<tr><td colspan=2><input id='waypointChunnel' type='checkbox'" + (localStorage.waypointChunnel == "true" ? "checked='true'" : "") + "/>";
		b += 	 " Draw direction arrows at destination of chunneling ships</td>";
		b +=     "<td><input id='chunnelColor' type='color' value=" + localStorage.chunnelColor + " /> Chunnel color</td></tr>";
		
		b += "<tr><td colspan=2><input id='waypointHYP' type='checkbox'" + (localStorage.waypointHYP == "true" ? "checked='true'" : "") + "/>";
		b += 	 " Draw direction arrows at destination of HYP ships</td>";
		b +=     "<td><input id='hypColor' type='color' value=" + localStorage.hypColor + " /> HYP color</td></tr>";
		
		b += "<tr><td colspan=3><input id='filterZoom' type='checkbox'" + (localStorage.filterZoom == "true" ? "checked='true'" : "") + "/>";
		b += 	" Zoom to destination of selected ship when zoomed to the max and only show selected ship</td></tr>";
		
		b += "<tr><td><input id='startX' type='number' value=" + localStorage.startX + " max=4000'/> Starting X</td>";
		b +=     "<td><input id='startY' type='number' value=" + localStorage.startY + " max=4000'/> Starting Y</td>";
		b += "<td>&nbsp;&nbsp;<input id='startZoom' type='range' value=" + localStorage.startZoom + " min=0 max=13 onchange='vgap.dash.updateZoom()'/>";
		b +=    "<div id='zoom'>&nbsp;&nbsp;&nbsp;" + zoomTable[localStorage.startZoom] + "&#37 Starting Zoom</div></td></tr>";
		b += "</table></div>";
   
		$('[onclick="vgap.resetTurn();"]').after(b);
		
	    this.pane.jScrollPane();
	};

	vgapDashboard.prototype.updateShipHistory = function() {
		var val = $("#waypointOptions #shipHistoryLength").val();
		var b = "<div id='shipHistory'>&nbsp;&nbsp;&nbsp;" + val + " Ship History</div>";
		$("#shipHistory").replaceWith(b);

	};
	
	vgapDashboard.prototype.updateZoom = function() {
		var val = $("#waypointOptions #startZoom").val();
		var b = "<div id='zoom'>&nbsp;&nbsp;&nbsp;" + zoomTable[val] + "&#37 Starting Zoom</div>";
		$("#zoom").replaceWith(b);
	};
	
	var oldSaveSettings = vgapDashboard.prototype.saveSettings;
	vgapDashboard.prototype.saveSettings = function() {
		
	    $("#waypointOptions :checkbox").each(function(a) {
	        localStorage[$(this).attr("id")] = $(this).is(":checked");
	    });

//		:number isn't working	    
//	    $("#waypointOptions :number").each(function(a) {
//	        localStorage[$(this).attr("id")] = $(this).val();
//	    });
	    
//	 	:color isn't working
//	    $("#waypointOptions :color").each(function(a) {
//	        localStorage[$(this).attr("id")] = $(this).val();
//	    });
	    
//	 	:range isn't working
//	    $("#waypointOptions :range").each(function(a) {
//	        localStorage[$(this).attr("id")] = $(this).val();
//	    });
	    
	    localStorage.shipHistoryLength = $("#waypointOptions #shipHistoryLength").val();
	    localStorage.shipHistoryColor = $("#waypointOptions #shipHistoryColor").val();
	    
		var b = "<div id='shipHistory'>&nbsp;&nbsp;&nbsp;" + localStorage.shipHistoryLength + " Ship History</div>";
		$("#shipHistory").replaceWith(b);
	    
	    localStorage.chunnelColor = $("#waypointOptions #chunnelColor").val();
	    localStorage.hypColor = $("#waypointOptions #hypColor").val();
	    
	    localStorage.startZoom = $("#waypointOptions #startZoom").val();
    	vgap.map.zoom = zoomTable[localStorage.startZoom] / 100;

		b = "<div id='zoom'>&nbsp;&nbsp;&nbsp;" + zoomTable[localStorage.startZoom] + "&#37 Starting Zoom</div>";
		$("#zoom").replaceWith(b);
	    
	    localStorage.startX = $("#waypointOptions #startX").val();
	    localStorage.startY = $("#waypointOptions #startY").val();

	    vgap.map.centerX = Number(localStorage.startX);
    	vgap.map.centerY = Number(localStorage.startY);
    	
		oldSaveSettings.apply(this,arguments);
	};
	
	vgapMap.prototype.zoomWayIn = function() {
		vgap.map.zoom = 40;
		vgap.map.updateZoom();
	};
	
	var oldDrawWaypoints = vgapMap.prototype.drawWaypoints;
	vgapMap.prototype.drawWaypoints = function()
	{        
		if (localStorage.filterZoom == "true" && this.zoom == 40 && (ship = vgap.map.activeShip) != null) {
	        this.waypoints.remove();
			this.waypoints = this.paper.set();
			
			var dist = vgap.map.getDist(ship.targetx, ship.targety, this.centerX, this.centerY);
			if (dist > 10)
				this.centerMap(ship.targetx, ship.targety);
			
	        var d = {"stroke": localStorage.hypColor, "stroke-width": 2, "arrow-end":"classic-wide-long", "stroke-opacity": 0.5};
            if (vgap.isHyping(ship))
            	d = {"stroke": localStorage.hypColor, "stroke-width": 2, "arrow-end":"classic-wide-long", "stroke-dasharray": ".", "stroke-opacity": 0.5};
            this.waypoints.push(this.paper.path("M" + this.screenX(ship.x) + " " + this.screenY(ship.y) + "L" + this.screenX(ship.targetx) + " " + this.screenY(ship.targety)).attr(d));
            return;
		}
        else
			oldDrawWaypoints.apply(this, arguments);
		
		for (var i=0; i<vgap.myships.length; ++i) {
			var ship = vgap.myships[i];
			if (localStorage.waypointChunnel == "true" && vgap.isChunnelling(ship)) {
            	var m = Number(ship.friendlycode);
                var to = vgap.getShip(m);
                var d = {"stroke":localStorage.chunnelColor, "stroke-width":2, "arrow-end":"classic-wide-long", "stroke-dasharray":"-", "stroke-opacity":0.5};
                this.waypoints.push(this.paper.path("M" + this.screenX(ship.x) + " " + this.screenY(ship.y) + "L" + this.screenX(to.x) + " " + this.screenY(to.y)).attr(d));
            	   
            }
            if (localStorage.waypointHYP == "true" && vgap.isHyping(ship)) {
                var d = {"stroke": localStorage.hypColor, "stroke-width": 2, "arrow-end":"classic-wide-long", "stroke-dasharray": ".", "stroke-opacity": 0.5};
	            this.waypoints.push(this.paper.path("M" + this.screenX(ship.x) + " " + this.screenY(ship.y) + "L" + this.screenX(ship.targetx) + " " + this.screenY(ship.targety)).attr(d));
            }
        }
	};
	
	var oldSelectShip = vgapMap.prototype.selectShip;
	vgapMap.prototype.selectShip = function(a) {
		oldSelectShip.apply(this, arguments);

		vgap.map.shipHistory(a);
	};
	
    vgapMap.prototype.shipHistory = function (a) {
		var ship = vgap.getShip(a);
		var at = { stroke: localStorage.shipHistoryColor, "stroke-width": 2, "stroke-opacity": .5 };

		vgap.map.notes.remove();
		vgap.map.notes = vgap.map.paper.set();

		var tox; //= ship.targetx;
		var toy; //= ship.targety;
		var fromx = ship.x;
		var fromy = ship.y;

		if (localStorage.warpCircle)
			vgap.map.notes.push(vgap.map.paper.circle(this.screenX(fromx), this.screenY(fromy), ship.engineid * ship.engineid * this.zoom).attr(at));
		
		for (var j = 0; j < localStorage.shipHistoryLength && j < ship.history.length; j++) {

			tox = fromx;
			toy = fromy;
			fromx = ship.history[j].x;
			fromy = ship.history[j].y;
			
			vgap.map.notes.push(vgap.map.paper.path("M"+ this.screenX(fromx) +"," + this.screenY(fromy) + "L"+ this.screenX(tox) +"," + this.screenY(toy)).attr(at));
		}
	};    

}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
