// ==UserScript==
// @name           Craigslist Exact Search
// @namespace      Craigslist Exact Search
// @include        http://*.craigslist.org/*
// ==/UserScript==

var bedrooms = document.getElementsByName('bedrooms')[0].selectedIndex + 'br';
var city = document.getElementById('query').value
GM_log('Showing only ' + bedrooms + ' properties in ' + city);

var allLinks, thisLink;
allLinks = document.evaluate(
    "//a[contains(@href,'.html') and contains(@href,'apa')]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	thisCity = thisLink.parentNode;
	try {
		if (thisLink.innerHTML.toLowerCase().indexOf(bedrooms.toLowerCase()) < 0  || thisCity.innerHTML.toLowerCase().indexOf(city.toLowerCase()) < 0){
			thisLink.parentNode.parentNode.removeChild(thisLink.parentNode);
			GM_log('Excluded: ' + thisLink.innerHTML);
		}
	} catch(e){};
}