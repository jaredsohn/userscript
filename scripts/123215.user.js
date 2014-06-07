// ==UserScript==
// @name           What.CD Highlight new notifications
// @namespace      Z4ppy.What.CD
// @description    Highlights notifications marked with "New!".
// @author         Z4ppy
// @include        http://what.cd/torrents.php?action=notify
// @include        https://ssl.what.cd/torrents.php?action=notify
// @updateURL      http://userscripts.org/scripts/source/123215.meta.js
// @version        1.1
// @date           2012-02-02
// ==/UserScript==

var BGCOLORS = new Array(10);
BGCOLORS['layer_cake'] = "#FFE040"; //yellow
BGCOLORS['kuro'] = "#006800"; //dark green
BGCOLORS['proton'] = "#D0FFD0"; //light green
BGCOLORS['whatnificent'] = "#D0FFD0";
BGCOLORS['anorex'] = "#FFE040";
BGCOLORS['dark_ambient'] = "#C8F0FF"; //light blue
BGCOLORS['minimal'] = "#FFE040";
BGCOLORS['postmod'] = "#D0FFD0";
BGCOLORS['mono'] = "#C8F0FF";
BGCOLORS['white.cd'] = "#D0FFD0";

var COLORS = new Array(1);
COLORS['minimal'] = "black";


(function() {
	// stylesheet identification
	var links = document.getElementsByTagName('link');
	var style = "";
	var tmp;
	for(var i = 0; i < links.length; i++) {
		if(links[i].rel == "stylesheet") {
			tmp = links[i].href.match(/static\/styles\/([^\/]+)\/.*$/);
			if(tmp) {
				style = tmp[1];
				break;
			}
		}
	}

	var trs = document.getElementsByTagName('tr');
	for(var i = 1; i < trs.length; i++) {
		for(var j = 0; j < trs[i].childNodes[3].childNodes.length; j++) {
			if(trs[i].childNodes[3].childNodes[j].tagName == 'STRONG' && trs[i].childNodes[3].childNodes[j].innerHTML == 'New!') {
				for(var k = 0; k < trs[i].childNodes.length; k++) {
					if(typeof(trs[i].childNodes[k].style) != "undefined") {
						if(typeof(BGCOLORS[style]) != "undefined") {
							trs[i].childNodes[k].style.backgroundColor = BGCOLORS[style];
						}
						if(typeof(COLORS[style]) != "undefined") {
							trs[i].childNodes[k].style.color = COLORS[style];
						}
					}
				}
			}
		}
	}
})();