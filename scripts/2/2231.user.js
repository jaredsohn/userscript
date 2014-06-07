// Remove ads from "Analyse Board" window
// version 0.1 BETA!
// 2005-11-28
// Copyright (c) 2005, David Winterbottom
// David.Winterbottom@gmail.com
// http://www.maths.nottingham.ac.uk/personal/pmxdmw/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          RedHotPawn: Remove ads
// @namespace     
// @description   Remove those distracting ads from the "analyse board" windows
// @include       http://www.redhotpawn.com/gameanalysis/*
// ==/UserScript==

var adFrame = document.getElementsByTagName('iframe')[0];
if (adFrame) { adFrame.parentNode.removeChild(adFrame); }
