// ==UserScript==
// @name           SomethingAwful Revert
// @namespace      alir.com
// @description    Makes Something Awful easier on the eye.
// @include        http://www.somethingawful.com/*
// @exclude        http://www.somethingawful.com/
// @exclude        http://www.somethingawful.com/index.html
// ==/UserScript==

//This script eliminates the sidebar and footers on all Something
//Awful article pages so the page looks a little more like it used
//to look before the hideous redesign.  It makes it easier for me
//to read, anyway.
//I excluded the main page because the sidebars are necessary for
//navigation.

//Eliminates the sidebar content
sbar = document.getElementById("sidebar");
if(sbar)
{
sbar.parentNode.removeChild(sbar);
}

//eliminates the advertizement footer
fbar = document.getElementById("footer");
if(fbar)
{
fbar.parentNode.removeChild(fbar);
}

GM_addStyle('#content { width: 100% !important; }');
//comment this last line out to see the navigation stuff at the bottom
GM_addStyle('.featurenav { display: none !important; }');


//All of this crap below was to try to eliminate ads, but then I
//realized I was happier with the simpler solution above.  If you'd
//prefer to see the navigation stuff at the bottom of the page,
//comment out the line above and include the stuff below.  Of
//course, if you really want to eliminate ads from the page,
//Adblocker is a better solution.

//var re = new RegExp('<script[\\s\\S]+/noscript>', 'gi');

//var allDivs, thisDiv;

//allDivs = document.evaluate("//div[@class='featurenav']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//for (var i = 0; i < allDivs.snapshotLength; i++)
//{
//	thisDiv = allDivs.snapshotItem(i);
//	var temp = thisDiv.innerHTML;
//	temp = temp.replace(re, '');
//	thisDiv.innerHTML = temp;
//}