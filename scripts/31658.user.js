// Versión 0.1
// 20080309

// ==UserScript==
// @name           OGame - Colonizar
// @author		   LordMokuba
// @namespace      http://userscripts.org/scripts/show/23731
// @description	   Ogame Galaxia Full
// @include        http://*ogame.*/game/index.php?page=galaxy*
// ==/UserScript==

const cnst_ranking = ' en el ranking ';
const cnst_posicion = ' en la posición ';



// Removes leading whitespaces
function LTrim( value ) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}

// Removes ending whitespaces
function RTrim( value ) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}

// Removes leading and ending whitespaces
function trim( value ) {return LTrim(RTrim(value))}

function locate(xpath, xpres) {
	return document.evaluate(xpath, document, null, xpres, null);
}

function locateFirst(xpath) {
	return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
}

(function(){
//Colonizar desde la galaxia
	var session = document.getElementsByName("session")[0].getAttribute("value");
	var galaxy = document.getElementsByName("galaxy")[0].getAttribute("value");
	var system = document.getElementsByName("system")[0].getAttribute("value");

	var rows = document.getElementById("content").getElementsByTagName("table")[3].getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		if (rows[i].getElementsByTagName("th").length > 0) {
			var link = rows[i].getElementsByTagName("th")[0].getElementsByTagName("a")[0];
			if (link) {
				if (link.getAttribute("tabIndex")==null || link.getAttribute("tabIndex")==0) {
					var planet = link.innerHTML;
					link.setAttribute("href", "index.php?page=flotten1&session=" + session + "&galaxy=" + galaxy + "&system=" + system + "&planet=" + planet + "&planettype=1&target_mission=7");
				}
			}
		}
	}
//fin colonizar
	if (location.href.search('galaxy') != -1 ) {

		
		// colspan para los encabezados y pie de la tabla
		publi = document.getElementsByTagName('td');
		for (i = publi.length - 1; i >= 0; i--) {
			if (publi[i].hasAttribute('colspan') && publi[i].hasAttribute('class')){
				if (publi[i].getAttribute('class') == 'c') {
					if (publi[i].getAttribute('colspan') == '8') publi[i].setAttribute('colspan', '9');
					else if (publi[i].getAttribute('colspan') == '2') publi[i].setAttribute('colspan', '3');
				}
			}
		}
		
		// colspan para las filas de estado 
		publi = document.getElementById('fleetstatusrow');
		publi.firstChild.setAttribute('colspan', '9');
		//publi.setAttribute('colspan', '9');
	}

})();
