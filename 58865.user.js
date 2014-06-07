// ==UserScript==
// @name           Trukz CB Radio Filter
// @namespace      http://trukz.com
// @description    Filters CB radio chatter from selected people.
// @include        http://www.trukz.com/cb_radio.asp
// @include        http://www.trukz.com/in_route.asp*
// @include        http://www.trukz.com/driver_display.asp*
// ==/UserScript==

try {

// Here's where you put the names of drivers you don't want to see.
// You can delete the lines you're not using, or add as many as you like.
var FILTERS = [
	'DriverName',
	'DriverName2',
	'DriverName3',
	'etc',
];

// If you want to see what lines are being deleted, set this to 'true'.
// That defeats the purpose somewhat, but you may find that blank lines are
// still less disruptive than an actual driver's words.
var SHOW_FILTERED = false;



// --- You don't need to edit anything below here. ---

ELEMENT_NODE = 1;

Array.prototype.index = function(val) {
	for(var i = 0, l = this.length; i < l; i++) {
		if(this[i] == val) return i;
	}
	return null;
}

Array.prototype.include = function(val) {
	return this.index(val) !== null;
}

var links = document.evaluate("//div[@id='scroll3']/p/a", document,
	null, XPathResult.ANY_TYPE, null );
var remove = new Array;
var show_anchors = new Array;

while (true) {
	var link = links.iterateNext();
	if (link == null) { break; }

	var name = link.innerHTML;
	if (FILTERS.include(name)) {
		remove.push(link.previousSibling);

		var next = link;
		while (true) {
			next = next.nextSibling;
			if (next == null) {
				break;
			} else if (next.nodeType == ELEMENT_NODE 
					&& next.tagName == 'BR') {
				if (SHOW_FILTERED) {
					show_anchors.push(next);
				} else {
					remove.push(next);
				}
				break;
			} else {
				remove.push(next);
			}
		}

		remove.push(link);
	}
}

for (var i = 0, l = remove.length; i < l; i++) {
	var rm = remove[i];
	rm.parentNode.removeChild(rm);
}

for (var i = 0, l = show_anchors.length; i < l; i++) {
	var anchor = show_anchors[i];

	var hr = document.createElement('hr');
	hr.setAttribute('style',
		'color: #ddd; background-color: #ddd; border: 0; width: 80%');

	anchor.parentNode.replaceChild(hr, anchor);
}

} catch (e) {
	alert('CB filter error: ' + e.message);
}
