// ==UserScript==
// @name           Golem.de MessageFont
// @namespace      Bitfrickler
// @description    Ändert die Schriftart eines Forenbeitrags.
// @include        http://forum.golem.de/kommentare/*
// ==/UserScript==

var elements = document.body.getElementsByTagName('div');

for(var i = 0; i < elements.length; i++) {
	if(elements[i].className=='message-body') {
		elements[i].style.fontFamily = 'Arial';
	}
}