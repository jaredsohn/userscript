// ==UserScript==
// @name           RateBeer Search Results Tab Indexer
// @namespace      http://www.ratebeer.com
// @description    Gives each search result a tab index
// @include        http://www.ratebeer.com/findbeer.asp*
// ==/UserScript==

// Assign the tab index to each type of search results.
var allLinks, thisLink;

allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, // This is important
    null);

var maxIndex = 0;

for (var i = 0; i < allLinks.snapshotLength; ++i) 
{
  thisLink = allLinks.snapshotItem(i);
  if (thisLink.href.toLowerCase().indexOf("/beer/") > -1 
      || thisLink.href.toLowerCase().indexOf("/places/showplace.asp") > -1 
      || thisLink.href.toLowerCase().indexOf("/viewuser.asp") > -1)
  {
    thisLink.tabIndex = ++maxIndex;
  }    
}