// ==UserScript==
// @name          Direct Linker
// @author        ankut
// @include	  *
// @description	  Finds redirect links and replaces them with the final destination link
// ==/UserScript==

// get the links to the next pages
var links = document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (!links) return;
for (i = 0; i < links.snapshotLength; i++) 
	links.snapshotItem(i).href = unescape(links.snapshotItem(i).href).replace(/^.*\?.*(http:\/\/[^&]+).*$/i, "$1");
