// UK Postcode Map Lookup
// copy and paste from Linifier with a UK Postcode regex and links to multimap
//
//
//
// Linkifier user script
// version 1.0
// 2005-06-16
// Copyright (c) 2005, Reify
//
// --------------------------------------------------------------------
//
// This user script turns text URLs and email addresses into
// clickable links.
//
// To install for Internet Explorer, you need Turnabout:
// http://www.reifysoft.com/turnabout.php
// See instructions for using Turnabout here:
// http://www.reifysoft.com/turnabout.php?p=u
//
// To install for Firefox, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// The portion of the URI regular expression for http URIs is borrowed
// from the Linkify Plus user script.
// "Originally written by Anthony Lieuallen of http://www.arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact."
//
// Regular expression for email addresses is original.
//
// Text node splitter / element inserter taken from my own Search Term Highlighter.
//
// Test pages:
//  - http://www.hixie.ch/advocacy/xhtml
//  - http://www.gbiv.com/protocols/uri/rfc/rfc3986.html#examples
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          UK Postcode Lookup Maps 
// @namespace     http://userscripts.org/UKPostcodeLookupMaps
// @description   Add map links for UK Postcodes
// @include       *
// ==/UserScript==


var nodesWithUris = new Array();

// from http://www.webassist.com/Products/Help/33/wa_fv_60.htm
var uriRe = /\b([a-zA-Z]{1,2}[0-9][0-9A-Za-z]{0,1} {0,1}[0-9][A-Za-z]{2})\b/g;

// put the maps in reverse order in the list
var maps = [
["Google Map", "http://local.google.co.uk/favicon.ico", "http://maps.google.co.uk/maps?&iwloc=A&hl=en&q="],
["Multimap", "http://www.multimap.co.uk/favicon.ico", "http://www.multimap.com/map/places.cgi?client=public&lang=&advanced=&quicksearch="]
];

function main()
{
	makeLinks(document.documentElement);
}

function makeLinks(baseNode)
{
	getNodesWithUris(baseNode);

	for (var i in nodesWithUris)
	{
		var nodes = new Array(nodesWithUris[i]);	// We're going to add more nodes as we find/make them
		while (nodes.length > 0)
		{
			var node = nodes.shift();
			var uriMatches = node.nodeValue.match(uriRe);	// array of matches
			if (uriMatches == null) continue;
			var firstMatch = uriMatches[0].toLowerCase();
			var pos = node.nodeValue.toLowerCase().indexOf(firstMatch);

			if (pos == -1) continue;	// shouldn't happen, but you should always have safe regex
			else if (pos == 0)	// if starts with URI
			{
				if (node.nodeValue.length > firstMatch.length)
				{
					node.splitText(firstMatch.length);
					nodes.push(node.nextSibling);
				}

				var postcode = node.nodeValue.replace(/\.*$/, "");
				
				for (var i = 0; i < maps.length; i++)
				{
					var linky = document.createElement("a");
					linky.className = "reify-linkifier";
					linky.target = maps[i][0] + " " + postcode;
					linky.href = maps[i][2] + postcode;

					//node.parentNode.insertBefore(linky, node);
					//linky.appendChild(node);
					// OR
					var img = document.createElement("img");
					img.height = 16;
					img.width = 16;
					img.src = maps[i][1];
					img.title = maps[i][0] + " search for " + postcode;
					img.border = 1;
					linky.appendChild(img);
					node.parentNode.insertBefore(linky, node.nextSibling);
					node.parentNode.insertBefore(document.createTextNode(" "), node.nextSibling);
				}
			}
			else	// if URI is in the text, but not at the beginning
			{
				node.splitText(pos);
				nodes.unshift(node.nextSibling);
			}
		}
	}
}

function getNodesWithUris(node)
{
	if (node.nodeType == 3)
	{
		if (node.nodeValue.search(uriRe) != -1)
			nodesWithUris.push(node);
	}
	else if (node && node.nodeType == 1 && node.hasChildNodes() && !node.tagName.match(/^(a|head|object|embed|script|style|frameset|frame|iframe|textarea|input|button|select|option)$/i))
	{
		for (var i = 0; i < node.childNodes.length; i++)
			getNodesWithUris(node.childNodes[i]);
	}
}

main();
