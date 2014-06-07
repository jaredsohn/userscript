// ==UserScript==
// @name          Last.fm Loved Tracks
// @namespace     http://patraulea.com/gm
// @description   Adds URLs to users' Loved Tracks radio on Last.fm
// @include       http://www.last.fm/*
// ==/UserScript==

var lovedUrl = "http://cdn.last.fm/flatness/global/icon_loved_indicator.2.png";

var xpquery = "//a/span[contains(@class, 'userImage')]/..";
var list = document.evaluate(xpquery, document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0; i<list.snapshotLength; i++) {
	var a = list.snapshotItem(i);
	if (a.id == "idBadgerUser") continue;

	var url = a.href;
	var pos = url.search(/\/user\/[^\/]+\/?$/);
	if (pos < 0) continue;

	var radioUrl = "lastfm:/" + url.substr(pos) + "/loved";

	
	var parent = a.parentNode;
	if (! parent) continue;

	var loved = document.createElement("a");
	loved.href  = radioUrl
	loved.title = "Loved Tracks Radio";
	loved.innerHTML = "<img src='" + lovedUrl + "'/>";

	var next = a.nextSibling;
	if (next)
		parent.insertBefore(loved, next);
	else
		parent.appendChild(loved);
}
