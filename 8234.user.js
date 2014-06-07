// Weight Watchers points for CalorieKing.com
// by John Forsythe - http://www.jforsythe.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// inspired by Weight Watchers points for Recipezaar
// 		http://userscripts.org/scripts/show/7570
//
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CalorieKing WW Points", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CalorieKing WW Points
// @namespace     http://www.jforsythe.com
// @description   Weight Watchers Points for CalorieKing
// @include       http://*.calorieking.com/foods/*
// ==/UserScript==


headObj = document.getElementsByTagName('head')[0];
scriptWW = document.createElement('script');
scriptWW.setAttribute("type", "text/javascript"); 
scriptWW.defer = true;
scriptWW.setAttribute("src", "http://www.jforsythe.com/jforsythe/includes/wwcking.js");
headObj.appendChild(scriptWW)

