// ==UserScript==
// @name           PureOrigo
// @namespace      http://uptime.hu
// @description    Filter Spam on origo.hu main page
// @include        http://www.origo.hu/*
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
	console.log(allDivs.snapshotItem(i).id);
	if (allDivs.snapshotItem(i).id == "media" || allDivs.snapshotItem(i).id == "carouselAjanlatAlexandra") {
		filter = true
	}
	//if (allDivs.snapshotItem(i).id == "medialepedo" || allDivs.snapshotItem(i).id == "also_bannerek" || allDivs.snapshotItem(i).id == "divanybox" || allDivs.snapshotItem(i).id == "hgbox" || allDivs.snapshotItem(i).id == "ctravelbox") {
	//	allDivs.snapshotItem(i).parentNode.removeChild(allDivs.snapshotItem(i));
	//}
	
	if (filter) {
		allDivs.snapshotItem(i).parentNode.removeChild(allDivs.snapshotItem(i));
	}

	if (allDivs.snapshotItem(i).id == "banner300") {
		filter = false;
	}
}
