// ==UserScript==
// @name           Google Analytics Absolute Conversion
// @namespace      http://artyv.ru
// @version        2.1
// @author         Vasiliy Aksyonov
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description    Converts percent values to absolute values in tables
// @include        https://google.com/analytics/reporting/*
// @include        https://*.google.com/analytics/reporting/*
// @exclude        https://google.com/analytics/reporting/top_content*
// @exclude        https://*.google.com/analytics/reporting/top_content*
// @exclude        https://google.com/analytics/reporting/content_titles*
// @exclude        https://*.google.com/analytics/reporting/content_titles*
// @exclude        https://google.com/analytics/reporting/content_drilldown*
// @exclude        https://*.google.com/analytics/reporting/content_drilldown*
// ==/UserScript==

function calcAbs() {
	var statTableRows = document.getElementById('f_table_data').rows;
	for(var i = 1; i < statTableRows.length; i++) {
		if (statTableRows[i].className.indexOf('comparison_values') > -1) continue;
		var rowCells = statTableRows[i].cells;
		var absoluteSource = rowCells[2].textContent.replace(/[^\d]/g, '');
		for(var j = 3; j < rowCells.length; j++) {
			var percentSource = rowCells[j].textContent.replace(/\s/g, '');
			if (percentSource[percentSource.length - 1] == '%') {
				percentSource = parseFloat(percentSource.replace('%', '').replace(',', '.'));
				rowCells[j].innerHTML += '(' + Math.round((absoluteSource / 100) * percentSource) + ')';
			}
		}
	}
}

if(document.getElementById('f_table_data')) {
	calcAbs();
	document.getElementById('Table').addEventListener('DOMSubtreeModified', calcAbs, false);
}