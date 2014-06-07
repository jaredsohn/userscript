// ==UserScript==
// @name           Dogpile - Remove sponsored results
// @description    Remove sponsored results from the list of the meta-search engine dogpile.com
// @include        http://www.dogpile.com/*/search*
// ==/UserScript==

var allSpans, thisLink;
allSpans = document.evaluate(
    "//span[@class='Heading-Sponsors']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allSpans.snapshotLength; i++) {
    thisLink = allSpans.snapshotItem(i);
    if(!thisLink.innerHTML.indexOf("Sponsored by:")){
	    thisLink.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode);
    }
}
