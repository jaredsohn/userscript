// ==UserScript==
// @name           UpToDate Search Label Remover
// @description    Removes UpToDate Search Label on Articles
// @include        http://www.uptodate.com/contents/search?*
// @include        http://www.uptodate.com.proxy.library.rcsi.ie/contents/search?*
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
	thisLink.href = thisLink.href.replace("source=search_result","");
}