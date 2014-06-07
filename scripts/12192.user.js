// version 1.0
// 2007-09-12
// Copyright (c) 2007, Martin Samuelsson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Iceweasel and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ub.oru.se simple login", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ub.oru.se simple login
// @namespace     http://www.ch.lugn.nu/greasemonkey/ub.oru.se
// @description   For some reason the library at <D6>rebro University refuses to let Iceweasel save the username and password. Defining them in this script instead simplifies logging in.
// @include       http://*oru.sub.su.se/*
// ==/UserScript==

username = "YOURUSERNAME";
password = "YOURPASSWORD";

window.addEventListener('load', function() { 

        allInputs = document.evaluate('//input[@name]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        thisInput = allInputs.snapshotItem(0);
        thisInput.value = username;
        thisInput = allInputs.snapshotItem(1);
        thisInput.value = password;
//
}, true);