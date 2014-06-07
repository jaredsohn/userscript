// ==UserScript==
// @name           No Smiley
// @author		   Aversiste
// @version		   0.1
// @license        WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include        http://misterfox.fr/*
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
	var a = document.getElementsByClassName('smiley');
	var p;
	
	for (var i = 0; i < a.length; ++i)
		{
			p = a[i].parentNode;
			p.removeChild(a[i]);
			p.appendChild(document.createTextNode(a[i].alt));
		}
})();