// ==UserScript==
// @name           SSW Control Percentage
// @namespace      http://homeworlds.secretsocietywars.com/crashnburn11
// @description    Calculates Societies Control Percentages
// @include        http://www.secretsocietywars.com/index.php?p=space&a=sector_map
// ==/UserScript==

var societies = {"<b>Drones:</b> Eastern Star": "es", "<b>Drones:</b> Oddfellowish": "oddie", "<b>Drones:</b> Illuminati": "lummie", "<b>Drones:</b> Triadi": "triad", "<b>Drones:</b> Amaranthine": "ammie"};
var sectors = get_sectors();
var parent_table = document.evaluate('//td[@class="main"]//table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var cell = parent_table.insertRow(1).insertCell(0);
function get_sectors() {
	var s = new Object();

	for(var sectors in societies) {
		var val = document.evaluate('//td[@class="main"]//div[contains(@onmouseover, "'+sectors+'")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(val.snapshotLength != undefined) {
			s[societies[sectors]] = val.snapshotLength/1089 * 100;

		} else {
		s[societies[sectors]] = 0;
		}
		
	}
				
	return s;
}

var j = 100 - sectors.es - sectors.oddie - sectors.lummie - sectors.triad - sectors.ammie;

//alert(sectors.triad.toFixed(2) + "% Triad Control\n" + sectors.es.toFixed(2) + "% Eastern Star Control\n" + sectors.ammie.toFixed(2) + "% Amaranth Control\n" + sectors.lummie.toFixed(2) + "% Illuminati Control\n" + sectors.oddie.toFixed(2) + "% Oddfellow Control\n" + j.toFixed(2) + "% Uncontrolled\n");
cell.colSpan = 23;
cell.innerHTML = "<b>Control Percentages:</b><br>" + sectors.triad.toFixed(2) + "% Triad Control<br>" + sectors.es.toFixed(2) + "% Eastern Star Control<br>" + sectors.ammie.toFixed(2) + "% Amaranth Control<br>" + sectors.lummie.toFixed(2) + "% Illuminati Control<br>" + sectors.oddie.toFixed(2) + "% Oddfellow Control<br>" + j.toFixed(2) + "% Uncontrolled<br>";