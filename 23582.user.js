// ==UserScript==
// @name           Hide Console Threads in the games forum on whirlpool.net.au
// @namespace      userscripts.org
// @description    Hide Console Threads in the games forum on whirlpool.net.au
// @include        http://forums.whirlpool.net.au/forum-threads.cfm?f=8*
// ==/UserScript==

var singleLinks = document.evaluate( '//a[@class="small"]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

for (var s = 0; s < singleLinks.snapshotLength; s++){

    if(singleLinks.snapshotItem(s).textContent == 'Console'){
	
		singleLinks.snapshotItem(s).parentNode.parentNode.style.display = 'none';
		
    }
}
	