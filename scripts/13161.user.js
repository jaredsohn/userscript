// ==UserScript==
// @name          DA-MaFilterBypass
// @namespace     http://userstyles.org
// @description	  Quick Removal Of the DeviantArt Mature Content Filter (DO NOT INSTALL YET, WORK IN PROGRESS)
// @author        nickrak
// @homepage      
// @include       http://*.deviantart.com/*
// @include       https://*.deviantart.com/*
// ==/UserScript==

var maFilter = document.getElementById('filter-warning');
if (maFilter) {
	maFilter.parentNode.removeChild(maFilter);
}