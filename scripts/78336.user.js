// Viviti Login Autofocus Email Field Script
// version 1.0
// 2010−06−4
// Copyright (c) 2010, Simon Snow
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
// This is a Greasemonkey user script.
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// To uninstall, go to Tools/Manage User Scripts,
// select "Viviti Login Autofocus", and click Uninstall.
// This script should also work just fine on Google Chrome v 4.0+
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          Viviti Login Autofocus
// @namespace     http://siguy.tv
// @description   Automatically Focus the Email field at the viviti login page
// @include	    https://viviti.com/session/create
// @match         https://viviti.com/session/create
// ==/UserScript==

document.forms[0].email.focus();