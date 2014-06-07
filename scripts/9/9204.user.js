// ==UserScript==
// @name           Wikify links for Confluence
// @namespace      confluence
// @description    Change links to Confluence wiki markup format for easy copying
// @include        *
// ==/UserScript==
 
function WikifyLinks()
{
    var allLinks, thisLink;
    allLinks = document.evaluate(
        '//a[@href]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allLinks.snapshotLength; i++) {
        thisLink = allLinks.snapshotItem(i);
        thisLink.href = "javascript:document.write('[" + thisLink.innerHTML + "|" +
            thisLink.href + "]');document.close();";
    }
}
 
function WikifyTitle()
{
    document.write("[" + document.title + "|" + window.location + "]");
    document.close();
}
 
GM_registerMenuCommand("Wikify Title", WikifyTitle);
GM_registerMenuCommand("Wikify Links", WikifyLinks);

 