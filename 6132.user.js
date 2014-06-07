// ==UserScript==
// @name           IWantYourSoul Warner
// @description    Warns you about stupid "iwantyoursoul" links that annoying people put in there signatures and similar things.
// @include        *
// ==/UserScript==

var allLinks = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null) ;

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    if (thisLink.href.indexOf("iwantyoursoul") != -1) {
		var text = document.createTextNode(" < THIS IS A STUPID IDIOTIC LINK, DON\'T CLICK IT!!!")
		thisLink.parentNode.insertBefore(text, thisLink.nextSibling);
    }
}