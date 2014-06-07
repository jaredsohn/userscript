// LinuxToday loader script
// version 0.2 
// 2008-08-26
// Copyright (c) 2008, Axel Bock
// Released under the GPL license
// 
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: 
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
// @name          LinuxToday Loader
// @namespace     http://www.the-me.de
// @description   Automatically loads the "Complete story" link on the Linux Today news pages
// @include       http://www.linuxtoday.com/*
// ==/UserScript==

// 0.2 - eliminated "break" command. just for fun. 

var i=0
while (i < document.links.length && document.links[i].text != "Complete Story") i++;
if (i != document.links.length) window.location.href = document.links[i]
