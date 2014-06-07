// ==UserScript==
// @name           ogame - HaupPlanet V 1.0 (fr)
// @namespace      Planete Mere
// @description    Script permettant de voir la position de la planète mère des joueurs par la vue galaxie (V 1.0)
// @include        http://*/game/index.php?page=galaxy*
// ==/UserScript==

/***********************************************************
L'original est ici http://84.38.65.161/org/addons.html (OGameSkript)
Nom original : ogame - Hauptplanetv2
Auteur original : Inconnu
Traducteurs : Call Of Duty,
Ajout de code : Gollum,
partie Suggestion : http://board.ogame.fr/thread.php?postid=8892750
***********************************************************/

urls = new Array();

function get_from_to(strLine, begin, end) {
	return strLine.substring(strLine.indexOf(begin) + begin.length , strLine.indexOf(end));
}

function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}
	else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}


unsafeWindow.checkHomePlanet = function (xurl){
	window.setTimeout(function() {
		GM_xmlhttpRequest({
		method: 'GET',
		url: urls[xurl],
			onload: function(responseDetails) {
			txt = responseDetails.responseText;
			txt = get_from_to(txt,'<input type="text" name="to" size="40" value="',']" /></th>');
			txt = txt.substr(txt.indexOf('[')+1);
			txt1 = txt.match(/([0-9]+):([0-9]+):([0-9]+)/);

			document.getElementById('homeimg'+xurl).innerHTML = document.getElementById('homeimg'+xurl).innerHTML.replace(
				'onmouseover="javascript:checkHomePlanet(' + xurl + ');this.blur();',
				'onclick="javascript:showGalaxy('+txt1[1]+','+txt1[2]+','+txt1[3]+');');
			document.getElementById('homeimg'+xurl).innerHTML = document.getElementById('homeimg'+xurl).innerHTML.replace(
				'Position de la PM',
				'Cliquez pour voir la PM ['+txt1[1]+':'+txt1[2]+':'+txt1[3]+']');
			}
		});
	}, 0);
};

var pagina = document.getElementsByTagName('a');
cnt = 0;
for (var i = 0; i < pagina.length; i++) {
	if (pagina[i].href.search("page=writemessages") != -1){
		var xspan = document.createElement("span");
		urls[cnt] = pagina[i].href;
		xspan.id = 'homeimg' + cnt;
		xspan.innerHTML = ' <a onmouseover="javascript:checkHomePlanet(' + cnt + ');this.blur();" style="text-decoration:none;cursor:pointer;"><img src="http://ogame-skript.com/de/Metallica/pic/home.gif" title="Position de la PM" border="0"></a>';
		insertAfter(xspan,pagina[i]);
		cnt++;
	}
}