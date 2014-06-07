// ==UserScript==
// @name Ogame Left Menu
// @description Removes Commander info from left menu
// @include http://ogame*.de/game/leftmenu.php*
// ==/UserScript==
(function() {
	var trs = document.getElementsByTagName('tr');
	for (var i = 0; i < trs.length; i++) {
		//alert(trs[i].innerHTML);
		if(trs[i].innerHTML.indexOf("Commander Info</font>") != -1){
		
			trs[i].parentNode.removeChild(trs[i]);
		}
	}	
})();
