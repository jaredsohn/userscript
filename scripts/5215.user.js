
// Fill in username and password on 99mac.se user script
// version 0.1 BETA!
// 2006-08-18
// Copyright (c) 2006, Arvid Andersson
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
// select "99maclogin", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          99maclogin
// @namespace     http://userscripts.org/scripts/show/5215
// @description   Fill in username and password on 99mac.se
// @include       http://www.99mac.se/*
// ==/UserScript==

// To use this script, enter your user name and password at the last
// few lines, where it says "username.value..." and
// "password.value..."

// Note 1: Your user name and password will be stored in plain text
// on your computer. Anyone using this computer will be able to
// read them!

// Note 2: International characters has to be escaped. Replace
// them with the codes here:
// Capital A with ring: \u00C5
// Lower case a with ring: \u00E5
// Capital A with dots: \u00C4
// Lower case a with dots: \u00E4
// Capital O with dots: \u00D6
// Lower case o with dots: \u00F6

(function(){

  var username = document.getElementById("navbar_username");
  var password = document.getElementsByName("vb_login_password")[0];

  username.value = "";
  password.value = "";

})();

