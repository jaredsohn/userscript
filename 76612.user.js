// ==UserScript==
// @name           de-de
// @namespace      http://userscripts.org
// @description    changes to the german page
// @include        *www.facebook.com*
// ==/UserScript==

if (window.location.href.match("www.facebook.com")) {
	var loco = window.location.href;
	var set = loco;
	set = set.replace("www.facebook.com", "de-de.facebook.com");
	window.location.replace(set);
};