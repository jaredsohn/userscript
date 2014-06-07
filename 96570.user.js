// ==UserScript==
// @name          Gab's google results cleaner
// @namespace     http://gabrielsdomain.org/
// @description   Removes Google's "/url?q=" redirect from search result links
// @include       http://www.google.*/search*
// @include       http://google.*/search*
// ==/UserScript==

var as, a, href, i2;
as = document.getElementsByTagName("a");
for(var i = 0; i < as.length; i++) {
	a = as[i];
	href = a.href
	if(href.indexOf("http://www.google.com.au/url?q=") == 0) {
		href = a.href.replace("http://www.google.com.au/url?q=", "");
		i2 = href.indexOf("&sa=U&ei=");
		if(i2 > 0) {
			href = href.substr(0, i2);
		}
		a.href = unescape(href);
	}
}
