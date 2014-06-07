// ==UserScript==
// @name           Answer grabber for radio buttons
// @description    Grabs answers for some radio buttons
// @include        *
// ==/UserScript==

var allAnswers = document.evaluate('//input[@name="correctanswer"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = allAnswers.snapshotLength - 1; i >= 0; i--)
  allAnswers.snapshotItem(i).setAttribute("type", "textbox");