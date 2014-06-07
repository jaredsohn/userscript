// Unpassword
// version 0.1
// 2005-06-09
// Copyright (c) 2005, Jeremy Dunck
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
// select "Unpassword", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @namespace     http://dunck.us/code/greasemonkey
// @name          Unpassword
// @description   Changes password inputs to be type text instead.
// @include       http://library.utdallas.edu/*
// ==/UserScript==

var inputs = document.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++) { 
  if (inputs[i].getAttribute('type') == 'password') {
    inputs[i].setAttribute('type', 'text'); 
  } 
}

//
// ChangeLog
// 0.1 initial version.