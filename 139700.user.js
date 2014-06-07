// ==UserScript==
// @id             wiki-medal-table@sjorford@gmail.com
// @name           Wiki medal table
// @version        1.0
// @namespace      sjorford@gmail.com
// @author         Stuart Orford
// @description    Convert the official London 2012 website medal table into wikitext
// @include        http://www.london2012.com/medals/medal-count/
// @run-at         document-end
// ==/UserScript==

var table = document.getElementsByClassName('or-tbl')[0];
var rows = table.rows;

var rowspan = 1;
var goldTotal = 0;
var silverTotal = 0;
var bronzeTotal = 0;
var totalTotal = 0;

var wikitext = '';

for (var r = rows.length - 1; r > 1; r--) {
	
	// Parse cell data
	var ranking = rows[r].cells[0].innerHTML;
	var IOCcode = rows[r].cells[1].getElementsByTagName('img')[0].src.split('/')[6].split('.')[0];
	var gold    = rows[r].cells[2].innerHTML - 0;
	var silver  = rows[r].cells[3].innerHTML - 0;
	var bronze  = rows[r].cells[4].innerHTML - 0;
	var total   = rows[r].cells[6].innerHTML - 0;

	goldTotal   += gold;
	silverTotal += silver;
	bronzeTotal += bronze;
	totalTotal  += total;
	
	// Start new row
	var newtext = '|-';
	if (IOCcode == 'GBR') {
		newtext += 'bgcolor="ccccff"';
	}
	newtext += '\n';
	
	// Ranking
	if (ranking == (r - 1)) {
		if (rowspan > 1) {
			newtext += '| rowspan="' + rowspan + '"';
			rowspan = 1;
		}
		newtext += '| ' + ranking + ' |';
	} else {
		rowspan++;
	}
	
	// Flag
	newtext += '| align=left| {{flagIOCteam|' + IOCcode + '|2012 Summer}}';
	
	// Medals
	newtext += ' || ' + gold + ' || ' + silver + ' || ' + bronze + ' || ' + total + '\n';
	
	// Transclusion
	if (ranking == 10) {
		newtext += '</onlyinclude><!--Move this /onlyinclude tag directly under the 10th nation-->\n';
	}
	
	wikitext = newtext + wikitext;
	
}

// Header
wikitext = '{| {{RankedMedalTable|class=wikitable sortable}}\n<onlyinclude>\n' + wikitext;

// Footer
wikitext += '|- class="sortbottom"\n'
wikitext += '!colspan=2| Total || ' + goldTotal + ' || ' + silverTotal + ' || ' + bronzeTotal + ' || ' + totalTotal + '\n';
wikitext += '|}\n';

// Write to page
var textarea = document.createElement('textarea');
table.parentNode.insertBefore(textarea, table);
textarea.value = wikitext;
textarea.style.width = '100%';
textarea.style.height = '200px';
textarea.style.font = '10pt Courier';

/*
|-
| 1 || align=left| {{flagIOCteam|CHN|2012 Summer}} || 9 || 5 || 3 || 17
|-
| 2 || align=left| {{flagIOCteam|USA|2012 Summer}} || 5 || 7 || 5 || 17
|-
| 3 || align=left| {{flagIOCteam|FRA|2012 Summer}} || 3 || 1 || 3 || 7
|-
| 4 || align=left| {{flagIOCteam|PRK|2012 Summer}} || 3 || 0 || 1 || 4

|-
| rowspan="2"| 12 || align=left| {{flagIOCteam|BRA|2012 Summer}} || 1 || 1 || 1 || 3
|-
| align=left| {{flagIOCteam|HUN|2012 Summer}} || 1 || 1 || 1 || 3
|-
| 14 || align=left| {{flagIOCteam|NED|2012 Summer}} || 1 || 1 || 0 || 2

*/