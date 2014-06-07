// ==UserScript==
// @name           removesticky
// @namespace      tmb
// @description    removes sticky threads from unread
// @include        http*://themixingbowl.org/forum/unread/*
// @include        http*://tmb.dj/forum/unread/*
// ==/UserScript==

rows = document.evaluate('.//*[@id="forum"]/table/tbody/tr/td/div/span[@class="sticky"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
//change i = 0 to i = 5 to leave the first 5 sticky, or change i < to a number to leave on the bottom, default is to delete all stickies
for (i = 0; i < rows.snapshotLength; i++) {

  foo = rows.snapshotItem(i).parentNode.parentNode.parentNode;
   
  foo.parentNode.removeChild(foo);

}