// ==UserScript==
// @name		HomepageCleaner
// @namespace	http://www.myyearbook.com/shrek99
// @description	Removes ads, earn lunch money stuff, and safety tips from the homepage
// @include		http://*myyearbook.com/*
// @version		2.1
// ==/UserScript==
//
// Code to clean up the homepage on myyearbook
GM_addStyle("#HALFeed, #feed, #HALPromotion, #HALCPA, #HALSafetyTips, #cpaPromo {display:none!important;}");
