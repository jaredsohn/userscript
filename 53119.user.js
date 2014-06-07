// ==UserScript==
// @name           URL Peek
// @namespace      Forest21
// @include        *
// ==/UserScript==

var links = document.getElementsByTagName("a");
for(var i=0; i<links.length; i++)
{
	if(links[i].title)
		links[i].title += " - "+links[i].href;
	else
		links[i].title = links[i].href;
}
