// ==UserScript==
// @name           NoVelvet
// @namespace      http://uptime.hu
// @description    Filter Velvet on index.hu main page
// @include        http://index.hu/
// ==/UserScript==

var allDivs, thisDiv, filter;
filter = false;
allDivs = document.evaluate(
    "//div",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	if (allDivs.snapshotItem(i).id == "top_velvet") {
		filter = true
	}
	if (allDivs.snapshotItem(i).id == "medialepedo" || allDivs.snapshotItem(i).id == "also_bannerek" || allDivs.snapshotItem(i).id == "divanybox" || allDivs.snapshotItem(i).id == "hgbox" || allDivs.snapshotItem(i).id == "ctravelbox") {
		allDivs.snapshotItem(i).parentNode.removeChild(allDivs.snapshotItem(i));
	}
	if (allDivs.snapshotItem(i).id == "top_tc") {
		filter = false
	}
	if (filter) {
		allDivs.snapshotItem(i).parentNode.removeChild(allDivs.snapshotItem(i));
	}
}