// ==UserScript==
// @name          Persianizer
// @description   Tries to convert all English digits and Arabic Kaf and Yeh letters into their Persian counterpart
// @author        Ebrahim Mohammadi < ebrahim at mohammadi dot ir >
// @namespace     http://ebrahim.ir/
// @include       http://*.ir/*
// @include       https://*.ir/*
// @license       GPL
// @version       0.1
// ==/UserScript==
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
// select "Persianizer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Based on:
// DumbQuotes
// version 0.4 BETA!
// 2005-05-02
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//

var replacements, regex, key, textnodes, node, s;

replacements = {
	"0": "\u06f0",
	"1": "\u06f1",
	"2": "\u06f2",
	"3": "\u06f3",
	"4": "\u06f4",
	"5": "\u06f5",
	"6": "\u06f6",
	"7": "\u06f7",
	"8": "\u06f8",
	"9": "\u06f9",
	"\u0643": "\u06a9",		// Kaf
	"\u064a": "\u06cc",		// Yeh
};

regex = {};
for (key in replacements)
{
	regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate( "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < textnodes.snapshotLength; i++)
{
	node = textnodes.snapshotItem(i);
	s = node.data;
	for (key in replacements)
	{
		s = s.replace(regex[key], replacements[key]);
	}
	node.data = s;
}
