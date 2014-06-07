// ==UserScript==
// @name           Dreadcast Kill File
// @author         Aversiste
// @namespace      Dreadcast
// @date           18/02/2011
// @version        0.1
// @description    A kill file like script
// @license        WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include        http://wikast.net/*
// ==/UserScript==

var filter = new Array("Mahala");

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

//Change the '!' by a '=' to only see messages of people in your filter.
function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

(function () {
	var node = document.getElementsByClassName('post');
	for (var i = 0; i != node.length; ++i)
		if (include(filter, node[i].childNodes[1].childNodes[1].childNodes[1].innerHTML))
			node[i].style.display = "none";
})();