// ==UserScript==
// @name           KoL Frame Position Persistence
// @namespace      http://freecog.net/2008/
// @description    Remembers the position of the various panels in the UI.
// @include        http://*kingdomofloathing.com/main.html*
// ==/UserScript==

function get_el(id) {
	return document.getElementById(id);
}

var save = [
	// id       property
	["rootset", "cols"],
	["menuset", "rows"],
	["mainset", "cols"],
];

if (/^http:\/\/(www\d*\.)?kingdomofloathing\.com\/main\.html/.test(document.location)) {
	save.forEach(function(tuple) {
		var id = tuple[0], prop = tuple[1];
		var val = GM_getValue(id + "_" + prop, false);
		if (val) get_el(id)[prop] = val;
	});
	
	window.addEventListener("unload", function() {
		save.forEach(function(tuple) {
			var id = tuple[0], prop = tuple[1];
			GM_setValue(id + "_" + prop, get_el(id)[prop]);
		});
	}, false);
}
