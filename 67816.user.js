// ==UserScript==
// @name          DS_Marktmaximum
// @description    Bei fremden Marktangeboten wird das Maximum statt 1 als Standard eingetragen
// @include        http://de*.die-staemme.de/game.php?*screen=market&mode=other_offer*
// @author 	pinjam
// ==/UserScript==

(function main() {
	var i = 0;
	opera = window.opera?true:false;
	if (opera) {
		var tragen = parseInt(document.getElementsByClassName('vis')[1].innerText.split(' ')[1].split('/')[0]) * 1000;
	}
	else {
		var tragen = parseInt(document.getElementsByClassName('vis')[1].textContent.split(' ')[1].split('/')[0]) * 1000;
	};
	if (document.getElementsByClassName('vis')[3].getElementsByTagName('a')[0].href.indexOf('&start=')>0) i = 1;
	var tabelle = document.getElementsByClassName('vis')[3+i];
	for(var z = 1; z <= 20; z = z + 2) {
		if (tabelle.getElementsByTagName('tr')[z].innerHTML.indexOf('Handel annehmen') == -1 && tabelle.getElementsByTagName('tr')[z].innerHTML.indexOf('Nicht genug') == -1) {
			if (opera) {
				var tour = parseInt(tabelle.getElementsByTagName('tr')[z].firstChild.nextSibling.innerText.split('.')[0]) * 1000 + parseInt(tabelle.getElementsByTagName('tr')[z].firstChild.nextSibling.innerText.split('.')[1]);
				if (!tour) tour = parseInt(tabelle.getElementsByTagName('tr')[z].firstChild.nextSibling.innerText);
				var max = Math.floor(tragen/tour);
				var anzahl = parseInt(tabelle.getElementsByTagName('tr')[z].lastChild.previousSibling.previousSibling.previousSibling.innerHTML.split(' ')[0]);
				tabelle.getElementsByTagName('tr')[z].lastChild.previousSibling.getElementsByTagName('input')[0].value = Math.min(anzahl, max);
			}
			else {
				var tour = parseInt(tabelle.getElementsByTagName('tr')[z].firstChild.nextSibling.nextSibling.nextSibling.textContent.split('.')[0]) * 1000 + parseInt(tabelle.getElementsByTagName('tr')[z].firstChild.nextSibling.nextSibling.nextSibling.textContent.split('.')[1]);
				if (!tour) tour = parseInt(tabelle.getElementsByTagName('tr')[z].firstChild.nextSibling.nextSibling.nextSibling.textContent);
				var max = Math.floor(tragen/tour);
				var anzahl = parseInt(tabelle.getElementsByTagName('tr')[z].lastChild.previousSibling.previousSibling.previousSibling.innerHTML.split(' ')[0]);
				tabelle.getElementsByTagName('tr')[z].lastChild.previousSibling.getElementsByTagName('input')[0].value = Math.min(anzahl, max);
			}
		}
	}



})();
