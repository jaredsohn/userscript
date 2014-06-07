// DaniWeb ileaderboard remover
// version 0.3 BETA!
// 2007-06-26
// Copyright (c) 2007, Tobi Lehman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
// its use is limited, it removes an iframe with ads at the top of
// DaniWeb.com 
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DaniWeb ileaderboard remover
// @namespace     http://www.daniweb.com/
// @description   example script removes an iframe with ads at the top or the page
// @include       http://www.daniweb.com/*
// ==/UserScript==

document.getElementById("ileaderboard").style.display = "none";
document.getElementById("rectangle").style.display = "none";
document.getElementById("skyscraper").style.display = "none";
