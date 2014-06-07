// Neopets Halloween '07 StyleSwitcher
// version 0.3 BETA!
// 2007-11-1
// Copyright (c) 2007, Brad Huffman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Neopets Halloween '07 StyleSwitcher", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Neopets Halloween '07 StyleSwitcher
// @namespace     
// @description   Replaces your Neopets style with the Halloween '07 Style
// @include       http://*neopets.*
// 
// ==/UserScript==

function switch_style(){
   //Get all the link elements
   links = document.getElementsByTagName("link");
   
   //user selected style should be second
   links[1].href ="http://images.neopets.com/css/themes/003_hws_9bde9.css?v=1";
}

switch_style();