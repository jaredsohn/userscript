// ==UserScript==
// @name           Make links of the TV things.
// @namespace      http://a.net/Ben
// @include        http://torontoist.com/*/televisualist*
// ==/UserScript==

var els=document.getElementById("more").getElementsByTagName("em");
var L=els.length;

for (var i=0; i<L ; i++) {
	els[i].innerHTML='<a href="http://en.wikipedia.org/wiki/'+els[i].innerHTML.replace(/ /, '_')+'">'+els[i].innerHTML+'</a>';
}