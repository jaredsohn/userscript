// ==UserScript==
// @name           Yahoo Fantasy Sports 2-Week Filter
// @namespace      http://www.digivill.net/~joykillr
// @description    Simple script to add 2 week stat filter on "My Team" view for most yahoo fantasy sports.
// @include        http://*.fantasysports.yahoo.com/*
// ==/UserScript==
// v .9
var a = window.content.location.href.toString();

if ((a.match(/fantasysports\.yahoo\.com\/\D{1,3}\/\d{1,7}\//i)) || (a.match(/fantasysports\.yahoo\.com\/\D{1,2}\d\/\d{1,7}\//i))) {
	if (document.getElementById("statsubnav")) {
		var b,bb,c,z = document.createElement("li");
		if (a.match(/stat\d{1}\=L14/i)) {z.className="selected";}
		b = document.getElementById("statsubnav").getElementsByTagName("li");
		bb = b[1].getElementsByTagName("a")[0].href.toString();
		if (bb.match(/stat\d{1}\=L7/i)) {c = bb.match(/stat\d{1}\=L7/i).toString();
			z.innerHTML='<a href="'+bb.replace(c,c.replace("L7","L14"))+'">Last 2 Weeks</a>';
			b[2].parentNode.insertBefore(z,b[2]);
		}
	}
}