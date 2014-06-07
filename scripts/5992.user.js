// ==UserScript==
// @name	NYTimes Single-Page Format v2.0
// @namespace	http://www.userscripts.org
// @description	Rewrites links to nytimes.com to the single page version. Based on the old bodosom.net version.
// @include	*
// ==/UserScript==
(function()
{
  var xpath = "//a[contains(@href,'nytimes.com')]";
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
