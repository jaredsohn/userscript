// ==UserScript==
// @name           Twitter Google Maps Link
// @namespace      http://www.aetherworld.org/
// @description    Converts the location field on twitter to a Google Maps link instead of just showing coordinates or a string
// @include        http://twitter.com/*
// @version        1.0.0
// ==/UserScript==

(function() {
	var f = function() {
		var x = document.evaluate('//span[@class="adr"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < x.snapshotLength; i++) {
			var idx = x.snapshotItem(i).textContent.indexOf(":")
			if( idx >= 0 ) {
				loc = x.snapshotItem(i).textContent.substr(idx + 2).split(/\s+/)[0].replace(/[\n\r\s]/g, "");
			} else {
				loc = x.snapshotItem(i).textContent;
			}
			
			console.debug( loc );
			x.snapshotItem(i).innerHTML = x.snapshotItem(i).innerHTML.replace(loc, "<a href='http://maps.google.com/maps?f=q&hl=en&ie=UTF8&z=10&q=" + encodeURIComponent(loc) + "' target='_blank'>" + loc + "</a>");
		}
	}
	f();
})();