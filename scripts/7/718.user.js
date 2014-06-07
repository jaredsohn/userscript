// Hide Backpack Page Warning
// - Based on Backpack System Message Away! by Marcus Campbell
// Version 0.1 (2005-05-28)

// Copyright 2005 Thomas Kirchner
// Released under the GNU General Public License:
// http://www.gnu.org/licenses/gpl.txt

// ==UserScript==
// @name          Hide Backpack Page Warning
// @namespace     http://halffull.org/backpack
// @description   Fade out Backpack page limit warnings - you know how many pages you have.
// @include       http*://*.backpackit.com/*
// ==/UserScript==

(function () {

// Element ID to fade
var id = 'PageLimit';

// Time to wait before fading (milliseconds)
var timeToFade = 5000;  // five seconds

// Time to wait before displaying again (milliseconds)
var timeToExpire = 86400000 * 7;  // one week

var now = new Date();
if (!GM_getValue('de_page_warn', 0) || now.getTime() > Number(GM_getValue('de_page_warn', 0))) {
    setTimeout('new Effect.Fade("'+ id +'")', timeToFade);
    var expiry = now.getTime() + timeToExpire;
    GM_setValue('de_page_warn', expiry.toString());
} else {
    var ele = document.getElementById(id);
    if (ele)
        ele.parentNode.removeChild(ele);
}

})()

// Changelog
// ---------
// 0.1 - Initial release.  (2005-05-28)
