// ==UserScript==
// @name Remove Colonizadora
// @description OGame.br
// @include http://ogame*.de/game/buildings.php*
// ==/UserScript==
(function() {
	var trs = document.getElementsByTagName('tr');
	for (var i = 0; i < trs.length; i++) {
		//alert(trs[i].innerHTML.indexOf("gebaeude/208.gif"));
		if(trs[i].innerHTML.indexOf("gebaeude/208.gif")>100 && trs[i].innerHTML.indexOf("gebaeude/208.gif")<500) {
		
			trs[i].parentNode.removeChild(trs[i]);
		}
	}	
})();


