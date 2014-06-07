
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
// @name          Sherdog advertising page remover
// @namespace     http://www.sherdog.com
// @description   Removes the advertising page that sometimes shows up on sherdog.com
// @include       http://www.sherdog.com/home/advertising.asp*
// ==/

var newUrl = window.location.href.substr(window.location.href.indexOf('=')+1);
newUrl = newUrl.replace(/~/,'?');
newUrl = 'http://' + newUrl;
window.location.href = newUrl;