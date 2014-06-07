// Digg Ad Remover
// Version 1.0
// 2008-12-09
// Copyright (c) 2008, IARP
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
// @name          Digg Ad Remover/Hider
// @namespace     http://www.iarp.ca/node/2
// @description   Hides/removes ads found on digg
// @include       http://*.digg.com/*
// @include       http://digg.com/*
// ==/UserScript==

var jframes = document.getElementsByTagName('iframe');
for(var i = 0; i < jframes.length; i++)
    jframes[i].style.display = 'none';

document.getElementById('block_ad_msft').setAttribute("style", "display:none")