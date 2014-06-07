// IPB Completely hide user
//
// Remove table elements (posts) by given user
// from UserScripts.org
// http://userscripts.org/scripts/show/31174
//
// This is a Greasemonkey user script
// Requires Greasemonkey Version 0.8
//
// To install, you need Greasemonkey, get it from: http://www.greasespot.net
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "IPB Completely hide user", and click Uninstall.
//
//
// --------------------------------------------------------------------------
// ==UserScript==
// @name           IPB Completely hide user
// @namespace      http://userscripts.org/scripts/show/31174
// @description    Remove table elements with certain user names
// ==/UserScript==
//
// --------------------------------------------------------------------------
// VERSION HISTORY:
//
// 1.3
// Changed string match method to exact match for posts and better match
// for quotes
//
// 1.2
// Added hide quotes from users
//
// 1.1
// Switched from remove to hide - faster and more reliable.
//
// 1.0
// Basic remove post from posters given in the list
//
// --------------------------------------------------------------------------



var asshats =
[
 	"A N idiot",
	"some other cupid stunt"
];


function removePosts(node)
{
	var namelink = node.getElementsByTagName("a")[0];
	if (namelink && namelink.firstChild)
	{
		var username = namelink.firstChild.nodeValue;

//		GM_log(username);

		for (j = 0; j<asshats.length; j++)
		{

//			GM_log(asshats[j]);

			if (username == asshats[j])
			{
				var p = namelink.parentNode.parentNode.parentNode.parentNode.parentNode;
				// remove the table element that contains the post by the user
				p.style.display='none';
			}
		}
	}
}


var foo = document.getElementsByTagName("span");
for (var i=0; i<foo.length; i++)
{
	if (foo[i].className == "normalname")
	{
		removePosts(foo[i]);
	}
}

// now get rid of quotes

function removeQuotes(quote)
{
	var quotetop = quote.textContent;

//	GM_log(quotetop);

	for (j = 0; j < asshats.length; j++) {
		if (quotetop.search(asshats[j] + " @") >= 0)
		{
			// hide the element that contains the quote by the user
			quote.style.display='none';
			quote.nextSibling.style.display='none';
		}
	}
}

var quotes = document.getElementsByClassName("quotetop");
for (var i=0; i<quotes.length; i++)
{
	removeQuotes(quotes[i]);
}

return;