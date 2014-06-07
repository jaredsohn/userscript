// ==UserScript==
// @name           NoTwopPreach
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @include        http://forums.televisionwithoutpity.com/index.php?showtopic=*
// ==/UserScript==

//
// This script removes preachy top posts that the TWOP moderators sometimes insert
// at the top of ***EVERY*** page of a thread.  Good riddance!
//

//
// Updated to v2.0 in response to change in TWoP source.
//

var allLinks = document.evaluate(
                             "/html/body/div[*]/div[*]/div[*]/div[@id='ipbwrapper']/div[2]",
                             document,
                             null,
                             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                             null);
                             
for (var i = 0; i < allLinks.snapshotLength; i++) {
  if (allLinks.snapshotItem(i).className == "borderwrap") {

    var all2 = document.evaluate(
                             "/html/body/div[*]/div[*]/div[*]/div[@id='ipbwrapper']/div[1]",
                             document,
                             null,
                             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                             null);
  
    for (var j = 0; j < all2.snapshotLength; j++) {
      var thisLink = all2.snapshotItem(j);
      thisLink.parentNode.removeChild(thisLink);
    }
  }
}
