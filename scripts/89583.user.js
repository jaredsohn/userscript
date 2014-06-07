// ==UserScript==
// @name           Joel Johnson is a Douchbag
// @namespace      bunedoggle.com
// @description    Who doesn't hate Joel Johnson on Gizmodo?  Use this script to block his posts.
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
	if(text.search(/Johnson/i) > 0){
		posts[i].innerHTML = "BLOCKED";
	}
}
