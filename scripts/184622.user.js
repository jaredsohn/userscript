// ==UserScript==
// @name		Bitcoinwisdom AdBar Remover
// @description	Deletes Advertisement Sidebar from Bitcoinwisdom.com and releases the space it used before
// @namespace	http://beging.it
// @copyright	Andre Beging
// @version		1.2
// @match		http://bitcoinwisdom.com/*
// @match		https://bitcoinwisdom.com/*
// @homepageURL http://userscripts.org/scripts/show/184622
// @downloadURL http://userscripts.org/scripts/source/184622.user.js
// @updateURL   http://userscripts.org/scripts/source/184622.user.js
// ==/UserScript==

var adSidebar = document.getElementById('leftbar_outer');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}