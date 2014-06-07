// ==UserScript==
// @name           Planet Levels
// @namespace      http://unidomcorp.com
// @description    Color code planets in view_system.php by level
// @include        http://*.war-facts.com/extras/view_system.php*
// ==/UserScript==/* Planet Levels:		 Green: 70-90%	Yellow: 40-60%	Orange: 20-30%	   Red: 0-10%   Also, a tooltop will appear over each planet with the planet level.*/var planets = document.getElementsByTagName('img');
for (var i = 1; i < planets.length; i++) {
	var c = "ffffff";
	var n = "NA"
	try {
		n = planets[i].src.match(/(\d{2})\.gif/)[1];
		n = 100 - (n * 10);
		if ( n > 60 ) {
			c = "green";
		} else if ( n > 30 ) {
			c = "yellow";
		} else if ( n > 10 ) {
			c = "orange";
		} else {
			c = "red";
		}
	} catch(err) {
		GM_log(err);
	} finally {
		planets[i].parentNode.setAttribute("title","Planet Level [" + n + "%]");
		planets[i].parentNode.childNodes[2].setAttribute("color",c);
	}
}

