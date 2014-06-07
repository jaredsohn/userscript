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
// select "TribalWars NoAds", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           TribalWars NoAds
// @version        0.1a
// @namespace      blaky
// @description    NoAds for TribalWars!
// @include        http://ro*.triburile.ro/*
// @include        http://en*.tribalwars.net/*
// @include        http://en*.ds.ignames.net/*
// @include        http://nl*.tribalwars.nl/*
// @include        http://cs*.divokekmeny.cz/*
// @include        http://sv*.tribalwars.se/*
// @include        http://s*.tribalwars.es/*
// @include        http://s*.tribalwars.fr/*
// @include        http://s*.tribalwars.it/*
// @include        http://pl*.plemiona.pl/*
// @include	       http://*.ds.ignames.net/*
// @copyright      Copyright (c) 2007 - 2008, BlAkY
// @maintainer     BlAkY
// ==/UserScript==


clear_ads();


function clear_ads(name){
	var frameset = document.getElementsByTagName('frameset');
	frameset[0].cols = "*,0%"; 
}