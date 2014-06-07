// ==UserScript==
// @name           XKCD Post Link Dereloadinator
// @namespace      com.scorcheduniverse
// @description    Turns post links that are on the current page into name links so the page doesn't reload
// @include        http://forums.xkcd.com/*
// ==/UserScript==

dostuff();

function dostuff()
{
    var links = document.links;
    for (var i = 0; i < links.length; i++)
    {
        var postIdMatchInPostLink = links[i].href.match(/\?p=(\d*)#\d*/i);
        if (postIdMatchInPostLink)
        {
            var postName = "p" + postIdMatchInPostLink[1];
            if(document.getElementsByName(postName).length > 0 ||
                document.getElementById(postName))
            {
                links[i].href = "#" + postName;
            }
        }
    }
}