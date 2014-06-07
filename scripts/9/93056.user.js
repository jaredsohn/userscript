// ==UserScript==
// @name           Remove FetLife Kinky Santa Red Bar
// @description    Removes the red Kinky Santa promo bar at the top of all Fetlife pages.
// @include        http://fetlife.com/*
// ==/UserScript==

var santaBar = document.getElementById('soksl_top_bar');
if (santaBar) {
    santaBar.parentNode.removeChild(santaBar);
}