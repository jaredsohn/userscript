// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "WajaSheet test", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          WajaSheet test
// @namespace     http://books.unedible.com/
// @description   changes wajas stylesheet - TEST ONLY
// @include       wajasdev.com*
// @include       wajas.com*
// ==/UserScript==

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://books.unedible.com/wajasheet.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);
