// ==UserScript==
// @name		Add more than one partner on Facebook
// @namespace		http://example.com
// @include		https://www.facebook.com/*
// @grant		none
// ==/UserScript==

(function() {
	
	var throttle = 0;
	
	function updateRelationshipSelector() {
		var t = (new Date).getTime();
		if (t - 100 < throttle) return; 
		throttle = t
		var nodes = document.querySelectorAll('.familySection .relationSelector')
		for (var n = 0; n < nodes.length; n++) {
			var html = nodes[n].innerHTML
			var poly = ""
			if (html.indexOf('"100"') > -1 && html.indexOf('"223"') == -1) {
				poly += '<option value="223">Partner (female)</option>'
			}
			if (html.indexOf('"101"') > -1 && html.indexOf('"224"') == -1) {
				poly += '<option value="224">Partner (male)</option>'
			}
			if (poly.length > 0) {
				nodes[n].innerHTML += poly
			}
		}
	}

	document.addEventListener("DOMNodeInserted", updateRelationshipSelector, false);
		
})()