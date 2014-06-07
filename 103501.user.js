// ==UserScript==
// @name          poke2pokemon
// @description   Changes the poke button on facebook to Pokemon
// ==/UserScript==

var allSpans, thisSpan;
allSpans = document.evaluate(
    "//span[@class='uiButtonText']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allSpans.snapshotLength; i++) {
    thisSpan = allSpans.snapshotItem(i);
    if (thisSpan.innerText=="Poke") thisSpan.innerText="Pokemon";
}