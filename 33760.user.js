//Adapted from the script, del.icio.us Prettifier
//
// ==UserScript==
// @author	  Urgo http://YouTube.com/Urgo6667/
// @name          YouTube OLD My Subscriptions - Turn Visited Links To Black
// @description   Changes visited link color on the old YouTube subscriptions page, http://youtube.com/subscription_center (or any site) to be black
// @include       http://*.youtube.com/subscription_center*
// @include       http://*.youtube.com/my_subscriptions*

// ==/UserScript==
//
// ==RevisionHistory==
// Version 0.2:
// Released: 2008-09-15.
// Shortened script w/ suggestion from JoeSimmons & fixed to work on all pages of subscriptions
//
// Version 0.1:
// Released: 2008-09-14.
// Initial release.
// ==/RevisionHistory==


(function () {
	GM_addStyle("body  a:visited {color:#000 !important;} ");
})();