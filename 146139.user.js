// Hello World! example user script
// version 0.1 BETA!
// 2012-01-14
// Released under the GPL License
// http://www.gnu.org/copyleft/gpl.html
// 
// --------------------------------------------------------------------
//
// This is Greasemonkey user script.
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
// @name	test4
// @namespace	test4
// @description example script to alert "test4" on x-event
// @include http://x-event.designo.ch/init/?q=ge/node/36
// ==/UserScript==



window.helloworld = function() {
    alert('Hello world!');
}

window.setTimeout("helloworld()", 60);