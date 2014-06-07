// ==UserScript==
// @name           nC adult magazines blacklist
// @namespace      http://userscripts.org/users/357725
// @include        *ncore.cc/torrents*
// ==/UserScript==

var tiltott = new Array();


//Ez a tiltólista. Alapból ezt az 5 nevet vettem fel, ezeket látom leggyakrabban. Te is hozzáadhatsz még amit akarsz, csak folytasd a számozást értelemszerűen: tiltott[x] = 'blabla';

tiltott[0] = 'playboy';
tiltott[1] = 'penthouse';
tiltott[2] = 'hustler';
tiltott[3] = 'ckm ';
tiltott[4] = 'fhm ';


var rel = document.getElementsByTagName("nobr");
var color = new Boolean();
var rejt = new Boolean();

color = false;
for (var i=rel.length-1; i >= 0; i--) {
	rejt = false;
	var temp = rel[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	for (var j=0; j < tiltott.length; j++)
		if (rel[i].parentNode.getAttribute('title').match(new RegExp(tiltott[j], 'gi')) && temp.childNodes[1].childNodes[1].getAttribute('href').match(/ebook/gi))
			rejt = true;
	if (rejt) {
		temp.parentNode.removeChild(temp);
		if (color)
			color = false;
		else
			color = true;
	}
	if (color && !rejt){
		temp = rel[i].parentNode.parentNode.parentNode.parentNode.parentNode;
		if (temp.getAttribute('class') == 'box_nagy')
			temp.setAttribute('class', 'box_nagy2');
		else
			temp.setAttribute('class', 'box_nagy');
	}
}