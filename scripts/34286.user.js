// ==UserScript==
// @name cleantest
// @description learning testing (junk code)
// @include *
// ==/UserScript==

var allTr, thisTr;
allTr = document.evaluate(
    '//tr',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allTr.snapshotLength; i++) {
    thisTr = allTr.snapshotItem(i);

if(thisTr.innerHTML.indexOf('images/clicked.jpg')>0)
thisTr.innerHTML="CLEANED";

}
