// ==UserScript==
// @name           GC Google Map Enhancements plus
// @description    this script enables "hide my founds" and "hide my caches" checkboxes
// @author         Sigi_cz
// @version        1.01
// @include        http://*.geocaching.com/map/*
// @require        http://userscripts.org/scripts/source/72486.user.js
// ==/UserScript==

// requires Geocaching Google Map Enhancements
// http://userscripts.org/scripts/show/72486

(function () {
if(document.body.innerHTML.match('chkHideUnfound')) {
	document.getElementById('chkHideFound').disabled=false;
	document.getElementById('chkHideOwned').disabled=false;
}
}())