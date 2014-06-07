// ==UserScript==
// @name        save passwords everywhere
// @namespace   vnaum.com
// @include     *
// @version     1
// ==/UserScript==

var allInputs, thisInput;
allInputs = document.evaluate(
    "//input[@autocomplete]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allInputs.snapshotLength; i++) {
    thisInput = allInputs.snapshotItem(i);
    thisInput.removeAttribute("autocomplete");
}

