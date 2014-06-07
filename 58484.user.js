// ==UserScript==
// @name           Flickr logo
// @namespace      http://userscripts.org/scripts/source/58484
// @description    Replace the horrible Flickr/Yahoo! logo with the original Flickr logo.
// @include        http://www.flickr.com/
// ==/UserScript==

var el = document.getElementById('FlickrLogo');
el.src="http://www.foamcow.com/greasemonkey/flickryahoologo/flickr-logo.png";