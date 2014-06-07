// ==UserScript==
// @name           Fuck off "Ask your followers"
// @namespace      http://userscripts.org/users/33676
// @description    Elimina el odioso "Ask your followers", para no apretarlo por error, ni tentarse.
// @include        *.formspring.me/*
// ==/UserScript==

function getElementsByClassA(searchClass,node,tag) {
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
var a = getElementsByClassA('ask_followers_link');
for (b=0;b<a.length;b++){
a[b].style.display = 'none';
}