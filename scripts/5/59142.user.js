// ==UserScript==
// @name           BBC low-graphics version pages point to correct high-graphics page
// @namespace      http://iss.oy.ne.ro/
// @description    The "Graphics Version" links on text-only BBC pages only point to the high-graphics home page (and vice versa).   This script makes them point to the high-graphics counterpart of the page currently being displayed.
// @include        http://news.bbc.co.uk/*
// ==/UserScript==

// Is this a low-graphics page?
if (document.location.href.match(/\/low\//)) {
    // Get the "Graphics Version" link
    var GraphicsVersionLink = document.evaluate('//a[text()="Graphics Version"]',document,null,XPathResult.ANY_TYPE,null).iterateNext();

    // Convert the current page's URL to a "high-graphics" URL
    var HighGraphicsUrl = document.location.href.replace(/\/low\//,"/hi/");

    // Replace the link pointed to by the "Graphics Version" link
    GraphicsVersionLink.href = HighGraphicsUrl;
} else { // High-graphics page
    // Get the "Low graphics" link
    var LowGraphicsLink = document.evaluate('//a[text()="Low graphics"]',document,null,XPathResult.ANY_TYPE,null).iterateNext();

    // Convert the current page's URL to a "low-graphics" URL
    var LowGraphicsUrl = document.location.href.replace(/\/hi\//,"/low/");

    // Replace the link pointed to by the "Low graphics" link
    LowGraphicsLink.href = LowGraphicsUrl;
}



// ??? 

// Profit!