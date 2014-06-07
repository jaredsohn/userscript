// ==UserScript==
// @name          Remove Ad from OkCupid
// @namespace     http://www.okcupid.com
// @description   Find and remove the ad. Relies on DOM positioning, so could break easily.
// @include       http://www.okcupid.com/*
// ==/UserScript==

window.onload = function() {
	page = $('page');
	page.removeChild(page.childElements()[7]);
};