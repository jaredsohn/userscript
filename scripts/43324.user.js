// ==UserScript==
// @name           ImageVenue Redirect
// @namespace      freakz
// @description    Redirect ImageVenue to just the image!
// @include        http://img*.imagevenue.com/*
// @sourcecode     http://userscripts.org/scripts/show/43324
// @date           28 May 2009
// @version        0.5
// ==/UserScript==

//does the redirecting
if (document.getElementById('divEnabled')) {
	location.replace(document.getElementById('divEnabled').getElementsByTagName('a')[0].href);
} else {
	//If false show the main image whole
	location.replace(document.getElementById("thepic").src);
}