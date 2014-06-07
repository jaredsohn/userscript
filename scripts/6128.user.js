// Linkifier Plus
// version 1.0
// 2006-10-28
// --------------------------------------------------------------------
// Many (most) portions of this script were taken from Anthony
// Lieuallen's Linkify Plus and Mysteriously Unknown's Linkifier.  I
// simply modified it to work with more kinds of URLs.
//
// Test page: http://www.beggarchooser.com/firefox/testcases.txt
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Linkifier Plus
// @description   Create clickable links from plain text.
// @include       *
// ==/UserScript==


var nodesWithUris = new Array();
var uriRe = /\b(?:((?:https?|ftp|telnet|ldap|irc|nntp|news|irc):\/\/[^\s'"<>()]*|[-\w]+@(?:[-\w]+\.)+[\w]{2,6})\b|([\w\-])+(\.([\w\-])+)*@((([a-zA-Z0-9])+(([\-])+([a-zA-Z0-9])+)*\.)+([a-zA-Z])+(([\-])+([a-zA-Z0-9])+)*)|about:[A-Z0-9._?=%-]{4,19}|mailto:[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4})/gi;

function fixlinks()
{
	var replacements, regex, key, textnodes, node, s; 

	replacements = { 
	"h..p:\/\/": "http://",
	"/\bftp\.": "ftp://ftp."
	};

	regex = {}; 
	for (key in replacements) { 
		regex[key] = new RegExp(key, 'g'); 

		textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

		for (var i = 0; i < textnodes.snapshotLength; i++) { 
		    node = textnodes.snapshotItem(i); 
		    s = node.data; 
		    for (key in replacements) { 
		        s = s.replace(regex[key], replacements[key]); 
		    } 
		    node.data = s; 
		} 

	}

}

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
				linky.className = "linkifierplus";
				linky.href = (node.nodeValue.indexOf(":") == -1 ? "mailto:" : "") + node.nodeValue.replace(/\.*$/, "");
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

fixlinks();
main();