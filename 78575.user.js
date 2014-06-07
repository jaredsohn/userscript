// ==UserScript==
// @name           OutIframe
// @namespace      http://blog.e-riverstyle.com/
// @version        1.0
// @description    This Script is to unvisible iframe tag for using adv.
// @include        *
// @exclude        *
// ==/UserScript==

var iframe = document.getElementsByTagName("iframe");

for(var i=0;i<iframe.length;i++){
	iframe[i].style.display = "none";
}