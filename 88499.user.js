// ==UserScript==
// @name		Hfr Spoiler Reductor
// @namespace       
// @description	Contracte les balises spoiler du forum hardware.fr en une ligne
// @version		1.0
// @author		madcat
// @include		http://forum.hardware.fr/*
// ==/UserScript==

function xpath(expr, ref, type) {
	ref = (ref ? ref : document);
	type = (type ? type : XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	return document.evaluate(expr, ref, null, type, null);
}

function afficheCache(elmt) {
	
	if (elmt.parentNode.getElementsByTagName('div')[0]) {
		var spoilerCache = elmt.parentNode.getElementsByTagName('div')[0];
	}
	
	if (spoilerCache.style.display == 'none') {
		spoilerCache.style.display = 'block';
		spoilerCache.style.visibility = 'hidden';
	}
	
	else {
		spoilerCache.style.display = 'none';
	}
}

var allSpoilers = xpath("//div[@class='Topic masque']");
var allSpoilersButtons = xpath("//b[@class='s1Topic']");

for (var i=0; i < allSpoilers.snapshotLength; i++) {
	allSpoilers.snapshotItem(i).style.display = 'none';
}

for (var i=0; i < allSpoilersButtons.snapshotLength; i++) {
	allSpoilersButtons.snapshotItem(i).addEventListener('click', function() {afficheCache(this)}, false);
}