// ==UserScript==
// @name        bib - highlight filled requests
// @namespace   diff
// @include     http*://bibliotik.org/*requests*
// @version     0.1
// @grant	none
// ==/UserScript==

var rows = document.querySelectorAll('div.table_div table tbody tr');
for (i=0; row=rows[i]; i++) {
	var cell = row.querySelectorAll('td')[5];
	if (cell.textContent.indexOf("Never") < 0) {
		cell.parentNode.style.backgroundColor='#E5E5E5';
	}
}