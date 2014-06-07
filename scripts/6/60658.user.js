// ==UserScript==
// @name           web.de smileykiller
// @namespace      http://greasemonkey.sevtec.de/
// @include        https://freemail*.web.de/*
// ==/UserScript==

// div .smileyPanel

document.getElementsByClassName = function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
}; 

elems = document.getElementsByClassName('smileyPanel');
elems[0].style.display = "none";
elems[0].style.visibility = "hidden";