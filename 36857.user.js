// ==UserScript==
// @name           shouldireallyusetablesforlayout
// @namespace      icaaq.com
// @description    Emphasis the importance of not using tables for layout
// @include        http://shouldiusetablesforlayout.com/
// ==/UserScript==
(function() {
	document.getElementsByTagName('H1')[0].innerHTML = "HELL NO";
})();