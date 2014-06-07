// ==UserScript==
// @name           eMedicine - Direct Links on Search Results
// @namespace      http://userscripts.org/users/165701
// @description    Changes the links of eMedicine search results so that articles can be viewed without logging in
// @include        http://search.medscape.com/reference-search?*
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
	thisLink.href = thisLink.href.replace("refarticle-srch","article");
	thisLink.href = thisLink.href.replace("refdrug-srch","drug");
	thisLink.href = thisLink.href + "#showall";
}