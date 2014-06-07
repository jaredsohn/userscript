// OpenDNS Search Fixer
// version 0.1 BETA!
// 2007-02-03
// Copyright (c) 2007, Morgan May
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          OpenDNS Search Fixer
// @namespace     http://morganmay.net/
// @description   Fixes a problem with OpenDNS in which single-word searches in the Firefox location bar are redirected to the OpenDNS search engine
// @include       http://search.opendns.com/?url=*
// ==/UserScript==

(function() {
    window.location.href = window.location.href.replace(/^http:\/\/search\.opendns\.com\/\?url=/, 'http://www.google.com/search?ie=UTF-8&sourceid=navclient&gfns=1&q=');
})();