// ==UserScript==
// @name           Ogame forum add remover
// @namespace      dk.apinx
// @description    OgameForum Add Remover
// @include        *board.ogame.*
// @version        1.0.0.0000
// @updateURL      http://userscripts.org/scripts/show/131303

// ==/UserScript==


remove("adsTop");
remove("adsRight");

function remove(elem_name) {
	var elem = document.getElementById(elem_name);
	if(elem)
		elem.parentNode.removeChild(elem);
}