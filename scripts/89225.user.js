// ==UserScript==
// @name           Wikast Signature Remover
// @namespace	   Dreadcast
// @author         Aversiste
// @date           30/10/2010
// @version        0.1
// @license        WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include        http://wikast.net/*
// @include        http://www.wikast.net/*
// ==/UserScript==

document.getElementsByClassName =
function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');

	for (var i = 0; i < elem.length; i++)
		if (myclass.test(elem[i].className))
			retnode.push(elem[i]);
	return retnode;
};

(function () {
	var node = document.getElementsByClassName('couleur1');

	for (var i = 0; i < node.length; ++i)
		node[i].style.display = "none";
})();