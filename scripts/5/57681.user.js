// ==UserScript==

// @name           removeBiffyBackgroundImage
// @namespace      http://localhost
// @description    replaces the background image on the official Biffy Clyro forum with a plain black background
// @version 0.1
// @include http://www.biffyclyro.com/forum/*
// @author Brian Wilson
// @license There is no license. Use this wherever and whenever you want. An attribution would be nice though

// ==/UserScript==

if (!document.getElementById("outerWrap")) return;

var elem = document.getElementById("outerWrap");
elem.style.backgroundImage = "none";
elem.style.backgroundColor = "#000000";
