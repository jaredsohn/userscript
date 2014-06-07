// ==UserScript==
// @name           Remove maxlength
// @description    Removes maxlength attributes from (text) inputs.
// @include        *

// ==/UserScript==
var inputs = document.evaluate("//input[@maxlength]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < inputs.snapshotLength; i++) inputs.snapshotItem(i).removeAttribute("maxlength");
