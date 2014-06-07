// ==UserScript==
// @name           Kotaku custom blocker
// @namespace      bunedoggle.com
// @description    Eliminates posts you don't like from Kotaku. A copy-paste of bunedoggle.com's BashCraft is Creepy script that's a little easier to customize to block other things. Defaults to blocking posts by tim rogers and posts about Second Life and furries.
// @include        http://kotaku.com/*
// ==/UserScript==

function getElementsByClass( searchClass, domNode, tagName) 
    {
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) 
        {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
    }


var posts;
var text = "";

posts = getElementsByClass('post');

for (var i = 0; i < posts.length; i++) 
{
    text = posts[i].innerHTML;
    if
    (
        (text.search(/tim rogers/i) > 0) || 
        (text.search(/furries/i) > 0) || 
        (text.search(/Second Life/i) > 0) ||
        (text.search(/BLOCK POSTS THAT HAVE WHATEVER GOES BETWEEN THESE SLASHES/i) > 0)
    )
    {
        posts[i].innerHTML = "BLOCKED";
    }
}