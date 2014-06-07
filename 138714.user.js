// ==UserScript==
// @name           Gorillavid.in improved cinema mode
// @description    Improves the cinema mode on gorillavid.in
// @version 	   1.1
// @date           20-07-2012
// @author         Ricky Hewitt
// @namespace      http://rickyhewitt.com
// @include        http://gorillavid.in/*
// @include        http://daclips.in/*
// @include 	   http://movpod.in/*
// ==/UserScript==

// Version History
// Version 1.1: Added support for movpod.in
// Version 1.0.2: Added support for daclips.in
// Version 1.0.1: Metadata update/fix.

// Force cinema mode
var cinema_on = document.getElementById('cinema-on-but');
cinema_on.click();
// Darken
var cinema_div = document.getElementById('cinema-div');
cinema_div.style.opacity = 0.8;


// Hide cinema-off button
var cinema_off = document.getElementById('cinema-off');
cinema_off.style.zIndex = 999;

