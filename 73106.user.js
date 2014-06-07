// ==UserScript==
// @name           ListoriousLinkChanger
// @namespace      listorioslinkwechsler
// @description    from Listorius.com/username* to twitter.com/username*
// @include        *listorious.com/*
// ==/UserScript==
var allLinks=document.links
for (var i = 0; i < document.links.length; i++)
    {
    if (hit=allLinks[i].href.match(/http:\/\/listorious\.com\/(?!(tag|search|login|user|about|top))[A-Za-z0-9\/\.%\+\?&\|\-$#;:=_@]+/i))
        {
        allLinks[i].href=allLinks[i].href.replace(/listorious\.com/i, 'twitter.com');
        //alert(allLinks[i].href);
        }
    }
