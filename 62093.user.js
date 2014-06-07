// ==UserScript==
// @name           last.fm playcount stats
// @namespace      crosbow/last.fm/percentageoflisteners
// @description    Adds your % of total playcount + average per user on artist/song page
// @include        http://www.last.fm/music/*
// ==/UserScript==

p = document.getElementById("inLibraryIndicatorForArtist");
if (!p) {
	p = document.getElementById("inLibraryIndicator");
	yourplays = p.innerHTML.split('(')[1].split(' ')[0].split(",").join("");
}
else {
	yourplays = p.innerHTML.split(' ')[0].split(",").join("");
}
xp = "//p[@class='stats']";
var xpathResult = document.evaluate( xp, document, null, XPathResult.ANY_TYPE,null);
var y = xpathResult.iterateNext();
var n = y.innerHTML;
var plays = /(.+) plays/.exec(n)[1].trim().split(",").join("");
var listeners = /\((.+) listeners\)/.exec(n)[1].trim().split(",").join("");

var p = Math.round(1000*yourplays/plays)/10;
if (isNaN(p)) { p = 0; }

y.innerHTML = y.innerHTML.replace("<br>","<br />"+p+"% avg: "+Math.round(100*plays/listeners)/100+"<br />");
