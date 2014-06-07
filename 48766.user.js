// ==UserScript==
// @name           NoAddict
// @namespace      http://blog.arpitnext.com
// @description    Helps Users to fight against the addiction of websites like Twitter by showing a reminder to close the window
// @version        0.1
// @author         ArpitNext
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

if(confirm("Is this really what you want to be doing right now\? Kill the Twitter, Please\!"))
{
window.open('', '_self', '');
window.close();
}