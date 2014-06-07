// G+Break
// version 0.1
// 2011-07-01
// Released under the MIT License 
// http://opensource.org/licenses/mit-license.php
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
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "G+Break", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           G+Break
// @namespace      http://github.com/addamh
// @include https://www.google.com/*
// @include http://www.google.com/*
// @include https://*.google.com/*
// @include http://*.google.com/*
// ==/UserScript==

(function() {
var css = "#gbg {display:none !important; visibility:none !important;}";
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	heads[0].appendChild(node); 
}

})();