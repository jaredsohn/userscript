// ==UserScript==
// @name           WyjebUsera
// @namespace      SirMike
// @description    Usuwa niechciane posty z Forum poly
// @include        http://forum.polygamia.pl/index.php/topic*
// ==/UserScript==

var users = ["UserName1", "UserName2"];
var allRows, thisRow;

for(u in users) {
	allRows = document.evaluate(
		'//a[text() = "' + users[u] + '"]/../../../../../../../../../../..',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i = 0; i < allRows.snapshotLength; i++) {
		thisRow = allRows.snapshotItem(i);
		thisRow.parentNode.removeChild(thisRow);
	}
}
