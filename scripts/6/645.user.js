// JustListen!
// v0.1
// Copyright (c) 2005, Wayne Burkett 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// This is a Greasemonkey user script. 
// http://greasemonkey.mozdev.org/

// This script rewrites the "Listen" buttons on individual show pages, 
// but has no effect on some of NPR's other audio links.
// Example: http://www.npr.org/templates/story/story.php?storyId=4660787

// ==UserScript==
// @name          JustListen!
// @namespace     http://dionidium.com/projects/greasemonkey/
// @description   Make npr.com's "Listen" links point directly to a RealAudio stream
// @include       http://npr.org*
// @include       http://www.npr.org*
// ==/UserScript==

(function() {
    var getMedia, link;
    getMedia = document.evaluate( 
        "//a[contains(@href, 'javascript:getMedia')]", 
  	document, 
	null, 
	XPathResult.FIRST_ORDERED_NODE_TYPE, 
	null);
    if (!(link = getMedia.singleNodeValue)) { return; } 
    link.setAttribute('href', link.href.replace(/('RM,WM')|('WM,RM')/, "'RM'"));
})();

// 2005-05-21 - 0.1 - released
