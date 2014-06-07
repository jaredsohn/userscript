// ==UserScript==
// @name          Count user scripts
// @namespace     http://youngpup.net/userscripts/
// @description   Counts the number of user scripts on the repository
// @include       http://dunck.us/collab/GreaseMonkeyUserScripts*
// ==/UserScript==

GM_registerMenuCommand("Count user scripts", function() {
	alert("There are about " + document.evaluate(
		"//a[contains(translate(@href, 'USERJS', 'userjs'), '.user.js')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null).snapshotLength + " user scripts today.");
});