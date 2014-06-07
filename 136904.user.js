// ==UserScript==
// @name        reddit-auto-click-link
// @namespace   ziffusion.com
// @include     http://www.reddit.com/r/*/comments/*
// @version     1
// ==/UserScript==

// body

var link = unsafeWindow.$(".thumbnail");

if (link && link[0] && link[0].href && link[0].href != document.URL)
{
    window.open(link[0].href);
}
