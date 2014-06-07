/*
Geocaching Page Resizer - v1.0 2005-06-03
ÃÂ© 2005, Prime Suspect Software

Greasemonkey user script: see http://greasemonkey.mozdev.org

With the latest make-over of the geocaching.com GUI, users were
given an easy way to add background images to their cache pages,
but those background images were now mostly obscured by the new,
larger format cache pages. This script resizes cache pages that
use background images back to the old dimensions, allowing more
of the background image to be displayed. If no background image
has been specified, or if the cache owner is using a style code
(rather than a <body> html tag), the page will not be re-sized.

*/

// ==UserScript==

// @name		Geocache Page Resizer
// @description		Restores narrower display, to see the background image. Only resizes if a background image is specified.
// @namespace       	http://home.earthlink.net/~prime.suspect/gms/
// @include         	http://www.geocaching.com/seek/cache_details.aspx*

// ==/UserScript==

(function() {
	if (window._content.document.body.background != "") {
		var tables = window._content.document.getElementsByTagName("table");
		tables[0].style["width"] = "77%";
    	}
})();