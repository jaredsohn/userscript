
// Mobile.de Adress Shortener
// version 0.2 BETA!
// 2009-01-01
// Copyright (c) 2009, Robert Niestroj rniestroj (got my mail on so put here an at sign) go2.pl 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Mobile.de Adress Shortener", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Mobile.de Adress Shortener
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Shortens adresses of searched cars on mobile.de for easier sharing with other people
// @include       http://suchen.mobile.de/*
// @exclude       http://www.mobile.de/*
// @exclude       http://mobile.de/*
// ==/UserScript==

var adres = window.location.href;
var poz = adres.indexOf('showDetails.html?id=') + 20;
var poz2 = adres.indexOf('&__lp=');
var carid = adres.substring(poz,poz2);
carid = 'http://suchen.mobile.de/fahrzeuge/details.html?id=' + carid;
if(adres.indexOf('showDetails.html?id=') > 10) 
  window.location.replace(carid);