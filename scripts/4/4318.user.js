// ==UserScript== 
// @name          Baen Free Library Re-linker
// @namespace     AK
// @description   Relink author names to free books in Baen's Free Library
// @include       http://www.baen.com/library/series.htm
// ==/UserScript== 

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    if (thisLink.href.indexOf("http://www.baen.com/author_catalog.asp?author=") > -1)
    {
        Spacer = document.createElement('span');
        Spacer.innerHTML = "&nbsp;";
        catalogLink = document.createElement('a');
        catalogLink.href = thisLink.href;
        catalogLink.innerHTML = "Catalog";
        catalogLink.style.fontSize = "75%";
        thisLink.href = thisLink.href.replace(/http:\/\/www\.baen\.com\/author_catalog\.asp\?author\=/, "http://www.baen.com/library/") + ".htm";
        thisLink.parentNode.insertBefore(Spacer, thisLink.nextSibling);
        thisLink.parentNode.insertBefore(catalogLink, Spacer.nextSibling);
    }
}