// Text2numb
// version 2 
// 2009-08-31
// File Text2numb.user.js current version 002 August 31 2009 
// --------------------------------------------------------------------
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Text2numb
// @namespace     http://voltaiccodex.wordpress.com
// @description   converts words to numbers on craigslist ads.
// @include       http://*.craigslist.*/*
// ==/UserScript==
//
// --------------------------------------------------------------------
// Version 0.1a - First release

var replacements, regex, key, textnodes, node, s;

replacements = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    "zero": "0",
    "ten": "10",
    "eleven": "11",
    "twelve": "12",
    "thirteen": "13"};
regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'gi');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    for (key in replacements) {
	s = s.replace(regex[key], replacements[key]);
    }
    node.data = s;
}

//
// 081107.001 First working copy
// 083109.002 case insensitive 
