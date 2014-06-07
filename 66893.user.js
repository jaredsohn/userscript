// ==UserScript==
// @name           'Building' to 'Website'
// @namespace      http://userscripts.org/users/yoniholmes
// @description    Replaces the word 'Building' with 'Website'
// @include        http://www.gyford.com/phil/writing/2004/10/24/how_buildings_le.php
// ==/UserScript==


// Get all text nodes
textNodes = document.evaluate(
	"//text()",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);

// Replace the words
for (var i=0, len = textNodes.snapshotLength; i < len; i++) {
	var node = textNodes.snapshotItem(i);
	node.data = node.data.replace(/Buildings/g, "Websites"); 
	node.data = node.data.replace(/buildings/g, "websites"); 
	node.data = node.data.replace(/Building/g, "Website"); 
	node.data = node.data.replace(/building/g, "website"); 
}


