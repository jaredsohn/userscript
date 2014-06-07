// boston college Library Proxy user script
// version 0.1
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
// select "boston college Library Proxy", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name			boston college Library Proxy
// @namespace		http://www.bc.edu/libraries/
// @description		Sends all web pages through boston college Library Proxy
// @include			*bc.edu*
// @exclude			*proxy.bc.edu*
// @exclude			*login.proxy.bc.edu/login*
// ==/UserScript==

document.location.href = "http://proxy.bc.edu/login?url=" + document.location.href;