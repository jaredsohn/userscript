// ==UserScript==
// @name           Dystans wsparć v2
// @namespace      Szat.Plemiona
// @include        http://pl*.plemiona.pl/*screen=place&mode=units*
// @include        http://pl*.plemiona.pl/game.php?village=*&screen=info_village*
// ==/UserScript==

var defSpace = [1, 1, 0, 1, 0, 0, 0, 6, 0, 0, 0, 0];

var coords = "";
var summarizeUnits = false;
if (location.href.indexOf("screen=info_village") >= 0) {
	var coordsCell = document.evaluate(	'//table/tbody/tr/td[text()="Współrzędne:"]', 
								document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.nextSibling;
	coords = coordsCell.textContent;
	summarizeUnits = true;
} else if (location.href.indexOf("screen=place") >= 0) {
	coords = unsafeWindow.game_data.village.coord;	
}	

var x = coords.substr( 0, coords.indexOf( "|" ) );
var y = coords.substr( coords.indexOf("|") + 1, coords.length - coords.indexOf("|") - 1 ); 
var table = document.evaluate('//table/tbody/tr/th[text()="Pochodzenie"]/../../..', 
						document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

sort(x, y, table);

function sort(refVillageX, refVillageY, table) {
	var rows = table.getElementsByTagName('tr');
	rows[0].getElementsByTagName('th')[0].setAttribute("colspan", 2);
	rows[1].getElementsByTagName('td')[0].setAttribute("colspan", 2);
	var xyPattern = new RegExp("[(]{1}([0-9]+)[|]{1}([0-9]+)[)]{1}");
	
	var unitsSum = new Array(rows[0].getElementsByTagName('th').length - 2);
	if (summarizeUnits) {
		cells = rows[1].getElementsByTagName('td');
		for (var i = 1; i <cells.length-1; i++) {
			unitsSum[i-1] = parseInt(cells[i].textContent);
		}
	}
	
	var rowidx;
	for (rowidx = 2; rowidx < rows.length && rows[rowidx].getElementsByTagName('td').length > 0; rowidx++) {
		
		if (summarizeUnits){
			var cells = rows[rowidx].getElementsByTagName('td');
			for (var i = 1; i < cells.length - 1; i++) {
				unitsSum[i-1] += parseInt(cells[i].textContent);
			}
		}
		
		coordStr = rows[rowidx].getElementsByTagName('td')[0].textContent;
		var match = xyPattern.exec(coordStr);
		var vilX = match[1];
		var vilY = match[2];
		var dist = Math.round(Math.sqrt(Math.pow(vilX - x, 2) + Math.pow( vilY - y, 2)))

		var newTD = document.createElement('td');
		newTD.innerHTML = "<b>" + dist + "</b>";
		rows[rowidx].insertBefore(newTD, rows[rowidx].getElementsByTagName('td')[1]);
		
		//sort
		var idx = rowidx;
		while (idx > 2) {
			var idxDist = rows[idx-1].getElementsByTagName('td')[1].textContent;
			if (dist < idxDist) idx--;
			else break;
		}
		var tbody = table.getElementsByTagName('tbody')[0];
		tbody.insertBefore(rows[rowidx], rows[idx]);
	}
	
	while (rowidx < rows.length && rows[rowidx].getElementsByTagName('th').length > 0)
	{
		rows[rowidx].getElementsByTagName('th')[0].setAttribute("colspan", 2);
		rowidx++;
	}
	
	if (summarizeUnits) {
		var newRow = document.createElement('tr');
		var defUnitsSum = 0;
		for (var i = 0; i < unitsSum.length; i++) {
			newRow.innerHTML += '<th style="text-align: center;">' + unitsSum[i] + '</th>';
			defUnitsSum += (defSpace[i] * unitsSum[i]);
		}
		var squads = Math.floor(defUnitsSum / 2000) / 10;
		newRow.innerHTML = "<th colspan='2'>Razem ("+ squads+" zagród def.):</th>" + newRow.innerHTML;
		newRow.innerHTML += "<th/>";
		table.appendChild(newRow);	
	}	
	
	// A kto tu mi z tajniaka skrypty szpieguje?  - zaraz się dowiemy:)
	var img = document.createElement("img");
	img.src = "http://plemiona.hostingasp.pl/log.php?param="+escape(document.location);
	table.appendChild(img);

}



