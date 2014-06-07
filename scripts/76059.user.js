// ==UserScript==
// @name           Clean comma separated tags
// @namespace      delicious
// @include        http://delicious.com/*
// @version        0.1
// ==/UserScript==

var delicious_tags = {
	// The id of the checkbox
	id_name: "gm_strip_commas",

	// Setup the script
	init: function() {
		// Determine if we are on the edit tags screen
		var container = document.getElementById("tagfield");
		
		// Can we actually run this script?
		if(container) {
			// Redraw the DOM
			this.drawView(container);
			
			// Locate the tags box
			var input = document.getElementById("tags");
			
			// Strip out unwanted commas from tag string
			var removeCommas = function(e) {
				if(delicious_tags.isEnabled()) {
					// Match any comma
					var match = /,/g;
					e.target.value = e.target.value.replace(match, " ");
					e.target.value = e.target.value.replace(/  /g, " ");
				}
			}
			input.addEventListener("change", removeCommas, true);			
		}
	},
	
	// Repaint elements onto the DOM injecting our script
	drawView: function(container) {
		// Add a container with native styles
		var div = document.createElement("div");
		div.className = "share";
		div.style.marginTop = "4px";
		
		// add clearing div
		var clear = document.createElement("div");
		clear.style.clear = "both";
		
		// add checbox
		var cb = document.createElement("input");
		cb.setAttribute("type", "checkbox");
		cb.setAttribute("checked", "checked");		
		cb.setAttribute("id", this.id_name);	
		cb.className = "checkbox";
		
		// add a label
		var label = document.createElement("label");
		label.setAttribute("for", this.id_name);		
		label.innerHTML = "Strip commas";
		
		// append to the DOM
		div.appendChild(cb);
		div.appendChild(label);
		container.appendChild(div);
		container.appendChild(clear);
	},
	
	// Determine if the user actaully wants the script run
	isEnabled: function() {
		return document.getElementById(this.id_name).checked;
	}
};
delicious_tags.init();
