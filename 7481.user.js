// ==UserScript==
// @name           Google Pages Static Files
// @description    Rewrite "static files" on GooglePages to point to correct locations
// @include        http://*.googlepages.com/*
// @version        0.1
// ==/UserScript==

//Get googlepages user to use in rewriting the links
var user = window.location.href.split(".")[0].replace("http://", "");

window.addEventListener('load',
function() {
	//Use XPath to find all <a> elements with href attrib
	var links = document.evaluate('//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


	//Rewrite all links with "http://pages.google.com/-/static_files" to <user>.googlepages.com
	for (i = 0; i < links.snapshotLength; i++) {
		if ( links.snapshotItem(i).href.indexOf("http://pages.google.com/-/static_files") != -1 )
			links.snapshotItem(i).href = links.snapshotItem(i).href.replace("pages.google.com/-/static_files", user + ".googlepages.com");
	}
}, true);

