// ==UserScript==
// @name         FxForumNewTab
// @namespace    https://userscripts.org/people/5587
// @description  Opens posted links in new tabs.
// @downloadURL  https://userscripts.org/scripts/source/49555.user.js
// @grant        none
// @include      http://www.camp-firefox.de/forum/*
// @updateURL    https://userscripts.org/scripts/source/49555.meta.js
// @version      1.0.2
// @date         2013-03-21
// @creator      Arne Dieckmann (aka "Mithrandir")
// ==/UserScript==

var res = document.evaluate("//a[@class='postlink-local']|//a[@class='postlink']", document, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
for(var i = 0; i < res.snapshotLength; i++) {
  var elem = res.snapshotItem(i);
  elem.target = "_blank";
}
