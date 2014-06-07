// ==UserScript==
// @name Ogame usuwanie komandora z menu
// @description Usuwa link do konta komandor z lewego menu
// @version        1.0
// @include http://ogame*.de/game/leftmenu.php*
// ==/UserScript==
(function() {
	var trs = document.getElementsByTagName('tr');
	for (var i = 0; i < trs.length; i++) {
		//alert(trs[i].innerHTML);
		if(trs[i].innerHTML.indexOf("Konto Komandor</font>") != -1){

			trs[i].parentNode.removeChild(trs[i]);
		}
	}
})();
