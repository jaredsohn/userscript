// ==UserScript==
// @name          TSC Marker
// @namespace     http://vgm16.tripod.com/greasemonkey/TSCMarker.user.js
// @description   Marks TSC posts by your favorite authors
// @include       http://techcomedy.com/*
// @include       http://www.techcomedy.com/*
// ==/UserScript==
// These are the posters you want marked
var posters=['CommanderData','Digital Dogcow','Veinor','RiffRaff','Coyote','SwedishChef'];

var pst="("+posters.join("|")+")";
pst=new RegExp(pst, "gi");
var els = document.evaluate('//*', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var el,i=0;
while (el=els.snapshotItem(i++)) {
	// Skip if not <a> tag
	if ('A'!=el.tagName) continue;

	for (var j=0; j<el.childNodes.length; j++) {
		if (pst.test(el.childNodes[j].textContent))
			// Change the style
			el.style.color = "red";
	}
}