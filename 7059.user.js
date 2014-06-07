// title: Free Proxy
// version: 1.0
// created: 2006-01-11
// license: [url=GPL license]http://www.gnu.org/copyleft/gpl.html[/url]
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// --------------------------------------------------------------------
// ==UserScript==
// @name           Free Proxy
// @namespace      http://bobpaul.org/userScripts
// @description    Disables header and ads on Proxify.com without subscribing.
// @include        https://proxify.com/*
// @include        https://proxify.net/*
// @exclude
// ==/UserScript==


(function () {
	var divs = document.getElementsByTagName('div');
	for(i=0;i<divs.length-1;i++)
	{	
		document.body.removeChild(divs[i]);
	}

})();