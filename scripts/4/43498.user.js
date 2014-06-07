// ==UserScript==
// @name        Lachschon Premium Slide Features
// @description Hinzuf�gen von #comments an Kommentarseitenlinks
// @include     http://*lachschon.de/slide/*
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var pageSelections = getElementsByClass("pageselection comments", document.getElementById("content"),'*');
for (var i=0; i< pageSelections.length; i++) {
		var links = pageSelections[i].getElementsByTagName('a');
		for (var j=0; j<links.length; j++)
			links[j].setAttribute("href", links[j].getAttribute("href") + "#comments");
}
