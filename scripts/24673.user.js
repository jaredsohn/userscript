// ==UserScript==
// @name           OGame - Full Galaxia [NL]
// @author		   LordMokuba - Nick Croonenborghs
// @description	   Ogame Galaxia Full [NL]
// @include        http://*ogame.*/game/index.php?page=galaxy*
// ==/UserScript==

const cnst_ranking = ' op rang ';
const cnst_posicion = ' op rang ';

//inactivos de rojo
var allElements, thisElement;
var cadena, suma;
allElements = document.getElementsByTagName('span');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    
	if (thisElement.className.substring(0,8)=='inactive')
		{

		thisElement.style.color = "red";
		
		}
	if (thisElement.className.substring(0,12)=='longinactive')
		{

		thisElement.style.color = "red";
		
		}
}
//fin inactivos de rojo




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
        // ank de nombre y alianza
		var sMember;
		var iRank;
		var sTemp;
		var gTable = locateFirst('//div[@id="content"]/center/center/table').childNodes[1];
				
		var p = document.createElement("td");
		p.setAttribute('class', 'c');
		p.innerHTML = 'Statistics';
		gTable.childNodes[2].appendChild(p);
		
		var publi = gTable.getElementsByTagName("tr");
		for (var i = 2; i < publi.length - 2; i++) {
			var p = document.createElement("th");
			p.setAttribute('style', 'white-space: nowrap;');
			publi[i].appendChild(p);
		};
		
		publi = document.getElementsByTagName ('th');
	
		for (i = 0; i < publi.length; i++) {
			p = publi[i].parentNode.lastChild;
			
			// es el nombre del jugador
			if ((publi[i].width == 150) && (publi[i].innerHTML.length > 100)) {
				sMember = publi[i].getElementsByTagName('span')[0].innerHTML;
				sTemp = publi[i].innerHTML.search(sMember) + sMember.length + cnst_ranking.length;
				iRank = publi[i].innerHTML.slice(sTemp, publi[i].innerHTML.search('</td>'));

                if(iRank > 1 && iRank < 200)
				{
				p.innerHTML = 'S: <font color=\'#FF0000\' size=1> ' + iRank + '</font>';  
				}
				if(iRank > 200 && iRank < 400)
				{
				p.innerHTML = 'S: <font color=\'#FFcc00\' size=1> ' + iRank + '</font>';  
				}
                if(iRank > 400 && iRank < 600)
                {
				p.innerHTML = 'S: <font color=\'#00DAB9\' size=1> ' + iRank + '</font>';  
				}
				if(iRank > 600 && iRank < 5000)
                {
				p.innerHTML = 'S: <font color=\'#00DDff\' size=1> ' + iRank + '</font>';   
				}
				if(iRank > 5000 && iRank < 16000)
                {
				p.innerHTML = 'S: <font color=\'#00DDff\' size=1> ' + iRank + '</font>';  
				}

			}
			
			// es el nombre de la alianza
			if ((publi[i].width == 80) && (publi[i].innerHTML.length > 100)) {
				sMember = LTrim(RTrim(publi[i].getElementsByTagName('a')[0].innerHTML));
				if (sMember.search('class') != -1) sMember = LTrim(RTrim(publi[i].getElementsByTagName('a')[0].childNodes[1].innerHTML));
				// si está instalado algúnm script que agrega información a la alianza entre ()
				if (sMember.search('[\(]') != -1) sMember = RTrim(sMember.substring(0, sMember.search('[\(]')));
				sTemp = publi[i].innerHTML.search(sMember) + sMember.length + cnst_posicion.length;
				iRank = publi[i].innerHTML.slice(sTemp, publi[i].innerHTML.search(' met '));

				p.innerHTML += ' A: <font color=\'#FFDAB9\'>' + iRank + '</font>';
			}
		}
		
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
