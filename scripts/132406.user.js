// ==UserScript==
// @name           	Reduce Graphic Charge (RGC)
// @namespace      	Ikariam
// @author			FuCK3M
// @description		Reduce the amount of graphics presented in Ikariam 0.5 version
// @version        	0.1
// @include        	http://s*.ikariam.*/index.php?*
// ==/UserScript==

if (document.getElementById("island")) {
	document.getElementById("island").style.backgroundImage="none";
	document.getElementById("cities").style.backgroundImage="none";
}
if (document.getElementById("city")) {
	document.getElementById("worldmap").style.backgroundImage="none";
	document.getElementById("city").style.backgroundImage="none";
	document.getElementById("locations").style.backgroundImage="none";
}

if (document.getElementById("worldmapbg")) {
	document.getElementById("worldmapbg").style.backgroundImage="none";
	for (var i = 0; i < 25; i++) {
		for (var j = 0; j < 25; j++) {
			if (document.getElementById("tile_"+i+"_"+j))
				document.getElementById("tile_"+i+"_"+j).style.backgroundImage="none";
		}
	}
}