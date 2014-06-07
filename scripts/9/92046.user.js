// ==UserScript==
// @name           Google Cache URL Change
// @namespace      http://userscripts.org/users/randyho
// @description    Change Google Cache URL to https
// @include        http://www.google.com/*
// @include        https://encrypted.google.com/*
// ==/UserScript==

var cachedLinks = document.evaluate("//span[@class='gl']/a[1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < cachedLinks.snapshotLength; i++) {
	cachedLinks.snapshotItem(i).removeAttribute("onmousedown");	
	//cachedLinks.snapshotItem(i).href = cachedLinks.snapshotItem(i).href.replace("http://webcache.googleusercontent.com","https://webcache.googleusercontent.com");
	cachedLinks.snapshotItem(i).href = cachedLinks.snapshotItem(i).href.replace("http://www.google.com/","https://www.google.com/");
	cachedLinks.snapshotItem(i).href = cachedLinks.snapshotItem(i).href + "&strip=1";
}