// ==UserScript==
// @name           Urban dictionary ads remover
// @namespace      itayscripts
// @description    as title suggests
// @include        http://www.urbandictionary.com/*
// ==/UserScript==

getDivsByClassName = function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = document.getElementsByTagName('div');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
}; 

var divs = getDivsByClassName("zazzle_links");
for (var i=0; i<divs.length; i++) {
	divs[i].style.display="none";
}


