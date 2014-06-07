// ==UserScript==
// @name           Popmundo Sort Selects
// @namespace      http://popodeus.com
// @description    Sort dropdown menus in shopping assistant and on city page
// @include        http://www*.popmundo.com/Common/*
// ==/UserScript==

window.addEventListener('load', function() {

	var texts, values, sortme;
	function sorter(a, b) {
		return texts[a] < texts[b] ? -1 : 1;
	}
	function sortSelect(selname, skipfirst) {
		var select = document.getElementsByName(selname)[0];
		if (select) {
			texts = [];
			values = [];
			sortme = [];
			var first = skipfirst ? 1 : 0 ;
			var optlen = select.options.length - first;
			var selval = select.options[select.selectedIndex].value;
			for (var idx = 0; idx < optlen; idx++) {
				sortme[idx] = idx; // will contain 0...n
				texts[idx] = select.options[idx+first].text;
				values[idx] = select.options[idx+first].value;
			}
			// Sort index array by text order
			sortme.sort(sorter);
			for (var i = 0; i < optlen; i++) {
				idx = sortme[i]; // Get the sorted index 0...n
				var txt = texts[idx];
				var val = values[idx];
				var issel = selval == values[idx];
				select.options[i+first] = new Option(txt, val, false, issel);
			}
		}
	}

	var loc = location.href.toLowerCase();
	if (loc.indexOf('telephone.asp') >= 0 || loc.indexOf('search.asp') >= 0) {
		sortSelect('ItemCategoryID', true);
		sortSelect('ItemTypeID', true);
		sortSelect('ColorID', true);
	}
	if (loc.indexOf('city.asp?action=view') >= 0) {
		sortSelect('CityID', false);

	}

}, false);