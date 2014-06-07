// ==UserScript==
// @name        DDG Zero Click Click Stealer Fix
// @namespace   http://twitter.com/GDorn
// @description Moves the Zero Click box so that it doesn't steal clicks if it loads slow.
// @include     https://duckduckgo.com/*q=*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// @grant       none
// @version     2
// ==/UserScript==

$('#zero_click_wrapper').prependTo($('#side'));
