// ==UserScript==
// @name           Eksi Duyuru No Summary
// @namespace      fader
// @description    Duyurularin ozetlerini gizleme kalkani.
// @include        http://www.eksiduyuru.com/*
// @version        1.0
// ==/UserScript==

window.onload = function() {
	document.styleSheets[2].insertRule(".bottomleft{display:none}", 1);
}