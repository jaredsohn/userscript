// ==UserScript==
// @name			Make All IMDB Title Links Info Links
// @author			Erik Vold
// @namespace		makeIMDBTitleInfoLinks
// @include			http*://*
// @exclude			http*://*imdb.com*
// @version			0.1
// @datecreated		2009-11-26
// @lastupdated		2009-11-26
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This userscript will make all links to IMDB movies that are not already rel-info links, into rel-info links w/ the data-source="IMDB".
// ==/UserScript==

(function(){
	document.addEventListener("makeInfoLinks", function() {
		var l,links = document.evaluate("//link[not(contains(@rel,'%TAG%')) and contains(@href,'imdb.com/title/')] | //a[not(contains(@rel,'%TAG%')) and contains(@href,'imdb.com/title/')]".replace(/%TAG%/g,"info"),document,null,7,null);
		if(!links.snapshotLength) return;
		for(var i=0;i<links.snapshotLength;i++){
			l=links.snapshotItem(i);
			if(!l.href.match(/imdb.com\/title\/tt\d+\/{0,1}/)) continue;
			if(!l.getAttribute("rel")) l.setAttribute("rel","info");
			else l.setAttribute("rel",l.getAttribute("rel")+" info");
			if(!l.getAttribute("data-source")) l.setAttribute("data-source","IMDB");
		}
	}, false);
})();