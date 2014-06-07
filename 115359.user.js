// ==UserScript==
// @name Jeux MMORPG Auto Click
// @namespace jeux-mmorpg
// @author Aversiste
// @date 12/10/2011
// @version 1.0
// @description Auto click on thumbs depending of the games
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.jeux-mmorpg.fr/hit-parade
// ==/UserScript==

var list = document.getElementsByTagName('tr');

for (var i = 1; i< list.length; ++i) {
	if (list[i].children[1].children[0].innerHTML == "Dreadcast") {
		var node = list[i].getElementsByClassName('pouceHaut');
		if (node[0])
			node[0].click();
	} else {
		var node = list[i].getElementsByClassName('pouceBas');
		if (node[0])
			node[0].click();
	}
}