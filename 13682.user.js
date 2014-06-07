// ==UserScript==
// @name          Feed Fluffy
// @description   Automatically feed fluffy friend  on www.facebook.com Fluffy Friend.
// @include       http://apps.facebook.com/fluff/fluffbook.php*
// ==/UserScript==

var allForms, feedForm, allBodies, thisBody, allLinks, feedLink;

allBodies = document.evaluate(
'//body', 
document,
null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null);
thisBody = allBodies.snapshotItem(0);

allForms = document.evaluate(
"//form[@id='app2219808235_feed_friend']", 
document,
null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null);
feedForm = allForms.snapshotItem(0);

allLinks = document.evaluate(
"//form[@id='app2219808235_feed_friend']/a[@href]", 
document,
null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null);
feedLink = allLinks.snapshotItem(0);

if(thisBody && feedForm){
  // auto submit the feed form
  if(feedLink)
    feedForm.submit();
  else
    thisBody.onload = window.setInterval(
    function(){feedForm.submit()},5000);
}