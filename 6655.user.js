// ==UserScript==
// @name             Entfernt Commander Werbung von 12/2006
// @description      Entfernt neuste Commander-Werbung 12/2006
// @author           Mr.-X
// @version          1.0
// @include          http://*game*.de/*

// ==/UserScript==

(function() {

	if (self.document.URL.indexOf("game/overview.php") != -1) { var tables = document.getElementsByTagName('div'); 
	for (var i = 0; i < tables.length; i++) 
{ if (tables[i].innerHTML.indexOf("Der Feind hat") != -1) 
{ tables[i].style['display'] = 'none'; 
break; }
 }
 }	
})();
