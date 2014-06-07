// ==UserScript==
// @name           highighter Open University
// @namespace      http://shmulik.zekar.co.cc/openu-highlighter
// @author         shmulik - sking.me@gmail.com
// @license        Creative Commons Attribution-NonCommercial-NoDerivs
// @description    highlight Your posts in the Israeli Open University's forums
// ==/UserScript==

if (GM_getValue("fullName") == null)
  GM_setValue("fullName", prompt("Please fill your full name:","פלוני אלמוני"))

var trs = document.evaluate(
    '//tr[td/a="'+GM_getValue("fullName")+'"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < trs.snapshotLength; i++) {
  trs.snapshotItem(i).style.background="yellow";
}