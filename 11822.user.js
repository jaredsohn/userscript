// ==UserScript==
// @name           Yahoo Fantasy Homepage Rearrange
// @namespace      http://www.digivill.net/~joykillr
// @description    Make the fantasysports homepage readable again. (Moves the promos to the bottom and news to the top.)
// @include        http://fantasysports.yahoo.com/
// @include        http://fantasysports.yahoo.com
// ==/UserScript==
// v .2

document.getElementById("yspmain").insertBefore(document.getElementById("home-featured-experts"),document.getElementById("ysppageheader").nextSibling.nextSibling.nextSibling);
var r = document.getElementById("yspmain").getElementsByTagName("table");
for (var q=0; q<r.length; q++) {
	if (r[q].className.match(/yspwhitebg/i)) {
		document.getElementById("yspmain").insertBefore(r[q],document.getElementById("ysppageheader").nextSibling.nextSibling.nextSibling.nextSibling);
	}
}