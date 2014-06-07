// ==UserScript==
// @name          SourceForge.net login return-to
// @namespace     http://www.salty-horse.org/greasemonkey/sourceforge-login/
// @description	  Adds a "return to" feature to the SourceForge.net login link
// @include       http://www.sourceforge.net/*
// @include       https://www.sourceforge.net/*
// @include       http://sourceforge.net/*
// @include       https://sourceforge.net/*
// ==/UserScript==

// By: Ori Avtalion <oavtal at bezeqint.net>
// Released under the GPL license.
// For updates see http://www.userscripts.org/

var loginAnchor = document.evaluate('/html/body/div/div/span/span/a', document, null,
		XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (loginAnchor != null && loginAnchor.href.match(/login\.php$/) && document.location.pathname != "/") {
	var path = document.location.pathname;
	if (path.charAt(path.length - 1) == '/')
		path = path.slice(0, -1);
	loginAnchor.href += "?return_to=" + encodeURIComponent(path +
		document.location.search + document.location.hash);
}
