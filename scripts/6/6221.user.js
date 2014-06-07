// Remember Login for Calgary Public Library
// version 1.0
// 2006-11-05
// Copyright (c) 2006, Guy Davis
// Released under the LGPL license
// http://www.gnu.org/copyleft/lgpl.html
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
// select "Calgary Library Login", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Calgary Library Login
// @namespace     http://www.guydavis.ca/projects/oss/scripts/greasemonkey
// @description   Allows Firefox to remember your card number for you.
// @include       https://catalogue.calgarypubliclibrary.com/ipac20/ipac.jsp*menu=account*
// ==/UserScript==

// Get the "Libary Card Number" field (first form, 8th input)
var accountNumberField = document.forms[0].elements[8]
if (accountNumberField) {
  // Set the type to 'text' rather than 'password', so Firefox will remember it
  accountNumberField.type = "text"
}

