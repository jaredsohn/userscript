// ==UserScript==
// @name          YOSPOS refresh script
// @namespace     http://yosposbit.ch
// @description   This script automatically refreshes YOSPOS every 15 or 30 seconds.
// @include       http://forums.somethingawful.com/forumdisplay.php?forumid=219
// ==/UserScript==

var replyNodes, 
    replyCount = 0, 
    i;

replyNodes = document.evaluate(
  "//a[@class='count']",
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null);
    
for(i = 0; i < replyNodes.snapshotLength; i++) {
  replyCount = replyCount + parseInt(replyNodes.snapshotItem(i).firstChild.firstChild.textContent);
}

if(replyNodes.snapshotLength > 0) {
  window.setTimeout(function() { document.title = document.title + " (" + replyCount + ")"; }, 500);  
  window.setTimeout(function() { window.location.reload(); }, 15000);  
} else {
  window.setTimeout(function() { window.location.reload(); }, 60000);
}