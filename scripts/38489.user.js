// GMX logout no ads
// Greasemonkey script
// Version 2, 2008-12-15 ymd
// by Burkart Lingner
//
// ==UserScript==
// @name           GMXlogoutNoAds
// @namespace      http://www.bollchen.de
// @description    Removes Ads on the GMX webmail logout page that are not filtered by Adblock Plus
// @include        http://logout.gmx.net/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var allDivs, thisDiv;

//
// Remove ads (headline + image + text) and shift content to the left
//
allDivs = xpath("//div[@class='shopping type-a' or @class='entertainment type-a']");
for (var i = 0; i < allDivs.snapshotLength; i++)
{
    thisDiv = allDivs.snapshotItem(i).parentNode;
    thisDiv.parentNode.removeChild(thisDiv);
}

//
// dito for differently coded ads
// <div class="topic type-a">...</div> is also used for content,
// therefore searching for links to adclient.uimserv.net... is
// required to filter out only the ads
//
allDivs = xpath("//div[@class='topic type-a']/a[starts-with(@href,'http://adclient.uimserv.net/')]");
for (var i = 0; i < allDivs.snapshotLength; i++)
{
    thisDiv = allDivs.snapshotItem(i).parentNode.parentNode;
    thisDiv.parentNode.removeChild(thisDiv);
}

//
// 'adv': Remove banner ad on top (or grey background when using Adblock Plus)
// 'adv-sky': Remove skyskraper ad on the right
// 'nav-sub': Remove navigation bar on the left
//            (accessible through "tabs" on top if you really need it))
//
allDivs = xpath("//div[@id='adv' or @id='adv-sky' or @id='nav-sub']");
for (var i = 0; i < allDivs.snapshotLength; i++)
{
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}