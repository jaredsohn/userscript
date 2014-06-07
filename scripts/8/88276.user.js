// ==UserScript==
	// @name		Table Stripes easy matches
	// @description shade alternating rows of data tables
	// @include		*
	// ==/UserScript==

	var arTableRows = document.getElementsByTagName('tr');
	var bHighlight = true;
	for (var i = arTableRows.length - 1; i >= 0; i--) {
		var elmRow = arTableRows[i];
		elmRow.style.backgroundColor = bHighlight ? '#ddd' : '#fff';
		elmRow.style.color = '#000';
		bHighlight = !bHighlight;
	}
