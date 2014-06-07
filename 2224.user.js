// Hotmail Iframe Hider
// 2008-10-12
// Copyright (c) 2005, Roland Mai
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hotmail Iframe Hider
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Hides iframes in all hotmail pages
// @include       http://*.mail.live.com/*
// ==/UserScript==

var iframes = document.getElementsByTagName('iframe');
for(var i = 0; i < iframes.length; i++)
    iframes[i].style.display = 'none';

var ads = document.getElementsByClassName('dSideAds');
for(var i = 0; i < ads.length; i++)
    ads[i].style.display = 'none';

document.getElementById('RadAd_Banner').setAttribute("style", "display:none")
document.getElementById('RadAd_TodayPage_Banner').setAttribute("style", "display:none")

document.getElementById('dapIfM0').setAttribute("style", "display:none")