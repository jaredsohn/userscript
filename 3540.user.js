// ==UserScript==
// @name Ogame HR komander remove
// @description Removes Commander
// @include http://ogame*.de/game/overview.php*
// ==/UserScript==
(function() {
	var trs = document.getElementsByTagName('tr');
	for (var i = 0; i < trs.length; i++) {
		//alert(trs[i].innerHTML);
		if(trs[i].innerHTML.indexOf("OGame Komandanti znaju vise:</b></font>") != -1){
		
			trs[i].parentNode.removeChild(trs[i]);
		}
	}	
})();
