// Versión 0.3-fr
// 20070916

// ==UserScript==
// @name           Ogame.fr - Classement dans la galaxie
// @author	   FryGuy - ogame.com.es - uni7
// @namespace      http://userscripts.org/scripts/show/12313
// @description    Affiche les classements du joueur et de son alliance dans une nouvelle colonne de la page Galaxie
// @include        http://*.ogame.*/game/index.php*page=galaxy*
// ==/UserScript==

const cnst_ranking = ' classé  ';
const cnst_posicion = ' classée  ';

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
	// gracias SpitFire: http://userscripts.org/scripts/show/8555
	return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
}

(function(){

	if (location.href.search('galaxy') != -1 ) {
		//agregar el rango como parte del nombre
		var sMember;
		var iRank;
		var sTemp;
		
		var gTable = locateFirst('//div[@id="content"]/center/center/table').childNodes[1];
		//gTable.firstChild.childNodes[1].setAttribute('colSpan', '9');
		
		var p = document.createElement("td");
		p.setAttribute('class', 'c');
		p.innerHTML = 'Classements';
		gTable.childNodes[2].appendChild(p);
		
		var publi = gTable.getElementsByTagName("tr");
		for (var i = 2; i < publi.length - 2; i++) {
			//alert(publi.length + '<br>' + i + '<br>' + publi[i].innerHTML);
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

				p.innerHTML = 'J: <font color=\'#FFDAB9\'>' + iRank + '</font>';
			}
			
			// es el nombre de la alianza
			if ((publi[i].width == 80) && (publi[i].innerHTML.length > 100)) {
				sMember = LTrim(RTrim(publi[i].getElementsByTagName('a')[0].innerHTML));
				if (sMember.search('class') != -1) sMember = LTrim(RTrim(publi[i].getElementsByTagName('a')[0].childNodes[1].innerHTML));
				// si está instalado algúnm script que agrega información a la alianza entre ()
				if (sMember.search('[\(]') != -1) sMember = RTrim(sMember.substring(0, sMember.search('[\(]')));
				sTemp = publi[i].innerHTML.search(sMember) + sMember.length + cnst_posicion.length;
				iRank = publi[i].innerHTML.slice(sTemp, publi[i].innerHTML.search(' avec '));

				p.innerHTML += '<br />A: <font color=\'#FFDAB9\'>' + iRank + '</font>';
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