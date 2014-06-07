// fasteignir.is remove flash ads
// Oct 2010
// Copyright (c) 2009, Tryggvi Hjörvar
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
// select "fasteignir_remove_flash", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          fasteignir_remove_flash
// @namespace     http://www.seidur.is
// @description   Removes heavy flash objects from fasteignir.visir.is 
// @include       http://fasteignir.visir.is/*
// ==/UserScript==


//Get the objects from the DOM
sideAd = document.getElementById('side_ad'); 
headAd = document.getElementById('head_ad');

//Remove the objects
sideAd.parentNode.removeChild(sideAd);
headAd.parentNode.removeChild(headAd);