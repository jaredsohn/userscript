// ==UserScript==

// @name           Digg Re-Direct

// @namespace      http://manalang.com/greasemonkey

// @description    Auto redirect to a Digg's source page
// @include        http://digg.com/*


// ==/UserScript==
var t = document.getElementById('title');
window.location = t.getElementsByTagName('a')[0].href;