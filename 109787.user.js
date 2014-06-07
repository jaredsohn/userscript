// Hello World! example user script

// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
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
// @name          Metbb
// @description   Metbb
// @include       http://metallicabb.org/*
// ==/UserScript==


function doshit(){

var blockuser = document.getElementByClass('post_ignore');
if (blockuser) {
    blockuser.removeParent(div.blockuser);
}
}

doshit();