// ==UserScript==
// @name           Sharebee Auto Pick Rapidshare.com
// @namespace      Auto Pick RS.com
// @include        http://*sharebee.com/*
// ==/UserScript==
var links = document.getElementsByTagName("a");
for (var i in links) {
	if(links[i].href.indexOf("rapidshare")>=0) {
		document.location=links[i].href;
		break;
	}
}