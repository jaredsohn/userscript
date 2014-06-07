// ==UserScript==
// @name	Link Tooltip
// @namespace   http://danpub.home.att.net
// @description Makes link target URL appear in the link tooltip
// @include     *
// ==/UserScript==

(function(){
	var alllinks, thislink; 
	alllinks = document.evaluate('//a[@href]', 
				document,null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
				null); 
	for (var i = 0; i < alllinks.snapshotLength; i++) { 
		thislink = alllinks.snapshotItem(i); 
		if (document.links[i].title=='') document.links[i].title = ' ' + thislink + ' ';
		else document.links[i].title += ' --> ' + thislink;
				}
	}
)()

