// Ogicom Panel Autofocus
// version 0.2
// 2011-05-06
// Copyright (c) 2011, Bartosz Piec
// Released under the MPL license
// http://www.mozilla.org/MPL/
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// If you want, you can configure the Included and Excluded pages in 
//  the GreaseMonkey configuration.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ogicom Panel Autofocus", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// Script focuses the login field on Ogicom Panel site (panel.ogicom.pl).
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Ogicom Panel Autofocus
// @namespace       http://www.dabarto.pl/projects/greasemonkey/ogicom_panel_autofocus
// @description     Focuses the login field on Ogicom Panel site
// @include         http://panel.ogicom.pl/
// @include         https://panel.ogicom.pl/
// ==/UserScript==

var inputs = document.getElementsByName('login');
if (inputs.length > 0) {
	inputs[0].focus();
}