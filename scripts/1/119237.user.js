//--------------------------------------------------------------------
//
// This is a Greasemonkey user script.
// For Google Chrome & Firefox
// For Firefox, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Shoo MSL+Ads - Colourlovers
// @version       0.0.0
// @namespace     Banananananananananers for all!
// @description   Shoo away Martha Steward Living buttons + Ads
// @include       http://www.colourlovers.com/*

// ==/UserScript==


GM_addStyle(
'.msl-color-container, .msl-paint-bucket-container, .msl-info, .mb-20.ad {display:none !important;}  .mb-20.ad:first-child {height:1px!important}'
);
