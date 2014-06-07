// ==UserScript==
// @name        Ogame Pro Shipyard v1.0
// @namespace	Ogame Pro Shipyard v1.0
// @description This script removes this fleets from Shipyard: Light & Heavy Fighter, Cruiser & Colony Ship. (cannot remove light cargo yet :( )
// @author      klandestino
// @date        2007-02-14
// @version     1.0
// @include http://ogame*.de/game/buildings.php*
// @exclude
// ==/UserScript==

(function() {
	var trs = document.getElementsByTagName('tr');
	for (var i = 0; i < trs.length; i++) {
		//alert(trs[i].innerHTML.indexOf("gebaeude/208.gif"));

		if(trs[i].innerHTML.indexOf("gebaeude/208.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/208.gif")<500) {
					trs[i].parentNode.removeChild(trs[i]);
		}
		if(trs[i].innerHTML.indexOf("gebaeude/204.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/204.gif")<500) {
					trs[i].parentNode.removeChild(trs[i]);
		}
	}	
	var trs2 = document.getElementsByTagName('tr');
	for (var i = 0; i < trs2.length; i++) {
		//alert(trs2[i].innerHTML.indexOf("gebaeude/208.gif"));

		if(trs2[i].innerHTML.indexOf("gebaeude/205.gif")>100 && trs2[i].innerHTML.indexOf("gebaeude/205.gif")<500) {
					trs2[i].parentNode.removeChild(trs2[i]);
		}
		if(trs2[i].innerHTML.indexOf("gebaeude/206.gif")>100 && trs2[i].innerHTML.indexOf("gebaeude/206.gif")<500) {
					trs2[i].parentNode.removeChild(trs2[i]);
		}
	}		
})();