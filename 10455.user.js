// ==UserScript==
// @name	NYTimes.com Link Rewriter
// @description	Rewrites New York Times links to ask for single page format.  Allows navigation to print format.  Derived from bodosom.net version.
// @include	http://*.nytimes.com/*
// @include	http://*nytimes.com/*
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
     else if (link.href.search(/index/) >= 0)
     {
        //do nothing
     }
     else if (link.href.search(/pagewanted=print/) >= 0)
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
