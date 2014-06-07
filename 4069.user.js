// ==UserScript==
// @name OGEJMORG
// @description OGAME ORG
// @include http://ogame*.de/game/overview.php*
// ==/UserScript==
(function() {
	var trs = document.getElementsByTagName('tr');
	for (var i = 0; i < trs.length; i++) {
		//alert(trs[i].innerHTML);
		if(trs[i].innerHTML.indexOf("Become OGame Commander now!</b></font>") != -1){
		
			trs[i].parentNode.removeChild(trs[i]);
		}
	}	
})();