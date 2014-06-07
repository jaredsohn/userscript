// ==UserScript==
// @name OGame Ad Remover
// @description Removes ads from OGame.
// @include http://ogame*.de/game/*.php*
// @exclude http://ogame*.de/game/leftmenu.php*
// @exclude http://ogame*.de/game/reg*
// @exclude http://ogame*.de/game/index*
// ==/UserScript==
(function() {
	var iframes = document.getElementsByTagName('iframe');
	for (var i = 0; i < iframes.length; i++) {
		if (iframes[i] != document.body.lastChild) {
			iframes[i].parentNode.removeChild(iframes[i]);
		}
	}

	if (self.document.URL.indexOf("game/overview.php") != -1) {
		var tables = document.getElementsByTagName('table');
		for (var i = 0; i < tables.length; i++) {
			if (tables[i].innerHTML.indexOf("<b>scan moons by one click!</b></font>") != -1) {
				tables[i].style['display'] = 'none';
				break;
			}
		}
	}
})();