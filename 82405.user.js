// ==UserScript==
// @name           Los Angeles Times: Redirect to full page version
// @namespace      latFullPage
// @author			   Manish Vij
// @include        *latimes.com*
// @version			   1.0
// @license			   GPL; http://www.gnu.org/copyleft/gpl.html
// @datecreated		 2010-07-27
// @lastupdated		 2010-07-27
// @description    Show full page version of LA Times stories
// ==/UserScript==


(function()
{
  var xpath = "//a[contains(@href,'full.story')]";
  var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link;
  var bStop = false;

  for (i = 0; (link = res.snapshotItem(i)) && !bStop; i++)
  {
     if (link.href.search(/javascript/) >= 0)
     {
       //do nothing
     }
     else
     {
       window.location.href = link.href;
       bStop = true;
     }
   }
}
)();