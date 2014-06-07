// ==UserScript==
// @name Big Fish Script to Skip OS check
// @match https://store.bigfishgames.com/*
// @version 1.0.0
// @author Zachary Taylor
// ==/UserScript==
var allDownloadLinks; 
allDownloadLinks = document.evaluate('//a[contains(@class, "install")]', 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

console.log( "start" );
for (var i=0;i<allDownloadLinks.snapshotLength;i++) { 
	var thisLink = allDownloadLinks.snapshotItem(i);
	
	thisLink.removeAttribute("data-auto-track");
	thisLink.removeAttribute("data");
}

console.log( "finish");