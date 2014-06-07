// ==UserScript==
// @name           Ignore FanFiction.Net User
// @namespace      http://userscripts.org/scripts/show/31174
// @description    Ignore Topic
// @include        http://www.fanfiction.net/topic/*
// @grant          none
// ==/UserScript==
///
// Remove table elements (posts) by given user
// from UserScripts.org
// http://userscripts.org/scripts/show/31174
//
// This is a Greasemonkey user script
//
// To install, you need Greasemonkey, get it from: http://www.greasespot.net
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
//
//
// -------------------------------------------------------------------------
// VERSION HISTORY:
//
// 1.3.1
// Reworked to target threads in FanFiction.NET
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
 
var blacklist =
[
        "Herr Gespenst",
        "Darkwinter999",
        "thelastpen",
        "schillingklaus",
        "Spikehair"
];

function removeThreads(node)
{
        var user = node.firstChild.nodeValue;
        console.log("user: '" + user + "'");

        for (j = 0; j < blacklist.length; j++)
        {
                if (user == blacklist[j])
                {
                        console.log("found");
                        node.parentNode.parentNode.style.display = 'none';
                }
        }
}

var aNodes = document.getElementsByTagName("a");

for (var i=0; i<aNodes.length; i++)
{
        if (aNodes[i].target == "forum")
        {
                removeThreads(aNodes[i]);
        }
}