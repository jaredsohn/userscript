// ==UserScript==
// @name          Feedburner Text Resizer
// @namespace     http://jasonthedce.com/greasemonkey/
// @description   Script to resize the text of feeds in the "My Feeds" section of Feedburner
// @include       https://www.feedburner.com/fb/a/myfeeds*
// @include       https://feedburner.com/fb/a/myfeeds*
// @include       http://www.feedburner.com/fb/a/myfeeds*
// @include       http://feedburner.com/fb/a/myfeeds*
// @include       https://www.feedburner.google.com/fb/a/myfeeds*
// @include       https://feedburner.google.com/fb/a/myfeeds*
// @include       http://www.feedburner.google.com/fb/a/myfeeds*
// @include       http://feedburner.google.com/fb/a/myfeeds*
// ==/UserScript==
//
// This script modifies the stylesheet used to render the "My Feeds" page for Feedburner.  Longer Feed
// names would often run over onto a 2nd line.  It annoyed me.  This is my first script.  Hope you enjoy!
//

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Modifies the font size of the feed names (default 18px) 
addGlobalStyle('.list td.title { font-size: 14px; }');

// Modifies the font size of the Subscribers and Site Visitors numbers (default 24px)
addGlobalStyle('.list td.stats a { font-size: 18px; }');

// End of Script