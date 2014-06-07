// ==UserScript==
// @name azenmaster_loves_the_bruins
// @bad
// @include http://*.shacknews.com/laryn.x?*
// @include http://shacknews.com/laryn.x?*
// @include http://*.shacknews.com/frame_laryn.x?*
// @include http://shacknews.com/frame_laryn.x?*
// @include http://*.shacknews.com/profile.x?*
// @include http://shacknews.com/profile.x?*
// ==/UserScript==
/*


===============================================================================
Author: Digitalburro, then Fletch_

Thanks:  ThomW, I tried to understand GreaseMonkey by disecting his scripts
Edit: ThomW is very smart
===============================================================================

*/

(function() {

	var allLinks, thisLink, replacement;
	allLinks = document.evaluate("//a[@href='/profile/azenmaster']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	for (var i = 0; i < allLinks.snapshotLength; i++) 
	{
	    thisLink = allLinks.snapshotItem(i);
	    thisLink.innerHTML = '<font style="color:	#FFD700; font-size: 120%; font-weight:bold;">BruinsFan#1</font>';
	    thisLink.title = 'This is what you get for picking the habs';
	}
})();