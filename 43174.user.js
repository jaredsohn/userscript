// ==UserScript==
// @name           Red filter
// @namespace      isohunt_red_filter
// @include        http://isohunt.com/torrents/*
// @description    Hides torrents with negative ratings on isohunt 
// ==/UserScript==
var table = document.getElementById('serps');

var row, rows = table.rows;
for (var i = 0, len = rows.length; i < len; i++) {
	row = rows[i];
	
	if (row.className == 'hlRow') {
		var cell = row.cells[2];
		if(cell.childNodes[0].innerHTML) {
			if(cell.childNodes[0].innerHTML.substring(0, 1) == '-') {
				row.style.display = 'none';
			}
		}
	}
}