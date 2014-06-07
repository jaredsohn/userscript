// ==UserScript==
// @name          	Remove Long OpenURLs from SIRSI Resolver
// @description   	Removes long openurls from SIRSI resolver pages
// @include	 		http://*-resolver.sirsi.net/*
// ==/UserScript==

var allSpans, thisSpan;
allSpans = document.evaluate(
		"//span[@class='openurl']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
for (var i = 0; i < allSpans.snapshotLength; i++){
	thisSpan = allSpans.snapshotItem(i);
	if (thisSpan){
		thisSpan.parentNode.removeChild(thisSpan);
		}
	}