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
// @name          Linkifier
// @namespace     http://www.reifysoft.com/?scr=linkifier
// @description   Turn text URLs and email addresses into links
// @include       *
// ==/UserScript==


var nodesWithUris = new Array();
var uriRe = /\b((?:https?|ftp|telnet|ldap):\/\/[^\s'"<>()]*|[-\w]+@(?:[-\w]+\.)+[\w]{2,6})\b|([\w\-])+(\.([\w\-])+)*@((([a-zA-Z0-9])+(([\-])+([a-zA-Z0-9])+)*\.)+([a-zA-Z])+(([\-])+([a-zA-Z0-9])+)*)/gi;

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

				var linky = document.createElement("a");
				linky.className = "reify-linkifier";
				linky.href = (node.nodeValue.indexOf("://") == -1 ? "mailto:" : "") + node.nodeValue.replace(/\.*$/, "");
				node.parentNode.insertBefore(linky, node);
				linky.appendChild(node);
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
		for (var i in node.childNodes)
			getNodesWithUris(node.childNodes[i]);
}

main();