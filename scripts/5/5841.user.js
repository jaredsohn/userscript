// Studi2Facebook
// version 0.1 BETA!
// 2006-10-01
// Copyright (c) 2005, www.derbumi.com
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to 'Install User Script'.
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select 'Studi2Facebook', and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Studi2Facebook
// @namespace     http://derbumi.com/studi2facebook/
// @description   changes the color of studivz to the color of facebooke
// @include       http://studivz.net/*
// @include       http://*.studivz.net/*
// ==/UserScript==

(function() {
var new_style=document.createElement("link");new_style.setAttribute("rel","stylesheet");new_style.setAttribute("type","text/css");new_style.setAttribute("media","all");new_style.setAttribute("href","http://www.derbumi.com/studi2facebook/studi2facebook.css");var head = document.getElementsByTagName('head')[0];head.appendChild(new_style);

var new_favicon=document.createElement("link");
new_favicon.setAttribute("rel","shortcut icon");
new_favicon.setAttribute("href","http://static.facebook.com/favicon.ico");

var head = document.getElementsByTagName('head')[0];
head.appendChild(new_style);
head.appendChild(new_favicon);

})();