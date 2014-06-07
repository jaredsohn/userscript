// ==UserScript==
// @name           CraigsList MS Live Maps
// @namespace      CraigsList MS Live Maps
// @include        http://*.craigslist.org/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[contains(@href,"http://maps.google.com")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	
	var mslive = document.createElement('a')
	mslive.setAttribute('href', 'http://maps.live.com/default.aspx?where1=' + thisLink.href.substring(32).replace('+at+','+AND+'))
	mslive.setAttribute('target', '_new')
	mslive.innerHTML = 'live maps'
	
	thisLink.parentNode.insertBefore(mslive, thisLink)
	thisLink.parentNode.insertBefore(document.createTextNode('\u00a0\u00a0\u00a0'), thisLink)
}