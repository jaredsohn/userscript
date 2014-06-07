// ==UserScript==
// @name           Whirlpool Forums - justified post text
// @namespace      blurg!
// @description    Whirlpool Forums - justified post text
// @include        http://forums.whirlpool.net.au/forum-replies.cfm?t=*
// ==/UserScript==

var style = document.createElement('style');
style.textContent = '.bodytext{text-align:justify !important;}';
document.querySelector('head').appendChild(style);