// ==UserScript==
// @name       Makes the eBay Topbar fixed
// @version		   1.0
// @namespace      http://userscripts.org/users/514417
// @author         MrAndroidster
// @description    Fixed eBay Topbar
// @include 		http://ebay.*/*
// @include 		http://*.ebay.*/*
// @run-at         document-end
// ==/UserScript==

GM_addStyle("#gh-top, #gh-gb {position: fixed!important; z-index: 9999999; box-shadow: 0px 0px 10px #888;}");