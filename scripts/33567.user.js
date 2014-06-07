// ==UserScript==
// @name           Highrise Contact Counts 
// @namespace      VJ
// @description    Displays count of records
// @include        http://*.highrisehq.com/
// @include        http://*.highrisehq.com/*
// ==/UserScript==
// Returns null if expr didn't match anything
function getFirstXPathResult(expr, node)
{
	node = node || document;
	var res = document.evaluate(expr, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	return res.singleNodeValue;
}
// Get number of checkboxes being displayed
var countCurrent = document.evaluate("/html/body//label[@class='checkbox']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (countCurrent != null) {
	countCurrent= countCurrent.snapshotLength
}
// Update Display of totals
var countDisplay = getFirstXPathResult("/html/body//span[@class='meta']");
if (countDisplay != null) {
	countDisplay.innerHTML += "<br />" + countCurrent + " contacts displayed";
}
