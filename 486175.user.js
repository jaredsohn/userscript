// ==UserScript==
// @name        Runescape Bits and Bytes - Map Tweaks
// @namespace   Shaun Dreclin
// @include     http://www.rsbandb.com/interactive_runescape_world_map/all_skills_and_categories
// @version     1
// ==/UserScript==

function removeNode(node) {
	if(node) {
		node.parentNode.removeChild(node);
	}
}

document.getElementById("map").style.position = "fixed";
document.getElementById("map").style.left = "0px";
document.getElementById("map").style.top = "0px";
document.getElementById("map").style.width = "100%";
document.getElementById("map").style.height = "100%";

document.getElementById("controls").style.top = "inherit";
document.getElementById("controls").style.width = "inherit";
document.getElementById("controls").style.paddingRight = "10px";

removeNode(document.getElementById("current-coordinate-display"));
document.getElementById("controls").innerHTML = document.getElementById("controls").innerHTML.substring(0, document.getElementById("controls").innerHTML.indexOf("Remember or"));

window.onload = function() {
	removeNode(document.getElementsByClassName("leaflet-control-attribution")[0]);

	for(i = 0; i < document.getElementsByClassName("map-toggle").length; i++) {
		document.getElementsByClassName("map-toggle")[i].click();
	}	
	
	
}
