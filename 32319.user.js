// ==UserScript==
// @name           ipown
// @namespace      bunedoggle.com
// @description    Eliminate all iphone related articles from gizmodo
// @include        http://gizmodo.com/*
// ==/UserScript==

function getElementsByClass( searchClass, domNode, tagName) {
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}


var posts;
var text = "";

posts = getElementsByClass('post');

for (var i = 0; i < posts.length; i++) {
	text = posts[i].innerHTML;
	if(text.search(/iphone/i) > 0 || text.search(/ipod/i) > 0){
		posts[i].innerHTML = "BLOCKED";
	}
}
