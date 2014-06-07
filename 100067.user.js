// Free NYT 
// version 0.1
// 2011-03-28
// Copyright (c) 2011, Dakota Ryan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Free NYT", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Free NYT
// @namespace     http://blog.dakotaryan.com/
// @description   Circumvents the NYT Paywall in three lines of code
// @include       http://*.nytimes.com/*
// @include		https://*.nytimes.com/*
// ==/UserScript==

document.getElementById('overlay').remove();
document.getElementById('gatewayCreative').remove();
document.body.style.overflowY = 'scroll';
