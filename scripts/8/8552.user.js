// Adds hostname to title 0.1
// Copyright (c) 2007 Miguel Said Vieira
//
// This work is licensed under a Creative Commons License
// See http://creativecommons.org/licenses/by-nc-sa/2.5/
//
// ==UserScript==
// @name           Adds hostname to title
// @namespace      http://impropriedades.wordpress.com
// @description    Adds hostname to title. Useful for KeePass auto-type feature.
// @include        *.amazon.com*
// @include        *.ebay.com*
// ==/UserScript==

(function() {
	document.title = document.title + ' (KeePass: ' + document.location.hostname + ')';
   
})();