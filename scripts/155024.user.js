// ==UserScript==
// @name           Facebook Re-Design
// @namespace      http://konbirdy.de/
// @description    A new, modern design for your Facebook (December 2012) 
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @author         KonBirdy <me@konbirdy.de>
// ==/UserScript==

// from diveintogreasemonkey.com -- thanks
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// the magic
addGlobalStyle(

"body {
	background-image: url(http://ext.my-homework.net/outimg.php) !important;
	background-attachment: fixed !important;
	background-position: center center !important;
}
"

);
