// ==UserScript==
// @name		HomepageCleaner
// @namespace	http://www.meetme.com/muaddib
// @description	Removes ads, earn lunch money stuff, and safety tips from the homepage. Also removes the Spotlight post class with second AddStyle command.
// @include		http://www.meetme.com/*
// @grant       GM_addStyle
// @version		2.4
// ==/UserScript==
//

// Code to clean up the homepage on meetme
GM_addStyle("#FriendSuggestionsModule, #mainImage, .HALPromotionAd, #HALCPA, #cpaPromo, #TopAdPlacement {display:none!important;}"); // Cleans up the Ads where it should.
GM_addStyle(".feedSpotlightHighlight {display:none!important;}"); // Handles removing the Spotlight entry at top of chatter.
