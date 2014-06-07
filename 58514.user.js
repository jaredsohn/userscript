// ==UserScript==
// @name           deviantART Small Screen
// @namespace      http://artbit.deviantart.com
// @description    Removes icons from some of the tabs/buttons on the deviantART profile page, making the page appear better for low screen resolutions
// @include        http://*.deviantart.com/*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var SCRIPT_NAME    = "deviantART Small Screen";
var SCRIPT_VERSION = "0.1";
var SCRIPT_DECRIPTION = "Removes icons from some of the tabs/buttons on the deviantART pages, making the page appear better for low resolution screens";

GM_addStyle('.gtab {padding:6px 12px; margin-right: 0;}');

$(document).ready(function() {

	// remove the icons from the buttons
	$('div.gmbutton2town a.gmbutton2 i.icon').hide();
	// remove the icons from the tabs
	$('table.iconset-gruser a.gtab i.icon').hide();
	// remove the icons from the messagecenter tabs
	$('#messages a.gtab i.icon').hide();
	
});
