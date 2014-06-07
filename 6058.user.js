// ==UserScript==
// @name             Uklanjanje "Prema Zvijezdama..." Oglasa Za Ogame Komander
// @description      Mice najnoviju reklamu za Komandera na ogame.ba serverima
// @source           http://userscripts.org/scripts/show/6058
// @identifier       http://userscripts.org/scripts/source/6058.user.js
// @version          1.0.3
// @date             2007-08-02
// @creator          Sentinel
// @include          http://uni*.ogame.ba/*

// ==/UserScript==

(function() {

	if (self.document.URL.indexOf("game/overview.php") != -1) { var tables = document.getElementsByTagName('div'); 
	for (var i = 0; i < tables.length; i++) 
{ if (tables[i].innerHTML.indexOf("Prema zvijezdama...") != -1) 
{ tables[i].style['display'] = 'none'; 
break; }
 }
 }	
})();