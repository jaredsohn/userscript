// ==UserScript==
// @name        Chomikuj
// @namespace   chomikuj2013
// @include     *chomikuj.pl/*
// @description  Removes useless elements on chomikuj.pl page
// @version     1.0
// @grant   oku
// ==/UserScript==




function wytnijDiv(div_id) {
var element_znikaj = document.getElementById(div_id);
	if (element_znikaj) {
	    element_znikaj.parentNode.removeChild(element_znikaj);
	}
}

wytnijDiv("descriptionContent");
wytnijDiv("chatContainer");
wytnijDiv("aPlaceHolder");
wytnijDiv("talkoio-widget");