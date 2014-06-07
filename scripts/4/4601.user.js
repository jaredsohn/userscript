// ==UserScript==
// @name          Forum post redirecter
// @namespace     #Jo\n - http://myspace.com/gmscripts
// @description	  Redirects after you reply to a forum post
// @include       http://*myspace.com/*messageboard.poste*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for(var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	var re = new RegExp(/viewThread/);
	if(re.exec(thisLink)) location.href = thisLink;


	
}