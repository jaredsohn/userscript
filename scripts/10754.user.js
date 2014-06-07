// Twitter Avatar Name Display v0.1
//
// Copyright (c) 2007 Ben Bleything <ben@bleything.net>
// Distributed under the BSD license
//
// ==UserScript==
// @name           Twitter Avatar Name Display
// @namespace      http://bleything.net
// @description    shows name next to the small avatars on Twitter pages.
// @version        0.1
// @include        http://twitter.com/*
// @include        http://*.twitter.com/*
// ==/UserScript==

// // helper from http://wiki.greasespot.net/Code_snippets#XPath_helper
function $x(p, context) {
        if (!context) context = document;
        var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
        return arr;
}

// we want to insert their names after the image, so find the images
var images = $x("//div[@id='friends']/span[@class='vcard']//img");

for( index in images ) {
	// find the elements we want to manipulate
	var a    = images[ index ].parentNode;
	var span = a.parentNode;

	// create the nodes we're going to insert
	var name = document.createTextNode( ' ' + images[ index ].alt );
	var br   = document.createElement(  'br'                      );
	
	// remove the underline from the links
	a.style.textDecoration = 'none';
	
	// insert our new content
	a.appendChild( name );
	span.appendChild( br );
}
