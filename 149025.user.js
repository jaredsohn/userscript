// ==UserScript==
// @name         Blockceptor
// @version      1.0
// @description  Anti-Antiblock, see antiblock.org for futher information about what they call "antiblock"
// @match        http://*/*
// @run-at        document-end
// ==/UserScript==

// Blockceptor 1.0
// "Anti-Antiblock"
//
// See: antiblock.org
(function(){
	try {
		var id = null;

		for(var i=0; i<document.styleSheets.length; ++i) {
			var s=document.styleSheets[i].cssRules;

			if(s == null || s.length != 4)
				continue;

			if(s[0].selectorText.length != 5 && /^#[b-z][a-f0-9]{3}$/.test(s[0].selectorText))
				continue;

			// A good candidate to check!

			var c = s[0].style;

			if(c.position != "fixed" || c.display != "block" || c.top != "0px" || c.left != "0px" || c.width != "100%" || c.height != "100%") continue;

			// Seems legit
			id = s[0].selectorText.substr(1,4); // Copy id

			// Modify style
			s[0].style.display = "none";            // Hide layer
			s[3].selectorText = "#"+id+"__removed"; // Deactivate blocker
			s[3].style.display = "";

			break;
		}

		// Try to remove annoying elements
		if(!id)
			return;
			
		var e = document.getElementById(id);

		if(!e)
			return;

		e.style.display = "none";

		e.parentNode.removeChild(e);
	} catch(ex) {
		//alert(ex);
	}
}());