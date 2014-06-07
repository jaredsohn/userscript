// ==UserScript==
// @name	WHP No Alert 1.0
// @namespace	http://www.bodosom.net/greasemonkey/
// @description	Gets rid of annoying alert messages on whp.tv's videos page
// @include	*www0.easyshag.com/video*
// ==/UserScript==
(function()
{
  var xpath = "//a[@name='migiClick']";
  var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link;

  for (i = 0; link = res.snapshotItem(i); i++)
  {
     link.name="beeyotch";
  }
}
)();