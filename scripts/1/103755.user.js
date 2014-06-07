// ==UserScript==
// @name           AlloShowTV FR Version Remover
// @namespace      AlloShowTV
// @author         Aversiste
// @date           29/05/2011
// @version        0.1
// @description	   I'm seek when I see french version of a movie ...
// @license        WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include        http://alloshowtv.com/series/view_s.php?*
// @include        http://alloshowtv.com/series/details_s.php?*
// @include        http://www.alloshowtv.com/series/view_s.php?*
// @include        http://www.alloshowtv.com/series/details_s.php?*

// ==/UserScript==

(function() {
	var tab = document.getElementsByTagName('td')
	for (var i = 0; i < tab.length; ++i) {
		if (tab[i].className == "fr")
			tab[i].parentNode.style.display = "none"
	}
})();