// Hack a Day Recapitalizer v0.1
//
// Copyright (c) 2008 Ben Bleything <ben@bleything.net>
// Distributed under the BSD license
//
// ==UserScript==
// @name          Hack a Day Recapitalizer
// @namespace     http://bleything.net
// @description   Fixes the idiotic lower-casing that Hack a Day inflicts on its readers.
// @version       0.1
// @include       http://hackaday.com/*
// @include       http://www.hackaday.com/*
// ==/UserScript==

// // helper from http://wiki.greasespot.net/Code_snippets#XPath_helper
function $x(p, context) {
        if (!context) context = document;
        var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
        return arr;
}

var fixer_stylesheet = document.createElement( 'style' );
fixer_stylesheet.innerHTML = "* {text-transform:none}";

$x( "//style" )[0].parentNode.appendChild( fixer_stylesheet );
