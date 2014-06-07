// ==UserScript==
// @name           Mefinonymous
// @namespace      http://www.ballpointbanana.com
// @description    Hide all commenters' names on Metafilter.
// @include        http://*metafilter.com/*
// ==/UserScript==

var allComments, thisComment;
var byline;
allComments = document.evaluate(
    "//div[@class='comments']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var ii = 0; ii < allComments.snapshotLength; ii++) 
{
  thisComment = allComments.snapshotItem(ii);
  byline = thisComment.getElementsByTagName('span');
  if (byline.length > 0)
  {
    byline[0].innerHTML = 
                        byline[0].innerHTML.replace(/posted .* at/,'posted at');
  }
}