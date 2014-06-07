// Skrij govnača
//
// This is a modified version made specifically for joker.si forum
// It also removes the themes of blocked users
//
// Original version description:
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
// @name           Skrij govnača
// @namespace      http://userscripts.org/scripts/show/135034
// @description    Skripta odstrani nezaželjenega bebčka
// @match http://joker.si/mn3njalnik/*
// @match http://www.joker.si/mn3njalnik/*
// @include http://*joker.si/mn3njalnik/*
// ==/UserScript==




var asshats =
[
 	"drek 1",
	"drek 2",
	"drek 3",
	"drek 4"
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

var linkName = document.getElementsByTagName('a');
if(document.location != "http://www.joker.si/mn3njalnik/index.php?act=idx"){
    for(var i = linkName.length - 1; i >= 0; i--) {
        for(var k = 0; k < asshats.length; k++) {
            var userName = linkName[i].firstChild.nodeValue;
                if(userName == asshats[k]) {
                    var thread = linkName[i].parentNode.parentNode;
                    thread.style.display = "none";
            }
        }
    }
}

return;