// ==UserScript==
// @name          Planets.nu hide notes display on map
// @description   hide notes box drawn around planets.
// @include       http://planets.nu/*
// @include       http://*.planets.nu/*
// @homepage      http://planets.nu/discussion/utility-script-hide-notes-display
// @version 1.31
// ==/UserScript==

function wrapper () {	// notesDisplay.js
	
	var oldProcessLoad = vgaPlanets.prototype.processLoad;
    vgaPlanets.prototype.processLoad = function(f) {
    	
    	oldProcessLoad.apply(this,arguments);
    	
    	if(typeof(Storage)!=="undefined") {
	    	if (localStorage.noteDisplay == null) {
	    		localStorage.noteDisplay = "true";
	    		localStorage.noteColor = "#ff0000";
	    		localStorage.hideMapTip = "true";
	    	}
    	}
   };
	
	var oldShowSettings = vgapDashboard.prototype.showSettings;
	vgapDashboard.prototype.showSettings = function () {

		oldShowSettings.apply(this,arguments);
		
		var b = "<br><h3>Notes display</h3>";
		
		b += "<div id='notesOptions'><table>";
		b += "<tr><td><input id='noteDisplay' type='checkbox' " + (localStorage.noteDisplay == "true" ? "checked='true'" : "") + " /></td><td>Draw box around planets with notes</td>";
		b += "<td><input id='noteColor' type='color' value=" + localStorage.noteColor + " /></td><td>Box color</td></tr>";
		b += "<tr><td><input id='hideMapTip' type='checkbox' " + (localStorage.hideMapTip == "true" ? "checked='true'" : "") + " /></td><td>Hide Map Tip</td></tr>";
		b += "</table></div>";
		
		$('[onclick="vgap.resetTurn();"]').after(b);

	    this.pane.jScrollPane();
	};

	var oldSaveSettings = vgapDashboard.prototype.saveSettings;
	vgapDashboard.prototype.saveSettings = function() {
		
    	$("#notesOptions :checkbox").each(function(a) {
			localStorage[$(this).attr("id")] = $(this).is(":checked");
    	});

		$("#notesOptions input[type='color']").each(function(b) {
			localStorage[$(this).attr("id")] = $(this).val();
		});


	    oldSaveSettings.apply(this,arguments);
	};
		
	vgapMap.prototype.drawNotes = function() {		// make the box red instead of yellow
    	if (localStorage.hideMapTip == "true" && vgap.map.mapTip != null)
    		vgap.map.mapTip.hide();
	    if (localStorage.noteDisplay == "true") {
			if (this.notes !== undefined)
		        this.notes.remove();
	        this.notes = this.paper.set();
	    
		    for (var c = 0; c < vgap.notes.length; c++) {
		        var d = vgap.notes[c];
		        if (d.targettype == 1 && d.body.length > 0) {
		            var e = vgap.getPlanet(d.targetid);
		            var b = 7;
		            var g = vgap.map.screenX(e.x) - (b * this.zoom);
		            var h = vgap.map.screenY(e.y) - (b * this.zoom);
		            var f = (b + b) * this.zoom;
		            var a = {stroke: localStorage.noteColor, "stroke-width": "1","stroke-opacity": 0.5};
		            vgap.map.notes.push(vgap.map.paper.rect(g, h, f, f).attr(a));
		        }
		    }
	    }
    };
	
	var oldDeselectAll = vgaPlanets.prototype.deselectAll;
	
	vgaPlanets.prototype.deselectAll = function() {
	    if (localStorage.noteDisplay == "true") {
			if (vgap.map.notes !== undefined)
				vgap.map.notes.remove();
			vgap.map.notes = vgap.map.paper.set();
	    }
	    
        oldDeselectAll.apply(this, arguments);
	};

}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
