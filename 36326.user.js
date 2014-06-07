// ==UserScript==
// @name           remove UrlHide
// @namespace      SantiagoCast
// @include        *
// ==/UserScript==

var enlaces = document.getElementsByTagName('a');

for(var i=0; i < enlaces.length; i++) {
	enlaces[i].href = enlaces[i].href.replace("http://anonymz.com/?","");
	enlaces[i].href = enlaces[i].href.replace("http://www.urlhide.info/?url=","");
	enlaces[i].href = enlaces[i].href.replace("http://links.wamba.com/noref.php?url=","");
}