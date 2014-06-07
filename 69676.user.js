// ==UserScript==
// @name           Dystans wsparć
// @namespace      http://plemiona.pl
// @description    Skrypt wyświetlający odległość wiosek z których przysłano nam wsparcia
// @include        http://pl*.plemiona.pl/*screen=place&mode=units*
// ==/UserScript==

var coordStr = document.getElementById('menu_row2').textContent;
coordStr = coordStr.substr(coordStr.lastIndexOf('('));
var xyPattern = new RegExp( "[(]{1}[0-9]+[|]{1}[0-9]+[)]{1}" );
var coords = xyPattern.exec(coordStr);
coords = coords[0].substr( 1, coords[0].length - 2 )
var x = coords.substr( 0, coords.indexOf( "|" ) );
var y = coords.substr( coords.indexOf("|") + 1, coords.length - coords.indexOf("|") - 1 ); 

var rows = document.forms[0].getElementsByTagName('table')[0].getElementsByTagName('tr');
var newTH = document.createElement("th");
newTH.innerHTML = "Odl.";
rows[0].insertBefore(newTH, rows[0].getElementsByTagName('th')[1]);
rows[1].getElementsByTagName('td')[0].setAttribute("colspan", 2);

for (var i = 2; i < rows.length-2; i++) {

	coordStr = rows[i].getElementsByTagName('td')[0].textContent;
	coordStr = coordStr.substr(coordStr.lastIndexOf('('));
	coords = xyPattern.exec(coordStr);
	coords = coords[0].substr( 1, coords[0].length - 2 )
	var vilX = coords.substr( 0, coords.indexOf( "|" ) );
	var vilY = coords.substr( coords.indexOf("|") + 1, coords.length - coords.indexOf("|") - 1 ); 
	var newTD = document.createElement('td');
	var dist = Math.round(Math.sqrt(Math.pow(vilX - x, 2) + Math.pow( vilY - y, 2)))
	newTD.innerHTML = "<b>" + dist + "</b>";
	rows[i].insertBefore(newTD, rows[i].getElementsByTagName('td')[1]);
	//sorting
	var idx = i;
	while (idx > 2) {
		var idxDist = rows[idx-1].getElementsByTagName('td')[1].textContent;
		if (dist < idxDist) idx--;
		else break;
	}
	var table = document.forms[0].getElementsByTagName('table')[0];
	var tbody = table.getElementsByTagName('tbody')[0];
	tbody.insertBefore(rows[i], rows[idx]);
}
rows[rows.length-2].getElementsByTagName('th')[0].setAttribute("colspan", 2);
rows[rows.length-1].getElementsByTagName('th')[0].setAttribute("colspan", 2);
