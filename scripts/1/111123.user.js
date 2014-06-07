
// Google Login Remove Example
// version 0.1 beta
// 2011-08-23
// Copyright (c) 2011, Armando Tresova
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Google Login Remove Example", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Login Remove Example
// @namespace     http://www.armandotresova.com/lab/greesemonkey/google_account/google_login_remove_example.user.js
// @description   Removes the "ex: pat@example.com" from gmails login form.
// @include       https://www.google.com/*
// ==/UserScript==


if(document.getElementById('gaia_table'))
{
   document.body.innerHTML = document.body.innerHTML.replace('ex: pat@example.com', '');
}