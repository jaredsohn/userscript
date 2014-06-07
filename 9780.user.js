// ==UserScript==
// @name           NZ Herald Single Page Format
// @namespace      http://www.userscripts.org
// @description    Rewrites NZ Herald story links to display on single pages. Based on NYTimes Single-Page Format v2.0.  Updated Sept 15, 2008 for new URL format.
// @include        http://*nzherald.co.nz/*
// ==/UserScript==
(function()
{
  var xpath = "//a[contains(@href,'article.cfm')]";
  var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link;

  for (i = 0; link = res.snapshotItem(i); i++)
  {
     if (link.href.search(/pnum/) < 0)
     {
       link.href += '&pnum=0';
     }
   }
}
)();