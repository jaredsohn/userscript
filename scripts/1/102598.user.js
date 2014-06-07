// ==UserScript==
// @name            mailto add to yahoo addressbook and Super Linkifier Combined
// @namespace       themightydeity.com & userscripts.org/scripts/show/10958
// @description     Rewrites "mailto:" links to Yahoo Address Book
// @include         *
// ==/UserScript==


// Super Linkifier
// version 1.2
// 2007-07-31

// -----------------------------------Information-----------------------------------
// I modified the framework from Linkifier Plus to handle almost any URL.
// I also added link customization.
// -FinalDoom
//
// Test page: http://yellow5.us/firefox/testcases.txt
//
// ---------------------------------------------------------------------------------

// -------------------------------------Options-------------------------------------
// Change these values to customize linkified link appearances:
function linkifyandmodify(){
var customizeLinks = false; // true = customization on; false = off (default)
var linkBackground = "transparent"; // "#xxxxxx" "#xxx" "colorname" "transparent"
var linkBorder = "1px #00ff00 dotted"; // ex: "1px #00ff00 dotted"
var linkColor = "#ff0000"; // "#xxxxxx" "#xxx" (rgb hex) "colorname"
var linkDecoration = "none"; // "none" "blink" "line-through" "overline" "underline"
var linkExtras = ""; // ex: "font-size: 16px !important;" add extra css properties

// Enable or disable and customize "link after text" support
var linkAfterText = false; // true = feature on; false = off (default)
var beforeLink = "(" // text inserted before link -- "link: " "(" "[link]"
var afterLink = ")" // text inserted after link -- "" ")" "[/link]"

// Enable or disable Pagerization compatibility
var pagerization = false; // true = compatibility on; false = off (default)

// ---------------------------------------------------------------------------------

var nodesWithUris = new Array();
var uriRe = /\b((?:(?:https?|ftp|telnet|ldap|irc|nntp|news|irc|ed2k):\/\/[\w\-.+$!*\/(),~%?:@#&=\\]*)(?:[\w\-+$\/~%?@&=\\]|\b)|(?:about:[.\w?=%-&]{4,30})\b|(?:mailto:)?(?:[.\w-]+@)(?!irc:|ftp:|www\.)(?:[.\w-]+\.[\w-]+)\b)/gi;

function fixLinks()
{
	var replacements, regex, key, textnodes, node, s; 

	replacements = { 
		"\\b(?:h..p|ttp):\\/\\/([\\w-.+$!*\\/(),~%?@&=\\\\])": "http://$1",
		"(#[\\w-]+@)?\\b([.\\w-]+(?::[.\\w-]+)?@)?(ftp|irc)\\.": "$1$3://$2$3.",
		"(\\s[^\\w]?)([\\w-.+$!*\\/(),~%?@&=\\\\]+\\.[A-Za-z]{2,4}\\/|[\\w-.+$!*\\/(),~%?@&=\\\\]*www\\.|(?:(?:[^(mailto)][.\\w-]+:)?[.\\w-]+@)?(?:(?:[0-1]?[\\d]{1,2}|2[0-4][\\d]|25[0-5])(?:\\.(?:[0-1]?[\\d]{1,2}|2[0-4][\\d]|25[0-5])){3})\\/|[^(mailto)][.\\w-]+:[.\\w-]+@)": "$1http://$2"
	};
	regex = {}; 
	for (key in replacements)
	{ 
		regex[key] = new RegExp(key, 'gi');
	}
	textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

	for (var i = 0; i < textnodes.snapshotLength; i++)
	{ 
	    node = textnodes.snapshotItem(i); 
		if (!node.parentNode.tagName.match(/^(a|head|object|embed|script|style|frameset|frame|iframe|textarea|input|button|select|option)$/i))
		{
			s = node.data;
			for (key in replacements) { 
				s = s.replace(regex[key], replacements[key]); 
			} 
			node.data = s; 
		}
	}
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
				linky.className = "superLinkifier";
				linky.href = (node.nodeValue.indexOf(":") == -1 ? "mailto:" : "") + node.nodeValue.replace(/\.*$/, "");
				if (!linkAfterText)
				{
					node.parentNode.insertBefore(linky, node);
					linky.appendChild(node);
				}
				if (linkAfterText)
				{
					var beforeText = document.createTextNode(" " + beforeLink);
					var nodeText = document.createTextNode(node.nodeValue);
					var afterText = document.createTextNode(afterLink);
					node.parentNode.insertBefore(afterText, node.nextSibling);
					node.parentNode.insertBefore(linky, node.nextSibling);
					linky.appendChild(nodeText);
					node.parentNode.insertBefore(beforeText, node.nextSibling);
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
		for (var i in node.childNodes)
			getNodesWithUris(node.childNodes[i]);
}

function styleLinks()
{
	var css = "a.superLinkifier { background-color: " + linkBackground + " !important; border: " + linkBorder + " !important; color: " + linkColor + " !important; text-decoration: " + linkDecoration + " !imporant; " + linkExtras + " }";
	if (typeof GM_addStyle != "undefined") 
	{
		GM_addStyle(css);
	} 
	else if (typeof addStyle != "undefined") 
	{
		addStyle(css);
	} 
	else 
	{
		var styleSheet = document.createElement('style');
		styleSheet.type = "text/css";
		styleSheet.innerHTML = css;
		styleSheet = document.getElementsByTagName('head')[0].appendChild(styleSheet);
	}
}

function main()
{
	fixLinks();
	makeLinks(document.documentElement);
	if (customizeLinks) styleLinks();
}

main();

// Compatibility with Pagerization
if (pagerization) addFilter(function () {main();});

function addFilter(func, i) {
	i = i || 4;
	if (window.AutoPagerize && window.AutoPagerize.addFilter) {
		window.AutoPagerize.addFilter(func);
	}
	else if (i > 1) {
		setTimeout(arguments.callee, 1000, func, i - 1);
	}
	else {
		(function () {
			func(document);
			setTimeout(arguments.callee, 200);
		})();
	}
}


var GmailURL = 'http://address.mail.yahoo.com/yab?v=YM&A=m&simp=1&e=';
var ATags = document.getElementsByTagName('a');
var TagHref = 0;
var TagHrefL = 0;
var EmailAddy = 0;
var EmailAddy_Offset = 0;
var Subject_Offset = 0;
var Subject = 0;

var CompleteURL = 0;


var LoopA = 0;
while(LoopA < ATags.length)
	{
	EmailAddy = 0;
	EmailAddy_Offset = 0;
	Subject_Offset = 0;
	Subject = 0;


	TagHref = ATags[LoopA].getAttribute('href');
	if(TagHref != null)
		{
		TagHrefL = TagHref.toLowerCase();


		EmailAddy_Offset = TagHrefL.indexOf('mailto:');
		if(EmailAddy_Offset > -1)
			{
			EmailAddy_Offset += 7;
			Subject_Offset = TagHrefL.indexOf('?subject=', EmailAddy_Offset);
			if(Subject_Offset > -1)
				{
				EmailAddy = TagHref.substring(EmailAddy_Offset, Subject_Offset);
				Subject_Offset += 9;
				Subject = TagHref.substring(Subject_Offset);
				}
			else EmailAddy = TagHref.substring(EmailAddy_Offset);


			CompleteURL = GmailURL+EmailAddy;
			if(Subject != 0) CompleteURL += '&su='+Subject;

			ATags[LoopA].setAttribute('href', CompleteURL);
			ATags[LoopA].setAttribute('title', 'Send from Gmail');
			ATags[LoopA].setAttribute('target', '_blank');
			}
		}

	LoopA++;
	}

// Cleanup
delete ATags;
}
window.addEventListener("DOMNodeInserted", linkifyandmodify, true);
window.addEventListener("load", linkifyandmodify, true);

