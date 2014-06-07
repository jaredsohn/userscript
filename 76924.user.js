// ==UserScript==
// @name           Pardus Nav Ratio Changer
// @namespace      marnick.leau@skynet.be
// @description    Changes the ratio of your Nav Screen to e.g. 7x5 tiles.
// @include        http://*.pardus.at/main.php
// ==/UserScript==

function script() {
	// Define how many rows to remove from the top and bottom:
	var top = 1;
	var bottom = 1;

	var navArea = document.getElementById('navarea');
	
	var rows = navArea.getElementsByTagName('tr');
	for (top;top > 0;top--) {
		rows[0].parentNode.removeChild(rows[0]);
	}
	
	rows = navArea.getElementsByTagName('tr');
	for (bottom;bottom > 0;bottom--) {
		rows[rows.length - 1].parentNode.removeChild(rows[rows.length - 1]);
	}
	navArea.setAttribute('style',null);
}

script();

if (unsafeWindow.checkToDo !== undefined) {
	var local_checkToDo = unsafeWindow.checkToDo;
	unsafeWindow.checkToDo = function() {
		local_checkToDo();
		setTimeout(script,1);
	}
}