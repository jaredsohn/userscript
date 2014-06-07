// ==UserScript==
// @name          Facebook Creeper Panel Blocker
// @namespace     http://userscripts.org/
// @description	  Stop the creepin!
// @include       http://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*facebook.com*
// ==/UserScript==

var CreepBox = document.getElementById('pagelet_ticker');
if (CreepBox) {
    CreepBox.parentNode.removeChild(CreepBox);
}