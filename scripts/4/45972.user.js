// ==UserScript==
// @name          Freebase ad-blocker
// @namespace     http://spencerwaterbed.com/soft/greasebase.user.js
// @description   removes the 'merchant links' ads on freebase.com
// @include       http://www.freebase.com*
// ==/UserScript==

var adSidebar = document.getElementById('vendor-weblinks');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
