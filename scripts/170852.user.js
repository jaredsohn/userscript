// ==UserScript==
// @name       DoujinMoe Link Get
// @namespace  http://www.reddit.com/user/ImANewRedditor
// @version    0.1
// @description  Auto-click download link on Doujinmoe
// @match      http://www.doujin-moe.us/*
// @copyright  2012+, You
// ==/UserScript==

var linkContainer = document.getElementsByTagName("a"), c, lName;

for (c=0;c<linkContainer.length;c++)
{
    if (linkContainer[c].href.match(".zip") !== null && linkContainer[c].href.match("pictures") !== null)
    {
        lName = linkContainer[c].href.split("/");
        lName = lName[lName.length-1];
        linkContainer[c].click();
    }
}