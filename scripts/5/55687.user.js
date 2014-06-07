// ==UserScript==
// @name           Endlos-Threads-Remover
// @namespace      Schneckenhof
// @include        http://*.schneckenhof.de/Forum*
// ==/UserScript==

var links = document.getElementsByTagName("a");
var isExt = /.*(Forum\?_s=4&f=27).*/g; 

for(var i = 0; i<links.length; ) {
						 
	if ( isExt.test(links[i].href) ) {
		
		links[i].parentNode.parentNode.parentNode.removeChild(links[i].parentNode.parentNode);	
		--i;
	}
	else
	++i;
}