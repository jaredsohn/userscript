// ==UserScript==

// @name           PostCuttinator

// @namespace      PostCuttinator

// @include        http://forum.travian.it/*

// ==/UserScript==

/* MODIFICABILE DALL'UTENTE */
var altezza_massima="150px"; //sostituire con, ad esempio, "350px";
/* ------------------------ */


function getElementsByClass( searchClass, domNode, tagNames) {
	if (domNode == null) domNode = document;
	if (tagNames == null) tagNames = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagNames);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}

a = getElementsByClass('postrow has_after_content');
for(i=0;i<a.length;i++){
a[i].style.maxHeight=altezza_massima;
a[i].style.overflow="auto";
}

a = getElementsByClass('after_content');
for(i=0;i<a.length;i++){
a[i].style.clear="none";
}

