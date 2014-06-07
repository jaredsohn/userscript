// ==UserScript==
// @name	          Free PBwiki
// @version	1.0
// @namespace     http://greasemonkey.org/download/
// @description	Remove PBwiki Premium Ad
// @include	http://*.pbwiki.com/*
// ==/UserScript==

var adBar = document.getElementById('wiki-premium');
if (adBar) {
    adBar.parentNode.removeChild(adBar);
}
