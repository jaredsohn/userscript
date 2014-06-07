// ==UserScript==
// @name           Skip hyperlinkcash.com
// @namespace      TwK
// @version  	   v1
// @description    Skip hyperlinkcash.com
// @include        http://*hyperlinkcash.com/link.php?r=*
// ==/UserScript==

if(location.hostname.match(/\.hyperlinkcash\.com$/) ) {
	var link = document.getElementsByTagName("a")[0];
	location.href = link.href;
}