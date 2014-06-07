// ==UserScript==
// @name	vBulletinMovePreviews
// @version	1.1
// @namespace	vBulletinMovePreviews
// @description	Moves the thread preview mouseover from the entire cell to the thread title.
// @include	http://forum.dvdtalk.com/*
// ==/UserScript==

function xpath(query) { return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }

var snapshotToArray = function(snapshot){var ar = new Array();for (var i = 0; i < snapshot.snapshotLength; i++) {ar.push(snapshot.snapshotItem(i));} return ar; }

var allTitles = snapshotToArray(xpath('//table[@id="threadslist"]//td[@title]'));

for (var i = 0; i < allTitles.length; i++){
	var title =allTitles[i].title;
	allTitles[i].removeAttribute('title');	
	
	var links = allTitles[i].getElementsByTagName('a');
	for (var x = 0; x < links.length; x++){
		links[x].setAttribute('title', title);
	}
}

