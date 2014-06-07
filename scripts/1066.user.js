// Backpack System Message Away!
// Version 2.0 (20050517)

// Copyright 2005 Marcus Campbell
// Released under the GNU General Public License:
// http://www.gnu.org/licenses/gpl.txt

// ==UserScript==
// @name          Backpack System Message Away!
// @namespace     http://www.tecknik.net/poke/
// @description   Fade out the black system message bar in Backpack and keep it hidden for a day.
// @include       http://*.backpackit.com/*
// ==/UserScript==

(function () {

// Element ID to fade
var id = 'system_notice';

// Time to wait before fading (milliseconds)
var timeToFade = 10000;

// Time to wait before displaying again (milliseconds)
var timeToExpire = 86400000;

// The other guff
var now = new Date();
if (!GM_getValue('desys', 0) || now.getTime() > Number(GM_getValue('desys', 0))) {
    setTimeout('new Effect.Fade("'+ id +'")', timeToFade);
    var expiry = now.getTime() + timeToExpire;
    GM_setValue('desys', expiry.toString());
} else {
    var ele = document.getElementById(id);
    if (ele)
        ele.parentNode.removeChild(ele);
}

})()

// Changelog
// ---------
// 2.0 (20050517)
//      Use GM_(get|set)Value instead of cookie
//      Remove element instead of hiding it
//      Use variables for times	
// 1.0 (20050516)