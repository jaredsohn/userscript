// ==UserScript==
// @name           Jaycar Javascript Popup Fixer
// @namespace      http://kirriwa.net/john/userscripts
// @description    Fixes Jaycar's javascript: pseudo-links that popup windows for images
// @include        http://jaycar.com.au/*
// @include        http://www.jaycar.com.au/*
// ==/UserScript==

// Jaycar's image links use a javascript function, MM_openBrWindow, to show the image
// in a new window

const url_regex = /MM_openBrWindow\('([^']+)'/;

for (var i = 0,                                         // index
        anchors = document.getElementsByTagName("a"),   // all anchors in page
        num_anchors = anchors.length,                   // number of anchors
        anchor = null;                                  // current anchor
     i < num_anchors;
     i++)
{
    anchor = anchors[i];
    if (anchor.getAttribute("onclick") == null
        && anchor.href.indexOf("javascript:MM_openBrWindow") == 0)
    {
        // found a popup
		var match = anchor.href.match(url_regex);
        // do nothing if a link isn't found
		if (!match)
            continue;
        // replace the link with the first quoted parameter to the function
        anchor.href = match[1];
    }
}
