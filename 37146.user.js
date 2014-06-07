// ==UserScript==
// @name           Trac numbers
// @namespace      Epasas
// @description    If you enter number into search field, replaces it with ticket number. Eg. 1257 becomes #1257

// @include        http://localhost/trac
// ==/UserScript==

document.addEventListener('submit', function(event) {
	var searchField = document.getElementById('proj-search');
	if (searchField) {
		var value = parseInt(searchField.value);
		if (value > 0)
			searchField.value = '#' + value;
	}
}, true);