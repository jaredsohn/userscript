// ==UserScript==
// @name           Rate Your Music Map Embiggener
// @namespace      http://www.google.com/search?q=brtkrbzhnv
// @description    Embiggens the music map
// @include        http://rateyourmusic.com/musicmap/*
// @include        http://www.rateyourmusic.com/musicmap/*
// ==/UserScript==
var hideVenueBox = true;
var w = "1100px";
var h = "700px";
main();
function main() {
	var map = document.getElementById("map");
	var vb = xpath("//div[@class='venuebox']").snapshotItem(1);
	embiggen(map.parentNode, w, h);
	embiggen(map, "100%", "100%");
	embiggen(vb, vb.style.width, h);
	
	if(hideVenueBox) {
		var vb = map.parentNode.parentNode.nextSibling.nextSibling;
		vb.style.display = "none";
	}
}

function embiggen(el, w, h) {
	el.style.width = w;
	el.style.height = h;
}

// From Dive Into Greasemonkey:
function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}