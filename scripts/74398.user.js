// ==UserScript==
// @name           tirol.gv.at/MTB
// @namespace      mtb
// @description    adds google earth link to table
// @include        http://www.tirol.gv.at/TirolGvAt/bike*
// ==/UserScript==

if (document.getElementById('contentPane').innerHTML.length > 20000) { 
	var table = document.getElementsByTagName('table')[0];

	var tdhead = document.createElement('td');
	tdhead.textContent = 'Earth';

	table.getElementsByTagName('tr')[0].appendChild(tdhead);


	var kinder = table.getElementsByTagName('tbody')[0].childNodes.length;

	var i = 0;
	while (i < (kinder / 2)) {
		
		var nr = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[0].getElementsByTagName('a')[0].textContent;
		
		var td = document.createElement('td');
		td.style.textAlign = "center";
		td.innerHTML = "<a href='http://gis.tirol.gv.at/waldmtb/kml/r"+nr+".kml'><img src='http://www.tirol.gv.at/TirolGvAt/layout/images/filetypes/kml.png' /></a>";
		table.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].appendChild(td);
		i = (i + 1);
	}
}