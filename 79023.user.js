// What The Hex cheater
// version 0.1
// 2010-06-12
// Copyright (c) 2006, Roy M. Silvernail
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
// select "WhatTheHexCheat", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          WhatTheHexCheat
// @namespace     http://www.rant-central.com/greasemonkey/
// @description   Cheat at the 'guess the color' game
// @include       http://*yizzle.com/whatthehex/*
// @exclude       
// ==/UserScript==

var myTarget = document.getElementById('target');
var myCheat = document.getElementById(myTarget.innerHTML);
myCheat.style.border = '2px solid #FFF';
