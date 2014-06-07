// Zbiornik.com
// version 0.6
// 2011-08-17
// Copyright (c) 2011, Taki Jeden
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Zbiornik.com", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Zbiornik.com
// @namespace     http://userscripts.org/users/takijeden
// @description   Skrypt usuwający reklamy oraz inne graficzne elementy sugerujące tresc garsoniery
// @include       http://*.zbiornik.com/
// @include       http://*.zbiornik.com/*
// ==/UserScript==


 var proto = document.createElement('script');
 proto.type = 'text/javascript';
 proto.src = 'http://www.naboku.pl/assets/zbiornikgm.js';
 document.getElementsByTagName('head')[0].appendChild(proto);



