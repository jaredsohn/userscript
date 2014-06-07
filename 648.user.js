// SimpleTVGuide
// v0.1
// Copyright (c) 2005, Wayne Burkett 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// This is a Greasemonkey user script. 
// http://greasemonkey.mozdev.org/

// ==UserScript==
// @name          SimpleTVGuide
// @namespace     http://dionidium.com/projects/greasemonkey/
// @description   Auto-display a full-size grid on tvguide.com's listings page
// @include       http://tvguide.com/listings/*
// @include       http://www.tvguide.com/listings/*
// ==/UserScript==

(function() {
    if (/TV Listings/.test(document.title)) {
        var iframe = document.getElementById("ifListingsGrid");
	if (!iframe) { return; }
	window.location.href = iframe.src;
    }
})();

// 2005-05-02 - 0.1 - released
