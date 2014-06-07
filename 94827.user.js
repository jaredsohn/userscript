// ==UserScript==
// @name 		   NiaModel TChat - changer ma couleur
// @namespace	   http://niaxchange.com/services/tchatV5/cli_general.php
// @description	version 1
// @include		http://niaxchange.com/services/tchatV5/cli_general.php
// ==/UserScript==

var myColor    = '#CC0099';
var myNickName = 'Cristolien';
var AFont = document.getElementsByTagName('font');
for (var i=0;i<=AFont.length-1;i++) {
	if (AFont[i].textContent == myNickName) {
		AFont[i].setAttribute('color', myColor); // on change la couleur du nickname
		AFont[i].parentNode.parentNode.nextSibling.firstChild.setAttribute('color', myColor); // on choppe le texte et on lui change sa couleur aussi.
	}
}