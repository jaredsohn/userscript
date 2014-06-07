// ==UserScript==
// @name           sl-table-width
// @namespace      http://patraulea.com/gm
// @description    Scriptlance project list "Started" table row width fix
// @include        http://scriptlance.com/programmers/projects.shtml
// ==/UserScript==


var tds = document.evaluate("//td[@class='dt']", document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<tds.snapshotLength; i++) {
	td = tds.snapshotItem(i);
	if (td.innerHTML == "Started")
		td.width = "120";
}
