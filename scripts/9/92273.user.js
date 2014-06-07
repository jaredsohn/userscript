// ==UserScript==
// @name           Reddit Navigation
// @namespace      http://*.reddit.com/*
// @include        http://www.reddit.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var i = 0;
var nav = '';

for (i=0; i<=360; i+=25) {
    nav += '<a href="http://www.reddit.com/?count='+i+'">' + i/25 + '</a>&nbsp;&nbsp';
}

$('<h2>' + nav + '</h2>').insertBefore('div.footer.rounded');

