// ==UserScript==
// @name             Entfernt Commander Werbung von 25.01.2007
// @description      Entfernt OGame OGame.de Commander Werbung 01/2007 2007
// @author           Mr.-X
// @version          1.0
// @include          http://*game*.de/*

// ==/UserScript==

(function() {

	if (self.document.URL.indexOf("game/overview.php") != -1) { var tables = document.getElementsByTagName('div'); 
	for (var i = 0; i < tables.length; i++) 
{ if (tables[i].innerHTML.indexOf("Ohne Commander") != -1) 
{ tables[i].style['display'] = 'none'; 
break; }
 }
 }	
})();

