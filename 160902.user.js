// ==UserScript==
// @name        Block Target Cookie Popup
// @namespace   https://userscripts.org/users/5705
// @description Target pops up a windows that insists you enable cookies. This script insists that the popup go away.
// @include     http://target.com/*
// @include     https://target.com/*
// @include     http://*.target.com/*
// @include     https://*.target.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant		none
// @run-at		document-end
// @version     1
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function(){
	$( '#overlay-curtain,#support-message' ).hide();
});
