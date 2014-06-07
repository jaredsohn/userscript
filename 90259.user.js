// ==UserScript==
// @name           Pardus Forum Filter.
// @namespace      pardus.at
// @description    Blocks certain parts of the pardus forum.
// @include        http://forum.pardus.at/
// @include        http://*.pardus.at/menu.php
// @version        0.1
// @author         Beigeman
// @credit         http://diveintogreasemonkey.org/patterns/match-attribute.html
// ==/UserScript==

// USER VARIABLES
var index = 1; // Set to 2 if you're a guide!
var universe = 8; // Orion = 3, Artemis = 8, 9 = Pegasus.

// CODE
if (window.location.href == 'http://forum.pardus.at/')
{
	var forum = document.getElementsByClassName('tableborder')[index];
	forum.style.border = '0xpx';

	var allLinks, thisLink;
	
	allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
for (var i = 0; i < allLinks.snapshotLength; i++) 
	{
		thisLink = allLinks.snapshotItem(i);
	
		if (thisLink == 'http://forum.pardus.at/index.php?c=' + universe.toString())
		{
			forum.innerHTML = " ";
		}    
	}
}