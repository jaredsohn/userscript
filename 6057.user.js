// ==UserScript==
// @name            SklanjaNeprijateljImaOci...
// @description     Mice najnoviju reklamu za Komandera na ogame.com.hr serverima
// @author          Sentinel
// @version         1.0.2
// @include         http://uni*.ogame.ba/*
// ==/UserScript==

(function() {

	if (self.document.URL.indexOf("game/overview.php") != -1) { var tables = document.getElementsByTagName('div'); 
	for (var i = 0; i < tables.length; i++) 
{ if (tables[i].innerHTML.indexOf("Neprijatelj ima oci svuda...") != -1) 
{ tables[i].style['display'] = 'none'; 
break; }
 }
 }	
})();