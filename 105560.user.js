// Facebook Chat Be-Gone
// Copyright (c) 2014, Michael Kaufman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name		Facebook Chat Be-Gone
// @namespace	http://twitter.com/mikeontv
// @description Makes Facebook Chat bar disappear for users who don't like chat or use a third-party service such as Adium or Messages for OSX and MSN Messegner or Pidgin for (Windows).
// @version		0.1.9
// @date		2014-01-4
// @creator		Michael Kaufman
// @include 	*facebook.com/*


// ==/UserScript==
// Updated January 4th 2014 Rewrote for current Facebook code. Removed ad sidebar and centered main are. Also removed the message badge in the top navigation.
// Updated July 9th 2011 as Facebook changed their chat display.
GM_addStyle("#pagelet_sidebar {display:none;visibility:hidden;height:0px;}\
	#fbMessagesJewel {display:none;visibility:hidden;height:0px;}\
	#rightCol {display:none;visibility:hidden;height:0px;}\
	.UIStandardFrame_SidebarAds {display:none;visibility:hidden;height:0px;}\
	#globalContainer {padding-right:0px!important;}\
	#pagelet_dock{display:none;visibility:hidden;width:0px;}/");