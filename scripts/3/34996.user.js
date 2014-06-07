// FixHiram
// version 1.0
// 2008-10-02
// Copyright (c) 2008, Stuart Tannehill
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a small script to fix the annoying gap that appears, in FF, on
// home.hiram.edu and that they inexplicably never fix.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select this script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FixHiram
// @namespace     tag:abc@gmail.com,2008-10-02:Hiram
// @description   fix the @#!$ing annoying gap on home.hiram.edu
// @include       http://home.hiram.edu/*
// ==/UserScript==


var theCell, thisCell;

theCell = document.evaluate(
	"//td[@height='600']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for(var i = 0; i < theCell.snapshotLength; i++){
	thisCell = theCell.snapshotItem(i);
	thisCell.setAttribute('height','auto');
}