// Cereza String Injector
// version 0.1 BETA
// March 2012
// Copyright (c) 2012, Carlos A. Lozano
// Released under the BSD license
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Cereza String Injector
// @description String injector script to verify validation issues on Websites
// ==/UserScript==

var user_inputs = document.getElementByTagName('input');
var i;
var string_tst="test";

for(i=0; i<user_inputs;i++){
	user_inputs[i].value=string_tst;
}
