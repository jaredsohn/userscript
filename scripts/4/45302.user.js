// ==UserScript==
// @name           Skip Linkbucks
// @description    Skip Linkbucks automatically
// @version	v0.1/03.27.09
// @include        http://*.linkbucks.com/
// ==/UserScript==

if(location.hostname.match(/\.linkbucks\.com$/) ) {
	var wrapper = document.getElementById("lb_wrap");
	var skipLink = wrapper.getElementsByTagName("a")[1];
	location.href = skipLink.href;
}