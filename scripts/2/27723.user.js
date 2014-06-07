// ==UserScript==
// @name           Tampereen uimavesien lämpötilat
// @namespace      http://www.maeki.org
// @description    Poistaa testi- ja viimevuotiset tulokset listasta
// @include        http://tampereenkaupunki.com/mobiili/uima.php
// ==/UserScript==

var allParas = document.getElementsByTagName('p');
for (var i = 0; i < allParas.length; i++) {
	thisPara = allParas[i];
	if (thisPara.hasChildNodes() && thisPara.childNodes.length > 3
	 && (thisPara.childNodes[1].textContent.match('testi')
	 ||  thisPara.childNodes[3].textContent.match('tulos viime vuodelta') ) ) {
		thisPara.style.display='none';		
	}
}