// This script adds a check for illegal formation before submitting orders
//
// version 0.1.0
// 2009-06-19
// Copyright (c) 2009, Mikkel Bundgaard
// Released under the Creative Commons Attribution 3.0 Unported license
// http://creativecommons.org/licenses/by/3.0/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Illegal formation", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Illegal formation
// @namespace      http://www.grid-iron.org/
// @description    This script adds a check for illegal formation before submitting orders
// @copyright      2009+, Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// @license        (CC) Attribution; http://creativecommons.org/licenses/by/3.0/
// @version        0.1.0
// @include        http://www.grid-iron.org/index.php?page=club&subpage=makeorders*
// @include        http://grid-iron.org/index.php?page=club&subpage=makeorders*
// @contributor    Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// ==/UserScript==

window.setTimeout( function() {
	var xpath = '//*[@id="match_id"]';

	var path = document.evaluate(xpath,
		     document,
		     null,
		     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				     null).snapshotItem(0);
	
	// Retrieve "submit orders" button
	var button = path.nextSibling;

	// Extend the onclick event of the button
	var action = button.getAttribute('onclick');
	button.setAttribute('onclick', 'if (off_legal() && def_legal() || confirm("Are you sure you want to save an illegal formation?"))' + action);

    }, 100);