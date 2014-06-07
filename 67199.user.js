// ==UserScript==
// @name           COSMiQ - Sticky Sidebar
// @namespace      http://userscripts.org/scripts/show/67199
// @include        http://www.cosmiq.de*
// @version        20100125
// ==/UserScript==

(function(d){
	function getElementsByXPath(obj, xPathString){
		if (obj.ownerDocument)  {
			xPathString = xPathString.replace(/^\/\//, '/descendant::')
		}
		var xPathSnapshot = (obj.ownerDocument || obj).evaluate(xPathString, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var xPathArray = [];
		for (var i = 0; i < xPathSnapshot.snapshotLength; i++) {
			xPathArray[i] = xPathSnapshot.snapshotItem(i);
		}
		return (xPathArray || []);
	}
	window.addEventListener('scroll',function(e) {
		var sideBarTeaser = d.getElementById('teaser');
		if (!sideBarTeaser) return;
		var sideBar = getElementsByXPath(sideBarTeaser,'./div[@class="RGT"]')[0]; 
		if (!sideBar) return;
		if (document.documentElement.scrollTop > 100) {
			sideBar.style.position = 'fixed'; 
			sideBar.style.top = '0';
			sideBar.style.width = '180px';
			sideBar.style.margin = '0 0 10px 10px';
		} else {
			sideBar.style.position = 'relative'; 
			sideBar.style.top = 'auto';
			sideBar.style.margin = '10px 0 10px 10px';
		}
	}, true);
}(document));