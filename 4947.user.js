// ==UserScript==
// @name	NYT Single-Page Format v1.2
// @namespace	http://www.bodosom.net/greasemonkey/
// @description	Rewrites New York Times links to ask for single page format.  v1.2 update fixes broken JavaScript pop-ups and other bugs.  Derived from bodosom.net version.
// @include	*nytimes.com*
// ==/UserScript==
(function()
{
  var xpath = "//a[contains(@href,'.html')]";
  var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link;

  for (i = 0; link = res.snapshotItem(i); i++)
  {
     var add;
     if (link.href.search(/javascript/) >= 0)
     {
       //do nothing
     }
     else if (link.href.search(/\?/) >= 0)
     {
       add = '&';
       link.href = link.href + add + 'pagewanted=all';
     }
     else
     {
       add = '?';
       link.href = link.href + add + 'pagewanted=all';
     }
   }
}
)();