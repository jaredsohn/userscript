// ==UserScript==
// @name OGame.com.hr cistac reklama
// @description Mice reklame iz hrvatskog OGame-a.
// @include http://ogame*.de/game/*.php*
// @exclude http://ogame*.de/game/leftmenu.php*
// @exclude http://ogame*.de/game/reg*
// @exclude http://ogame*.de/game/index*
// ==/UserScript==
// By juraj <juraj@crimson-imperium.org>
// http://www.crimson-imperium.org

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
			if (tables[i].innerHTML.indexOf("Postani OGame Komandant sada!") != -1) {
				tables[i].style['display'] = 'none';
				break;
			}
		}
	}
	
})();