// ==UserScript==
// @name          Find and alert hunting opportunity
// @namespace     http://www.heroeswm.com/group_wars.php
// @description   Find and alert hunting opportunity 
// @include       http://www.heroeswm.com/group_wars.php
// ==/UserScript==

GM_log('We navigate to group wars section!');

var allLinks, thisLink;
var maxLinks, linksPrinted; 
var locationNode;

maxLinks = 3;
linksPrinted = 0;

allLinks = document.evaluate( 
	'//a[@href]', 
	document, 
	null, 
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
	null
);
for (var i = 0; i < allLinks.snapshotLength; i++) { 
	thisLink = allLinks.snapshotItem(i); 
	// do something with thisLink
	if (thisLink.innerHTML.search(/Join/) != -1) {
		// need to find parent (td)'s prior sibling 
		locationNode = thisLink.parentNode.previousSibling;
		if (locationNode.innerHTML.search(/Hunter's assistance/) != -1) {
			GM_log("location text is " + locationNode.innerHTML + "\n");
			alert("Ready to hunt:" + thisLink.href);
		}
	} 

}
