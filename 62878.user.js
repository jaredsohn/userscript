// ==UserScript==
// @name			Make All Wikipedia Links Info Links
// @author			Erik Vold
// @namespace		makeAllWikipediaLinksInfoLinks
// @include			http*://*
// @exclude			http*://*wikipedia.org*
// @version			0.1
// @datecreated		2009-11-26
// @lastupdated		2009-11-26
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This userscript will make all links to Wikipedia that are not already rel-info links, into rel-info links w/ the data-source="Wikipedia".
// ==/UserScript==

(function(){
	document.addEventListener("makeInfoLinks", function() {
		var l,links = document.evaluate("//link[not(contains(@rel,'%TAG%')) and contains(@href,'wikipedia.org')] | //a[not(contains(@rel,'%TAG%')) and contains(@href,'wikipedia.org')]".replace(/%TAG%/g,"info"),document,null,7,null);
		if(!links.snapshotLength) return;
		for(var i=0;i<links.snapshotLength;i++){
			l=links.snapshotItem(i);
			if(!l.getAttribute("rel")) l.setAttribute("rel","info");
			else l.setAttribute("rel",l.getAttribute("rel")+" info");
			if(!l.getAttribute("data-source")) l.setAttribute("data-source","Wikipedia");
		}
	}, false);
})();