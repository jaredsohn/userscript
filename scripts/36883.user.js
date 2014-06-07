// ==UserScript==
// @name           BashCraft is Creepy
// @namespace      bunedoggle.com
// @description    FULL CREDIT TO ipown SCRIPT BY BUNEDOGGLE.  Edit: Brian Ashcraft is still a weirdo, but I doubt this script works at all anymore with the new (awful) Gawker redesign.  Stop going to Kotaku, like I did.
// @include        http://kotaku.com/*
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
	if(text.search(/Ashcraft/i) > 0){
		posts[i].innerHTML = "BLOCKED";
	}
}
