// ==UserScript==
// @name           DotNetKicks.com: Forward to article
// @description    Forwards from the DotNetKicks.com page automatically to the article. The URL of the DotNetKicks.com-page is replaced, so you can navigate forwards or backwards easily.
// @namespace      http://nohomepageyet.de
// @include        http://*dotnetkicks.com/*
// @exclude        http://*dotnetkicks.com
// ==/UserScript==

//found on http://snippets.dzone.com/posts/show/3495
function getElementsByClass(searchClass,node,tag) {

	var classElements = new Array();
	if (node == null)
		node = document;
	if (tag == null)
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	var j = 0;
	for (i = 0; i < elsLen; i++) {
		if (pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var elements = getElementsByClass("extrnl", null, "a");

if(elements.length == 1)
{
	var link = elements[0];
	location.replace(link.href);
}